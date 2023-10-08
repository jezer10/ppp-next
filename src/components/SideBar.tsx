'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import adv_log from '../../public/image_logo.png';
import sis_log from '../../public/logo_sistemas.png';
import profile_pic from '../../public/dreyna.jpg';
import { HomeIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
const menuItems = [
  { id: 1, name: 'Inicio', path: '' },
  { id: 2, name: 'Proceso PPP', path: '/procesoPPP' },
  { id: 3, name: 'Documentos PPP', path: '/documents' },
  { id: 4, name: 'Estudiantes', path: '/students' },
  { id: 5, name: 'Supervisores', path: '/supervisors' },
  { id: 6, name: 'Solicitudes', path: '/requests' },
  { id: 7, name: 'Test', path: '/tests' },
  { id: 8, name: 'Configuración', path: '/settings' },
];
export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 h-full  flex-none flex flex-col  ">
      <div className="relative">
        <div className="flagg bg-[#E4752B] translate-y-2 -translate-x-8 "></div>
        <div className="absolute inset-0">
          <div className="relative flagg  bg-[#0F3971] ">
            <div className="absolute top-6 left-6 w-1/2">
              <Image
                src={sis_log}
                alt="logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="absolute h-full  top-0 flex justify-end w-full">
              <Image src={adv_log} alt="hola" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 flex flex-col justify-between gap-4 h-full py-4">
        <nav>
          <ul className=" flex flex-col gap-2">
            {menuItems.map((e, index) => {
              const path = `/dashboard${e.path}`;
              const isActive = pathname === path;
              return (
                <li key={index}>
                  <Link
                    href={path}
                    className={`flex text-sm rounded-lg px-4 py-3 gap-2 hover:bg-[#FF9853] hover:text-white hover:font-bold transition-all ${
                      isActive
                        ? 'bg-[#FF9853] text-white font-bold'
                        : 'text-[#C4C4C4]'
                    }`}
                  >
                    <HomeIcon className="w-4 h-4" /> <div>{e.name}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex justify-between items-center  text-[#C4C4C4] ">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden ">
              <Image src={profile_pic} alt="hola" />
            </div>
            <div className="text-xs">
              <div className="font-bold">David Reyna</div>

              <div className="font-thin">Coordinador de PPP</div>
            </div>
          </div>
          <div className="w-8 h-8 hover:bg-[#FF9853] hover:text-white rounded-full p-1 cursor-pointer">
            <ArrowLeftOnRectangleIcon />
          </div>
        </div>
      </div>
    </aside>
  );
}
