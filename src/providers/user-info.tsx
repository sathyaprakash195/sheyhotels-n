import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";
import { User } from "lucide-react";
import React from "react";

function UserInfo() {
  const { loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  return (
    <div className="border-0 border-l border-primary border-solid p-5 underline flex gap-5 items-center uppercase">
      <span className="text-gray-500 cursor-pointer text-sm">
        {loggedInUserData?.name.split(" ")[0]}
      </span>
      <User size={24} className="cursor-pointer text-gray-500" />
    </div>
  );
}

export default UserInfo;
