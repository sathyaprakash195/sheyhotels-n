import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { Home, Hotel, User } from "lucide-react";

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
      icon: <Home size={iconSize} />,
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
      icon: <User size={iconSize} />,
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
        className="absolute -right-3 top-5 bg-primary text-white py-2 px-1 rounded-sm cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu && <i className="ri-close-line"></i>}
        {!showMenu && <i className="ri-menu-line"></i>}
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
                "flex gap-5 items-center cursor-pointer px-3 py-3 rounded",
                {
                  "bg-gray-700": menu.isActive,
                }
              )}
              onClick={() => router.push(menu.path)}
            >
              <span className="text-gray-300">{menu.icon}</span>
              {showMenu && (
                <span className="text-gray-300 text-sm">{menu.name}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
