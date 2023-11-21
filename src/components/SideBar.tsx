"use client";
import { useEffect, useState } from "react";
import { useRef } from "react";
// import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useRouter, usePathname } from "next/navigation"; // Importa useRouter de Next.js
import Link from "next/link";
import { useInformation } from "@/lib/hooks/useInformation";
import { AccessAuthService } from "@/services";
import Image from "next/image";
import adv_log from "../../public/image_logo.png";
import sis_log_min from "../../public/logo_sistemas_mini.png";
import sis_log from "../../public/logo_sistemas.png";
import {
  ClockIcon,
  HomeIcon,
  ChevronLeftIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import profile_pic from "../../public/dreyna.jpg";
import { signOut } from "next-auth/react";
import DynamicHeroIcon from "./DynamicHeroIcon";

const Sidebar = () => {
  // const router = useRouter(); // Usa el hook useRouter para obtener la ruta actual
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef(null);

  const { user_data, roles } = useInformation();
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState([]);

  async function getAccess() {
    const accesos = await AccessAuthService(roles[0].role_id);
    setMenuItems(accesos.info.filter((e: any) => e.father_id == null));
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
      {/* Cerrar sidebar en vista móvil clickando afuera*/}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[900] max-h-screen bg-black/50 md:hidden ${
          open ? "block" : "hidden"
        }`}
      ></div>

      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="text-gray max-w-80 fixed z-[901] flex h-full w-80 flex-none flex-col 
        
        gap-8 overflow-y-auto  bg-white shadow-xl md:relative"
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
              {menuItems.length !== 0 &&
                menuItems.map((e: any, index) => {
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
                        {/* <DynamicHeroIcon icon={e.icon} />
                      {
                        (open || (!open && isTabletMid)) && (
                          <div>{e.name}</div>
                        )
                      } */}
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
                    {user_data[0].name + " " + user_data[0].surname}
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

      {/* Icono en mobile para abrir el sidebar */}
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <Bars3Icon className="h-4 w-4" />
      </div>
    </div>
  );
};

export default Sidebar;

// <aside className="flex h-full bg-white w-80 flex-none flex-col z-[51] ">
//   <div className="relative">
//     <div className="flagg -translate-x-8 translate-y-2 bg-[#E4752B] "></div>
//     <div className="absolute inset-0">
//       <div className="flagg relative  bg-[#0F3971] ">
//         <div className="absolute left-6 top-6 w-1/2">
//           <Image
//             src={sis_log}
//             alt="logo"
//             className="h-full w-full object-contain"
//           />
//         </div>
//         <div className="absolute top-0  flex h-full w-full justify-end">
//           <Image src={adv_log} alt="hola" />
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="flex h-full flex-col justify-between gap-4 px-8 py-4">
//     <nav>
//       <ul className=" flex flex-col gap-2">
//         {menuItems.length !== 0 && menuItems.map((e : any, index) => {
//           const path = `/dashboard${e.url || ""}`;
//           const isActive = pathname === path;
//           return (
//             <li key={index}>
//               <Link
//                 href={path}
//                 className={`flex gap-2 rounded-lg px-4 py-3 text-sm transition-all hover:bg-[#FF9853] hover:font-bold hover:text-white ${
//                   isActive
//                     ? "bg-[#FF9853] font-bold text-white"
//                     : "text-[#C4C4C4]"
//                 }`}
//               >
//                 <HomeIcon className="h-4 w-4" /> <div>{e.name}</div>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//     <div className="flex items-center justify-between  text-[#C4C4C4] ">
//       <div className="flex items-center gap-4">
//         <div className="h-12 w-12 overflow-hidden rounded-full ">
//           <Image src={profile_pic} alt="hola" />
//         </div>
//         <div className="text-xs">
//           <div className="font-bold">
//             {user_data[0].name + " " + user_data[0].surname}
//           </div>

//           <div className="font-thin">{roles[0].name}</div>
//         </div>
//       </div>
//       <div
//         className="h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-[#FF9853] hover:text-white"
//         onClick={async () => {
//           await signOut();
//         }}
//       >
//         <ArrowLeftOnRectangleIcon />
//       </div>
//     </div>
//   </div>
// </aside>
