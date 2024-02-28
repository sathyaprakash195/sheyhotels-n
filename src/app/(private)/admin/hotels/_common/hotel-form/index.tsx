"use client";

import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AddHotel, EditHotel } from "@/server-actions/hotels";

function HotelForm({
  initialData = null,
  type = "add",
}: {
  initialData?: any;
  type: "add" | "edit";
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values: any) => {
    try {
      setLoading(true);
      let response: any;
      if (type === "add") {
        response = AddHotel(values);
      } else {
        response = EditHotel({
          payload: values,
          hotelId: initialData._id,
        });
      }
      if (!response.success) {
        throw new Error(response.message);
      }

      message.success(response.message);
      router.push("/admin/hotels");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}
          className="col-span-3"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="owner"
          label="Owner"
          rules={[{ required: true }]}
          className="col-span-1"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true }]}
          className="col-span-1"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true }]}
          className="col-span-1"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
          className="col-span-3"
        >
          <Input.TextArea />
        </Form.Item>
      </div>

      <div className="flex justify-end gap-5">
        <Button onClick={() => router.push("/admin/hotels")}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default HotelForm;
