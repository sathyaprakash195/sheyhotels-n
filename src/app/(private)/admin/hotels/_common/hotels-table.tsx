"use client";
import { HotelType } from "@/interfaces";
import { Table } from "antd";
import React from "react";
import { Delete, Edit } from "lucide-react";

function HotelsTable({ dataSource }: { dataSource: HotelType[] }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-5">
          <Edit size={20} />
          <Delete size={20} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default HotelsTable;
