"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import adv_log from "../../public/image_logo.png";
import sis_log from "../../public/logo_sistemas.png";
import profile_pic from "../../public/dreyna.jpg";
import { HomeIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useInformation } from "@/lib/hooks/useInformation";
const menuItems = [
  { id: 1, name: "Inicio", path: "" },
  { id: 2, name: "Documentos PPP", path: "/documents" },
  { id: 3, name: "Estudiantes", path: "/students" },
  { id: 4, name: "Supervisores", path: "/supervisors" },
  { id: 5, name: "Solicitudes", path: "/requests" },
  { id: 6, name: "Test", path: "/tests" },
  { id: 7, name: "Configuración", path: "/settings" },
];
export default function SideBar() {
  const { user_data, roles } = useInformation();
  const pathname = usePathname();

  return (
    <aside className="flex h-full bg-white w-80 flex-none flex-col z-[51] ">
      <div className="relative">
        <div className="flagg -translate-x-8 translate-y-2 bg-[#E4752B] "></div>
        <div className="absolute inset-0">
          <div className="flagg relative  bg-[#0F3971] ">
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
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between gap-4 px-8 py-4">
        <nav>
          <ul className=" flex flex-col gap-2">
            {menuItems.map((e, index) => {
              const path = `/dashboard${e.path}`;
              const isActive = pathname === path;
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
                    <HomeIcon className="h-4 w-4" /> <div>{e.name}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center justify-between  text-[#C4C4C4] ">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-full ">
              <Image src={profile_pic} alt="hola" />
            </div>
            <div className="text-xs">
              <div className="font-bold">
                {user_data[0].name + " " + user_data[0].surname}
              </div>

              <div className="font-thin">{roles[0].name}</div>
            </div>
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
    </aside>
  );
}
