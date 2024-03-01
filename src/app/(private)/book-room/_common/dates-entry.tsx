"use client";
import { RoomType } from "@/interfaces";
import { GetStripeClientSecret } from "@/server-actions/payments";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import PaymentModal from "./payment-modal";
import { Elements } from "@stripe/react-stripe-js";

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

  const getClientSecret = async () => {
    try {
      const response = await GetStripeClientSecret(amount);
      if (response.success) {
        setClientSecret(response.data);
        console.log(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const checkAvailability = () => {};

  return (
    <div className="border-gray-300 border border-solid flex flex-col p-5">
      <Form layout="vertical" className="flex flex-col gap-5">
        <Form.Item label="Start Date">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="End Date">
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Item>

        {!isAvailable && (
          <Button
            type="primary"
            block
            disabled={!startDate || !endDate}
            onClick={checkAvailability}
          >
            Check Availability
          </Button>
        )}

        {isAvailable && (
          <div>
            <p className="text-green-700 py-2">Room is available</p>
            <Button type="primary" block>
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
