"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { GetCurrentUserFormMongoDB } from "@/server-actions/users";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";
import { usePathname } from "next/navigation";
import Spinner from "@/components/spinner";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");

  const { SetLoggedInUserData, loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const [loading, setLoading] = useState(false);
  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const response: any = await GetCurrentUserFormMongoDB();
      if (response.success) {
        SetLoggedInUserData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthRoute && !loggedInUserData?._id) {
      getLoggedInUser();
    }
  }, [pathname]);

  if (isAuthRoute) {
    return children;
  }

  if (loading) {
    return <Spinner isFullScreen={true} />;
  }

  return (
    <div className="flex flex-col gap-5 h-screen">
      <Header />
      <div className="p-5 lg:px-10">{children}</div>
    </div>
  );
}

export default LayoutProvider;
