import Image from 'next/image';
import { Bayon } from 'next/font/google';
import nov_img from '../../../public/novedades.png';
import { BellIcon } from '@heroicons/react/24/solid';
const bayon = Bayon({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="relative px-8 pt-8 pb-4  text-white">
        <div className={`${bayon.className} `}>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r overflow-hidden from-[#FD6500] to-[#FF802C] rounded-lg">
            <div className="relative">
              <span
                className={` absolute -top-2 left-0  text-6xl tracking-[1.5rem]  bg-gradient-to-r bg-clip-text text-transparent from-[#FF8F44] to-white opacity-30`}
              >
                novedades
              </span>
            </div>
          </div>
          <div className=" text-7xl leading-10">novedades</div>
        </div>
        <div className="text-xs mt-2">
          Ahora podrás gestionar y monitoriar las PPP de los estudiantes desde
          donde éstes.
        </div>
        <Image
          src={nov_img}
          alt="person"
          className="absolute right-36 bottom-0"
        />
      </div>
      <div className="h-12 flex gap-2 items-center justify-center">
        {[1, 2, 3, 4].map((e, index) => (
          <div
            key={index}
            className={` h-2 rounded-full  ${
              e == 2 ? 'w-6 bg-[#8F8F8F]' : 'w-2 bg-[#C2C2C2]'
            }`}
          ></div>
        ))}
      </div>
      <div className="h-full  w-full grid grid-cols-3 gap-12 text-white font-bold">
        {[1, 2, 3].map((e) => (
          <div
            key={e}
            className="bg-[#FBD54F] rounded relative overflow-hidden flex flex-col"
          >
            <div className="h-full p-4 flex flex-col justify-between">
              <div className="border rounded-full border-white w-16 h-16 p-2 border-dashed">
                <BellIcon />
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-6xl">312</div>
                <div className="text-xs">
                  <div>Practicantes</div>
                  <div>Confirmados</div>
                </div>
              </div>
            </div>
            <div className="bg-[#7B6208] p-8">
              <div className="text-2xl">154</div>
              <div className="text-xs">Practicantes sin confirmar</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
