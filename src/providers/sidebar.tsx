import React from "react";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import {
  BarChart,
  BedDouble,
  Home,
  Hotel,
  Menu,
  User,
  XSquare,
} from "lucide-react";
import { Drawer } from "antd";

function Sidebar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = React.useState(true);
  const iconSize = 16;

  let adminMenus: any = [
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

  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={() => setShowSidebar(false)}
      open={showSidebar}
      className="bg-primary"
      closeIcon
      title='S-L'
    >
      <h1 className="text-white text-2xl font-bold">S-L</h1>

      <div
        className={classNames("flex flex-col gap-10", {
          "items-center justify-center": !showMenu,
        })}
      >
        {adminMenus.map((menu: any, index: number) => {
          return (
            <div
              key={index}
              className={classNames(
                "flex gap-3 items-center cursor-pointer px-3 py-3 rounded",
                {
                  "bg-gray-700": menu.isActive,
                }
              )}
              onClick={() => router.push(menu.path)}
            >
              <span className="text-gray-500">{menu.icon}</span>
              {showMenu && (
                <span className="text-gray-500 text-sm pb-[2px]">
                  {menu.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}

export default Sidebar;
