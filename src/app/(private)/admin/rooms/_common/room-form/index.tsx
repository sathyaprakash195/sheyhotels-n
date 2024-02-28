"use client";
import { AddRoom, EditRoom } from "@/server-actions/rooms";
import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function RoomForm({
  initialData = null,
  type = "add",
  hotelId,
}: {
  initialData?: any;
  type: "add" | "edit";
  hotelId?: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = (values: any) => {
    try {
      values.hotel = hotelId;
      setLoading(true);
      let response: any;
      if (type === "add") {
        response = AddRoom({ ...values, hotel: hotelId });
      } else {
        response = EditRoom({
          payload: values,
          roomId: initialData._id,
        });
      }
      if (!response.success) {
        throw new Error(response.message);
      }
      router.push("/admin/rooms");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form layout="vertical" initialValues={initialData} onFinish={onFinish}>
      <div className="grid grid-cols-3">
        <Form.Item
          name="name"
          label="Name"
          className="col-span-2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="number"
          label="Number"
          className="col-span-1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          className="col-span-2"
          rules={[{ required: true }]}
        >
          <Select.Option value="delux">Delux</Select.Option>
          <Select.Option value="premium">Premium</Select.Option>
          <Select.Option value="standard">Standard</Select.Option>
        </Form.Item>

        <Form.Item
          name="rentPerDay"
          label="Rent Per Day"
          className="col-span-1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="amenities"
          label="Amenities"
          className="col-span-3"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      </div>

      <div className="flex justify-end gap-5">
        <Button onClick={() => router.push("/admin/rooms")}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default RoomForm;
