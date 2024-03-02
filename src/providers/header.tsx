import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { ProjectTitle } from "./project-title";
import UserInfo from "./user-info";

function Header() {
  const { loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const router = useRouter();

  if (!loggedInUserData)
    return (
      <div className="lg:px-10">
        <div className="flex justify-between items-center border-t-0 border border-primary border-solid">
          <ProjectTitle onClick={() => router.push("/")} />
          <span
            className="text-primary border-0 border-l border-primary border-solid p-5 underline cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </span>
        </div>
      </div>
    );

  return (
    <div className="lg:px-10">
      <div className="flex justify-between items-center border-t-0 border border-primary border-solid">
        <ProjectTitle onClick={() => router.push("/")} />
        <UserInfo />
      </div>
    </div>
  );
}

export default Header;
