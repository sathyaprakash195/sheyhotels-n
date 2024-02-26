import React, { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users-store";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const id = params.id;
  const [showMenu, setShowMenu] = React.useState(true);
  const { loggedInUserData }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;

  let adminMenus: any = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
      isActive: pathname === "/" || pathname === `/lottery/${id}`,
    },
    {
      name: "Lotteries",
      path: "/admin/lotteries",
      icon: "ri-file-list-line",
      isActive:
        pathname === "/admin/lotteries" ||
        pathname === "/admin/lotteries/create" ||
        pathname === `/admin/lotteries/edit/${id}`,
    },
    {
      name: "Tickets",
      path: "/admin/tickets",
      icon: "ri-coupon-line",
      isActive: pathname === "/admin/tickets",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-map-pin-user-line",
      isActive: pathname === "/admin/users",
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: "ri-money-dollar-box-line",
      isActive: pathname === "/admin/reports",
    },
  ];
  let userMenus = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
      isActive: pathname === "/" || pathname === `/lottery/${id}`,
    },
    {
      name: "Lotteries",
      path: "/user/lotteries",
      icon: "ri-file-list-line",
      isActive: pathname === "/user/lotteries",
    },
    {
      name: "Tickets",
      path: "/user/tickets",
      icon: "ri-coupon-line",
      isActive: pathname === "/user/tickets",
    },
    {
      name: "Reports",
      path: "/user/reports",
      icon: "ri-money-dollar-box-line",
      isActive: pathname === "/user/reports",
    },
  ];

  const [menusToShow, setMenusToShow] = React.useState<any[]>(adminMenus);

  useEffect(() => {
    if (loggedInUserData?.isAdmin) {
      setMenusToShow(adminMenus);
    } else {
      setMenusToShow(userMenus);
    }
  }, [pathname, loggedInUserData]);

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
        {menusToShow.map((menu, index) => {
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
              <i className={`${menu.icon} text-gray-300`}></i>
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
