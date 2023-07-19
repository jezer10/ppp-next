import React from "react";

import "./dashboard.css";
import SideBar from "@/components/SideBar";

import { BellIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

import { GlobeAltIcon } from "@heroicons/react/24/outline";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-stretch">
      <SideBar />
      <main className="relative flex h-full w-full flex-col gap-4 overflow-y-auto bg-[#EEE] p-4">
        <div className="absolute inset-0 -z-10 h-full w-full" />
        <header className="flex items-center justify-between">
          <div className="text-[#757575]">
            <div className="text-2xl font-bold">Inicio</div>
            <div className="text-sm">
              Bienvenido, <span className="font-bold">David Reyna</span>
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
          </div>
        </header>
        <section className="h-full ">{children}</section>
      </main>
    </div>
  );
}
