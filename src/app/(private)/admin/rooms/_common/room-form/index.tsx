"use client";
import { AddRoom, EditRoom } from "@/server-actions/rooms";
import { Button, Form, Input, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetHotels } from "@/server-actions/hotels";
import { UploadImagesToFirebaseAndReturnURLs } from "@/helpers/uploads";

function RoomForm({
  initialData = null,
  type = "add",
  hotelId,
}: {
  initialData?: any;
  type: "add" | "edit";
  hotelId?: string;
}) {
  if (hotelId) {
    initialData.hotel = hotelId;
  }
  const [hotels, setHotels] = useState([]);
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

  const getHotels = async () => {
    try {
      setLoading(true);
      const response: any = await GetHotels();
      if (!response.success) {
        throw new Error(response.message);
      }
      setHotels(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

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
          name="hotel"
          label="Hotel"
          className="col-span-3"
          rules={[{ required: true }]}
        >
          <Select>
            {hotels.map((hotel: any) => (
              <Select.Option key={hotel._id} value={hotel._id}>
                {hotel.name}
              </Select.Option>
            ))}
          </Select>
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

      <Upload
        listType="picture-card"
        beforeUpload={(file: any) => {
          setNewMedia((prev) => [...prev, file]);
          return false;
        }}
      >
        <span className="text-xs">Upload Image</span>
      </Upload>

      <div className="flex flex-wrap gap-5">
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
        <Button onClick={() => router.push("/admin/rooms")}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default RoomForm;
