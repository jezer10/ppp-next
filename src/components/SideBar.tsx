"use client";
import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useInformation } from "@/lib/hooks/useInformation";
import { motion } from "framer-motion";
import { AccessAuthService } from "@/services";

import Image from "next/image";
import adv_log from "@/../public/image_logo.png";
import sis_log_min from "@/../public/logo_sistemas_mini.png";
import sis_log from "@/../public/logo_sistemas.png";

import {
  ChevronLeftIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import profile_pic from "../../public/reyna_pic.jpeg";
import DynamicHeroIcon from "./DynamicHeroIcon";

export default function Sidebar({
  isVisible,
  isTabletOrMobile,
  closeSidebar,
  openSidebar,
}: {
  isVisible: boolean;
  isTabletOrMobile: boolean;
  closeSidebar: () => void;
  openSidebar: () => void;
}) {
  const sidebarRef = useRef(null);

  const { user, role, loading } = useInformation();
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState([]);


  useEffect(() => {
    async function getAccess() {
      if (role?.role_id) {
        const { access } = await AccessAuthService(role.role_id);
        setMenuItems(access);
      }
    }
    getAccess();
  }, [role]);

  const Nav_animation = isTabletOrMobile
    ? {
        open: {
          x: 0,
          width: "20rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "20rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    loading || (
      <div>
        <div
          onClick={closeSidebar}
          className={`fixed inset-0 z-[900] max-h-screen bg-black/50 md:hidden ${
            isVisible ? "block" : "hidden"
          }`}
        ></div>

        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: isTabletOrMobile ? -250 : 0 }}
          animate={isVisible ? "open" : "closed"}
          className="text-gray max-w-80 fixed z-[901] flex h-full w-80 flex-none flex-col gap-8 overflow-y-auto  bg-white shadow-xl md:relative"
        >
          <div className="relative">
            <div
              className={`-translate-x-8 translate-y-2 bg-[#E4752B] ${
                (isVisible || (!isVisible && isTabletOrMobile)) && "flagg"
              }  ${!open && !isTabletOrMobile && "flagg_min"}`}
            ></div>
            <div className="absolute inset-0">
              <div
                className={` relative bg-[#0F3971]  ${
                  (isVisible || (!isVisible && isTabletOrMobile)) && "flagg"
                }  ${!isVisible && !isTabletOrMobile && "flagg_min"}`}
              >
                {(isVisible || (!isVisible && isTabletOrMobile)) && (
                  <>
                    <div className="absolute left-6 top-6 w-1/2">
                      <Image
                        src={sis_log}
                        alt="logo"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="absolute top-0  flex h-full w-full justify-end">
                      <Image
                        src={adv_log}
                        className="h-full w-auto"
                        alt="Logo Adventista"
                        priority={true}
                      />
                    </div>
                  </>
                )}
                {!isVisible && !isTabletOrMobile && (
                  <div className="absolute left-[0.8rem] top-[1.3rem] w-1/2">
                    <Image
                      src={sis_log_min}
                      alt="logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`flex h-full flex-col justify-between gap-4  py-4 ${
              (isVisible || (!isVisible && isTabletOrMobile)) && "px-8"
            }  ${!isVisible && !isTabletOrMobile && "items-center px-0"}`}
          >
            <nav>
              <ul className="flex flex-col gap-2">
                {menuItems.length !== 0 &&
                  menuItems.map((item: any, index) => {
                    const path = `/dashboard${item.url || ""}`;
                    const isActive =
                      item.url === null
                        ? pathname === path
                        : pathname.startsWith(path);
                    return (
                      <li key={index}>
                        <Link
                          href={path}
                          className={`flex gap-2 rounded-lg px-4 py-3 text-sm transition-all hover:bg-[#FF9853] hover:font-bold hover:text-white ${
                            isActive
                              ? "bg-[#FF9853] font-bold text-white"
                              : "text-[#C4C4C4]"
                          }`}
                        >
                          <DynamicHeroIcon icon={item.icon} />
                          {(isVisible || (!isVisible && isTabletOrMobile)) && (
                            <div>{item.name}</div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>

            <div
              className={`flex items-center justify-between text-[#C4C4C4] ${
                (isVisible || (!isVisible && isTabletOrMobile)) && "flex-row"
              }  ${
                !isVisible && !isTabletOrMobile && "flex-col-reverse gap-4"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full ">
                  <Image src={profile_pic} alt="hola" />
                </div>
                {(isVisible || (!isVisible && isTabletOrMobile)) && (
                  <div className="text-xs">
                    <div className="font-bold">
                      {`${user?.name} ${user?.surname}`}
                    </div>

                    <div className="font-thin">{role?.name}</div>
                  </div>
                )}
              </div>
              <div
                className="h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-[#FF9853] hover:text-white"
                onClick={async () => {
                  await signOut();
                }}
              >
                <ArrowLeftOnRectangleIcon />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );
}
