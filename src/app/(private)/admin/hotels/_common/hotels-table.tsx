"use client";
import { HotelType } from "@/interfaces";
import { Modal, Table, Tooltip, message } from "antd";
import React from "react";
import { Delete, Edit, Plus } from "lucide-react";
import { DeleteHotel } from "@/server-actions/hotels";
import RoomForm from "../../rooms/_common/room-form";

function HotelsTable({ dataSource }: { dataSource: HotelType[] }) {
  const [loading, setLoading] = React.useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = React.useState(false);
  const [selectedHotel, setSelectedHotel] = React.useState<HotelType | null>(
    null
  );

  const onDelete = (id: string) => {
    try {
      setLoading(true);
      const response: any = DeleteHotel(id);
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
          <Delete size={20} onClick={() => onDelete(record._id)} />
          <Tooltip title="Add Room">
            <Plus
              size={20}
              onClick={() => {
                setShowAddRoomModal(true);
                setSelectedHotel(record);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} loading={loading} />

      {showAddRoomModal && (
        <Modal
          title="Add Room"
          centered
          open={showAddRoomModal}
          onCancel={() => setShowAddRoomModal(false)}
        >
          <RoomForm
            hotelId={selectedHotel?._id!}
            initialData={null}
            type="add"
          />
        </Modal>
      )}
    </div>
  );
}

export default HotelsTable;
