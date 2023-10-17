import Image from "next/image";
import { Bayon } from "next/font/google";
import nov_img from "../../../public/novedades.png";
import { BellIcon } from "@heroicons/react/24/solid";
const bayon = Bayon({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative px-8 pb-4 pt-8  text-white">
        <div className={`${bayon.className} `}>
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg bg-gradient-to-r from-[#FD6500] to-[#FF802C]">
            <div className="relative">
              <span
                className={` absolute -top-2 left-0  bg-gradient-to-r from-[#FF8F44]  to-white bg-clip-text text-6xl tracking-[1.5rem] text-transparent opacity-30`}
              >
                novedades
              </span>
            </div>
          </div>
          <div className=" text-7xl leading-10">novedades</div>
        </div>
        <div className="mt-2 text-xs">
          Ahora podrás gestionar y monitoriar las PPP de los estudiantes desde
          donde éstes.
        </div>
        <Image
          src={nov_img}
          alt="person"
          className="absolute bottom-0 right-36"
        />
      </div>
      <div className="flex h-12 items-center justify-center gap-2">
        {[1, 2, 3, 4].map((e, index) => (
          <div
            key={index}
            className={` h-2 rounded-full  ${
              e == 2 ? "w-6 bg-[#8F8F8F]" : "w-2 bg-[#C2C2C2]"
            }`}
          />
        ))}
      </div>
      <div className="grid  h-full w-full grid-cols-3 gap-12 font-bold text-white">
        {[1, 2, 3].map((e) => (
          <div
            key={e}
            className="relative flex flex-col overflow-hidden rounded bg-[#FBD54F]"
          >
            <div className="flex h-full flex-col justify-between p-4">
              <div className="h-16 w-16 rounded-full border border-dashed border-white p-2">
                <BellIcon />
              </div>
              <div className="flex items-center gap-2">
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
