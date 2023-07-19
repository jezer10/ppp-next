import React from 'react';

import './dashboard.css';
import SideBar from '@/components/SideBar';

import { BellIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex items-stretch">
      <SideBar />
      <main className=" w-full h-full p-4 flex flex-col gap-4 relative overflow-y-auto bg-[#EEE]">
        <div className=" w-full h-full absolute inset-0 -z-10" />
        <header className="flex items-center justify-between">
          <div className="text-[#757575]">
            <div className="font-bold text-2xl">Inicio</div>
            <div className="text-sm">
              Bienvenido, <span className="font-bold">David Reyna</span>
            </div>
          </div>
          <div className="bg-[#FF9853] rounded-lg flex gap-3 text-white px-4 py-3">
            <button className="w-5 h-5">
              <QuestionMarkCircleIcon />
            </button>
            <button className="w-5 h-5 relative">
              <div className="w-2 h-2 bg-red-600 absolute rounded-full right-0 top-0"></div>
              <BellIcon />
            </button>
            <button className="w-5 h-5">
              <GlobeAltIcon />
            </button>
          </div>
        </header>
        <section className="h-full ">{children}</section>
      </main>
    </div>
  );
}
