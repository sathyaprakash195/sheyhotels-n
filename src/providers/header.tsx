import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  const { loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  return (
    <div className="flex justify-end items-center gap-5 p-5">
      <span className="text-gray-500 text-sm">{loggedInUserData?.name}</span>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}

export default Header;
