"use client";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
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
import profile_pic from "@/../public/dreyna.jpg";

import {
  ChevronLeftIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import DynamicHeroIcon from "./DynamicHeroIcon";

const Sidebar = () => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef(null);

  const { user, roles } = useInformation();
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState([]);

  async function getAccess() {
    const { access } = await AccessAuthService(roles[0].role_id);
    setMenuItems(access.filter((e: any) => e.father_id == null));
  }

  useEffect(() => {
    getAccess();
  }, [roles]);

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]); // Usar pathname para detectar cambios en la ruta

  const Nav_animation = isTabletMid
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
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-10 max-h-screen bg-black/50 md:hidden ${
          open ? "block" : "hidden"
        }`}
      ></div>

      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="text-gray max-w-80 fixed z-20 w-80 gap-8 overflow-y-auto bg-white shadow-xl  md:relative"
      >
        <div className="relative">
          <div
            className={`-translate-x-8 translate-y-2 bg-[#E4752B] ${
              (open || (!open && isTabletMid)) && "flagg"
            }  ${!open && !isTabletMid && "flagg_min"}`}
          ></div>
          <div className="absolute inset-0">
            <div
              className={` relative bg-[#0F3971]  ${
                (open || (!open && isTabletMid)) && "flagg"
              }  ${!open && !isTabletMid && "flagg_min"}`}
            >
              {(open || (!open && isTabletMid)) && (
                <>
                  <div className="absolute left-6 top-6 w-1/2">
                    <Image
                      src={sis_log}
                      alt="logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="absolute top-0  flex h-full w-full justify-end">
                    <Image src={adv_log} alt="hola" />
                  </div>
                </>
              )}
              {!open && !isTabletMid && (
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
            (open || (!open && isTabletMid)) && "px-8"
          }  ${!open && !isTabletMid && "items-center px-0"}`}
        >
          <nav>
            <ul className="flex flex-col gap-2">
              {menuItems.map((e: any, index) => {
                const path = `/dashboard${e.url || ""}`;
                const isActive =
                  e.url === null
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
                      <DynamicHeroIcon icon={e.icon} />
                      {(open || (!open && isTabletMid)) && <div>{e.name}</div>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* Icono para abrir y cerrar el sidebar en desktop */}

          <div className="flex w-full justify-center">
            <motion.div
              onClick={() => {
                setOpen(!open);
              }}
              animate={
                open
                  ? {
                      x: 0,
                      y: 0,
                      rotate: 0,
                    }
                  : {
                      x: 0,
                      y: 0,
                      rotate: 180,
                    }
              }
              transition={{ duration: 0 }}
              className="bottom-3 z-50 hidden  h-8 w-8 cursor-pointer rounded-full bg-[#FF9853] p-1 text-white md:block"
            >
              <ChevronLeftIcon className="h-full w-full" />
            </motion.div>
          </div>

          <div
            className={`flex items-center justify-between text-[#C4C4C4] ${
              (open || (!open && isTabletMid)) && "flex-row"
            }  ${!open && !isTabletMid && "flex-col-reverse gap-4"}`}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full ">
                <Image src={profile_pic} alt="hola" />
              </div>
              {(open || (!open && isTabletMid)) && (
                <div className="text-xs">
                  <div className="font-bold">
                    {`${user.name} ${user.surname}`}
                  </div>

                  <div className="font-thin">{roles[0].name}</div>
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
  );
};

export default Sidebar;
