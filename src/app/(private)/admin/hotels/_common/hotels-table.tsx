"use client";
import { HotelType } from "@/interfaces";
import { Modal, Table, Tooltip, message } from "antd";
import React from "react";
import { Edit, PlusSquare, Trash } from "lucide-react";
import { DeleteHotel } from "@/server-actions/hotels";
import RoomForm from "../../rooms/_common/room-form";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/helpers/formats";

function HotelsTable({ dataSource }: { dataSource: HotelType[] }) {
  const [loading, setLoading] = React.useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = React.useState(false);
  const [selectedHotel, setSelectedHotel] = React.useState<HotelType | null>(
    null
  );
  const router = useRouter();

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
      title: "Location",
      dataIndex: "location",
      key: "location",
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
            onClick={() => router.push(`/admin/hotels/edit/${record._id}`)}
          />
          <Trash
            size={18}
            onClick={() => onDelete(record._id)}
            className="cursor-pointer text-red-700"
          />
          <Tooltip title="Add Room">
            <PlusSquare
              size={18}
              onClick={() => {
                setShowAddRoomModal(true);
                setSelectedHotel(record);
              }}
              className="cursor-pointer text-green-700"
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
