'use client';
import Image from 'next/image';
import log_sis from '../../public/logo_sistemas.png';
import log_adv from '../../public/logo_adventista.png';
import log_grp from '../../public/group.svg';
import {
  UserIcon,
  CheckIcon,
  XMarkIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';


import { useState } from 'react';

const Home = () => {
  const [isValid, setValid] = useState(false);

  return (
    <div className=" px-16 overflow-hidden   h-screen">
      <div className="bg-gradient-to-r from-[#0F3971] to-white h-full absolute inset-0 -z-20"></div>
      <Image
        src={log_grp}
        alt="logo grupal"
        priority={true}
        className="h-full w-auto absolute right-28 -z-10"
      />
      <div className="flex gap-4">
        <div className="w-56 h-full">
          <div className="px-12 py-8">
            <Image src={log_sis} alt="logo sistemas" className="w-auto h-auto" />
          </div>
          <div className="flex flex-col gap-32">
            <div className="relative">
              <div className="h-72 w-full rounded-br-[50px] rounded-tl-[50px] bg-[#DFDFDF]"></div>
              <div className="flag h-72 w-full rounded-br-[50px] absolute top-6"></div>
            </div>
            <div className="h-72 w-full rounded-br-[50px] rounded-tr-[50px] bg-[#FFAB74]"></div>
          </div>
        </div>
        <div className="w-56 h-full">
          <div className="flex flex-col gap-4">
            <div className="h-72 w-full rounded-br-[50px] rounded-tl-[50px] bg-[#DFDFDF] -translate-y-1/2 bg-opacity-50"></div>
            <div className="relative">
              <div className="h-72 w-full rounded-tr-[50px] -translate-y-1/2 relative overflow-hidden">
                <div className="w-full aspect-square -bottom-32 rounded-full absolute logo_flag"></div>
              </div>
              <div className="absolute bottom-4 w-full aspect-square p-4">
                <div className="w-full h-full bg-[#DCDCDC] rounded-full p-4">
                  <div className="w-full h-full rounded-full bg-[#E7E7E7] p-4">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-10">
                      <Image
                        src={log_adv}
                        alt="logo adventista"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-1/2 absolute right-0 top-0 bottom-0 flex items-center justify-center">
        <div className="max-w-xs flex flex-col gap-4">
          <div className="text-[#0F3971]  text-center ">
            <div className="font-bold text-2xl">Iniciar Sesión</div>
            <div className="text-sm font-light">
              Bienvenido al panel de control de Practicas Pre Profesionales,
              ingresa tus credenciales para continuar
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center relative">
              <input
                type="text"
                className="w-full focus:outline-none rounded-lg py-3 px-4 pr-10  placeholder:text-[#83878D] placeholder:text-sm"
                placeholder="Usuario"
              />
              <div className="w-6 h-6 absolute right-2 text-[#83878D]">
                <div className="relative">
                  <UserIcon />

                  <div
                    className={`bottom-0 right-0 absolute w-3 h-3 bg-white rounded-full ${
                      isValid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isValid ? <CheckIcon /> : <XMarkIcon />}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center relative">
              <input
                type="text"
                className="w-full focus:outline-none rounded-lg py-3 px-4 pr-10  placeholder:text-[#83878D] placeholder:text-sm"
                placeholder="Contraseña"
              />
              <div className="w-6 h-6 absolute right-2 text-[#83878D]">
                <div className="relative">
                  <LockClosedIcon />
                </div>
              </div>
            </div>
            <button className="bg-[#0F3971] text-white rounded-lg py-3">
              Ingresar
            </button>
          </div>
          <div className="text-[#0F3971] text-center text-sm px-4 font-light">
            <p>
              Si tiene problemas con sus credenciales pongase en contacto con{' '}
              <span className="font-bold">soporte</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
