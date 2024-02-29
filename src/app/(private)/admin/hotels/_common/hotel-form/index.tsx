"use client";

import { Button, Form, Input, Upload, message } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AddHotel, EditHotel } from "@/server-actions/hotels";
import { UploadImagesToFirebaseAndReturnURLs } from "@/helpers/uploads";

function HotelForm({
  initialData = null,
  type = "add",
}: {
  initialData?: any;
  type: "add" | "edit";
}) {
  const [loading, setLoading] = useState(false);
  const [newMedia = null, setNewMedia] = useState<File[]>([]);
  const [existingMedia = null, setExistingMedia] = useState([]);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const newMediaUrls = await UploadImagesToFirebaseAndReturnURLs(newMedia!);
      values.media = [...existingMedia!, ...newMediaUrls];
      let response: any;
      if (type === "add") {
        response = await AddHotel(values);
      } else {
        response = await EditHotel({
          payload: values,
          hotelId: initialData._id,
        });
      }
      if (response.error) {
        throw new Error(response.error);
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
    <Form layout="vertical" onFinish={onFinish} initialValues={initialData}>
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

      <Upload
        listType="picture-card"
        beforeUpload={(file: any) => {
          setNewMedia((prev) => [...prev, file]);
          return false;
        }}
        className="mt-5"
      >
        <span className="text-xs">Upload Image</span>
      </Upload>

      <div className="flex flex-wrap gap-5 mt-5">
        {existingMedia?.map((media: any) => (
          <div className="flex flex-col items-center gap-2 cursor-pointer border border-gray-300 border-dashed p-2 rounded">
            <img src={media} alt="room media" />
            <span
              className="text-red-500"
              onClick={() =>
                setExistingMedia((prev) => prev.filter((m) => m !== media))
              }
            >
              Delete
            </span>
          </div>
        ))}
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
