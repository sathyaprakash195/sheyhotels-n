import { RoomType } from "@/interfaces";
import { CreateBooking } from "@/server-actions/bookings";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { message, Modal, Button } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function PaymentModal({
  showPaymentModal,
  setShowPaymentModal,
  startDate,
  endDate,
  room,
  amount,
}: {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  startDate: string;
  endDate: string;
  room: RoomType;
  amount: number;
}) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const router = useRouter();
  const onSubmit = async (event: any) => {
    try {
      setLoading(true);
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/return",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment Successful");
        const newBooking = {
          room: room._id,
          hotel: room.hotel._id,
          user: loggedInUserData?._id,
          checkInDate: startDate,
          checkOutDate: endDate,
          numberOfDays: dayjs(endDate).diff(dayjs(startDate), "day"),
          totalAmount: amount,
          paymentStatus: "paid",
          paymentId: result.paymentIntent.id,
        };

        await CreateBooking(newBooking);
        router.push("/user/bookings");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      title="Complete Your Payment to Book Room"
      open={showPaymentModal}
      onCancel={() => setShowPaymentModal(false)}
      footer={null}
    >
      <form onSubmit={onSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US"],
          }}
        />

        <div className="flex justify-end gap-5 mt-7">
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentModal;
