"use client";
import { RoomType } from "@/interfaces";
import { GetStripeClientSecret } from "@/server-actions/payments";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import PaymentModal from "./payment-modal";
import { Elements } from "@stripe/react-stripe-js";
import { CheckRoomAvalibility } from "@/server-actions/bookings";
import dayjs from "dayjs";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function DateEntry({ room }: { room: RoomType }) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();
  const getClientSecret = async () => {
    try {
      const response = await GetStripeClientSecret(amount);
      if (response.success) {
        setClientSecret(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const checkAvailability = async () => {
    try {
      setLoading(true);
      const response = await CheckRoomAvalibility({
        roomId: room._id,
        checkInDate: startDate,
        checkOutDate: endDate,
      });
      if (response.success) {
        setIsAvailable(true);
      } else {
        message.error("Room is not available for the selected dates");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onBookRoom = () => {
    try {
      if (!userId) {
        router.push("/sign-in");
        return;
      }
      setShowPaymentModal(true);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    setIsAvailable(false);
    if (startDate && endDate) {
      const totalDays = dayjs(endDate).diff(dayjs(startDate), "day");
      setAmount(room.rentPerDay * totalDays);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (amount) {
      getClientSecret();
    }
  }, [amount]);

  return (
    <div className="border-gray-300 border border-solid flex flex-col p-5">
      <Form layout="vertical" className="flex flex-col gap-5">
        <Form.Item label="Start Date">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </Form.Item>

        <Form.Item label="End Date">
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </Form.Item>

        {!isAvailable && (
          <Button
            type="primary"
            block
            disabled={!startDate || !endDate}
            onClick={checkAvailability}
            loading={loading}
          >
            Check Availability
          </Button>
        )}

        {isAvailable && (
          <div>
            <p className="text-green-700 py-2">Room is available</p>
            <Button type="primary" block onClick={onBookRoom}>
              Book Room
            </Button>
          </div>
        )}

        {showPaymentModal && (
          <Elements
            options={{
              clientSecret: clientSecret,
            }}
            stripe={stripePromise}
          >
            <PaymentModal
              showPaymentModal={showPaymentModal}
              setShowPaymentModal={setShowPaymentModal}
              room={room}
              amount={amount}
              startDate={startDate}
              endDate={endDate}
            />
          </Elements>
        )}
      </Form>
    </div>
  );
}

export default DateEntry;
