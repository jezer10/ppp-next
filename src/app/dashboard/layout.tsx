"use client";
import SideBar from "@/components/SideBar";
import {
  BellIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useInformation } from "@/lib/hooks/useInformation";
import "./dashboard.css";
import { ReactNode, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, role } = useInformation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () =>
    isSidebarVisible ? setSidebarVisible(false) : setSidebarVisible(true);
  return (
    <div className="flex h-screen items-stretch">
      <SideBar
        isVisible={isSidebarVisible}
        isTabletOrMobile={isTabletOrMobile}
        closeSidebar={() => setSidebarVisible(false)}
        openSidebar={() => setSidebarVisible(true)}
      />
      <main
        className="relative flex h-full w-full flex-col gap-4 overflow-y-auto p-4"
        style={{ backgroundColor: "#EEE" }}
      >
        <header className="flex items-center justify-between">
          <div className="text-[#757575]">
            <div className="text-2xl font-bold">Inicio</div>
            <div className="text-sm">
              <p>
                <span>Bienvenido, </span>
                <span className="font-bold">
                  {`${user?.name} ${user?.surname}`}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[#FF9853] px-4 py-3 text-white">
            <button className="h-5 w-5">
              <QuestionMarkCircleIcon />
            </button>
            <button className="relative h-5 w-5">
              <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-600"></div>
              <BellIcon />
            </button>
            <button className="h-5 w-5">
              <GlobeAltIcon />
            </button>
            <button className="h-5 w-5" onClick={toggleSidebar}>
              <Bars3Icon />
            </button>
          </div>
        </header>
        <section className="h-full">{children}</section>
      </main>
    </div>
  );
}
