"use client";
import { formatDateTime } from "@/helpers/formats";
import { RoomType } from "@/interfaces";
import { DeleteRoom } from "@/server-actions/rooms";
import { Table, message } from "antd";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function RoomsTable({ dataSource }: { dataSource: RoomType[] }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onDelete = (id: string) => {
    try {
      setLoading(true);
      const response: any = DeleteRoom(id);
      if (!response.success) {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title : "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render : (text: any) => text.name
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Bedrooms",
      dataIndex: "bedrooms",
      key: "bedrooms",
    },
    {
      title: "Rent Per Day",
      dataIndex: "rentPerDay",
      key: "rentPerDay",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => formatDateTime(text),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-5 items-center">
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/rooms/edit/${record._id}`)}
          />
          <Trash
            size={18}
            onClick={() => onDelete(record._id)}
            className="cursor-pointer text-red-700"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
}

export default RoomsTable;
