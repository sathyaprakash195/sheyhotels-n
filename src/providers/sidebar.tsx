import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { BarChart, BedDouble, Home, Hotel, Menu, User, XSquare } from "lucide-react";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const id = params.id;
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
    <div
      className="bg-primary h-screen p-5 relative transition-all duration-300"
      style={{
        width: showMenu ? 250 : 80,
      }}
    >
      <h1 className="text-white text-2xl font-bold">S-L</h1>
      <div
        className="absolute -right-4 top-5 bg-primary text-white py-2 px-1 rounded-sm cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu && <XSquare />}
        {!showMenu && <Menu />}
      </div>

      <div
        className={classNames("mt-20 flex flex-col gap-10", {
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
              <span className="text-gray-300">{menu.icon}</span>
              {showMenu && (
                <span className="text-gray-300 text-sm pb-[2px]">{menu.name}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
