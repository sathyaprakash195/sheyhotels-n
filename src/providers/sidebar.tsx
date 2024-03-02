import React from "react";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { BarChart, BedDouble, Home, Hotel, List, User } from "lucide-react";
import { Drawer } from "antd";
import { useAuth } from "@clerk/nextjs";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";

function Sidebar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}) {
  const { loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuth();

  const iconSize = 16;

  const adminMenus: any = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: pathname === "/",
    },
    {
      name: "Hotels",
      path: "/admin/hotels",
      icon: <Hotel size={iconSize} />,
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "Rooms",
      path: "/admin/rooms",
      icon: <BedDouble size={iconSize} />,
      isActive: pathname.includes("/admin/rooms"),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <User size={iconSize} />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <BarChart size={iconSize} />,
    },
  ];

  const userMenus: any = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      path: "/user/bookings",
      icon: <List size={iconSize} />,
      isActive: pathname.includes("/user/bookings"),
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <User size={iconSize} />,
      isActive: pathname.includes("/user/profile"),
    },
  ];

  const menus = loggedInUserData?.isAdmin ? adminMenus : userMenus;

  const onLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={() => setShowSidebar(false)}
      open={showSidebar}
      className="bg-primary"
      closeIcon
      title="S-L"
    >
      <h1 className="text-white text-2xl font-bold">S-L</h1>

      <div className="flex flex-col gap-7">
        {menus.map((menu: any, index: number) => {
          return (
            <div
              key={index}
              className={classNames(
                "flex gap-3 items-center cursor-pointer px-3 py-3 rounded",
                {
                  "bg-gray-700 text-white": menu.isActive,
                }
              )}
              onClick={() => {
                router.push(menu.path);
                setShowSidebar(false);
              }}
            >
              <span>{menu.icon}</span>

              <span>{menu.name}</span>
            </div>
          );
        })}

        <span
          className="text-center text-red-500 text-sm cursor-pointer"
          onClick={onLogout}
        >
          Sign out
        </span>
      </div>
    </Drawer>
  );
}

export default Sidebar;
