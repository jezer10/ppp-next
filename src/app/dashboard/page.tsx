import { Bayon } from "next/font/google";
import { BellIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import nov_img from "@public/novedades.png";
import TopographyPattern from "@/components/icons/TopographyPattern";
const bayon = Bayon({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative rounded-xl bg-gradient-to-r from-[#FD6500] to-[#FF802C] px-4 py-2 md:px-8  md:pb-8 md:pt-12  text-white">
        <div className={`${bayon.className}`}>
          <div className="absolute inset-0  ">
            <div className="relative">
              <span
                className={` absolute md:-left-1 -top-1 md:-top-3 text-2xl md:text-8xl tracking-[0.5rem] md:tracking-[1.5rem] text-white/10  `}
              >
                Novedades
              </span>
            </div>
          </div>
          <div className=" text-2xl md:text-8xl md:leading-[3.5rem]">Novedades</div>
        </div>
        <div className="mt-2 font-sans text-[8px] md:text-sm font-thin">
          Ahora podrás gestionar y monitorizar las PPP de los estudiantes desde
          donde éstes.
        </div>
        <Image
          src={nov_img}
          alt="person"
          className="absolute bottom-0 right-0 md:right-36 w-16"
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
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 font-bold text-white">
        {[1, 2, 3].map((element, idx) => (
          <div
            key={idx}
            className="relative  overflow-hidden rounded-lg bg-[#FBD54F]"
          >
            <TopographyPattern className="h-full text-[#BC9C2C] " />
            <div className="absolute inset-0 flex h-full flex-col ">
              <div className=" flex h-full flex-col justify-between p-4">
                <div className="h-16 w-16 rounded-full border-2 border-dashed border-white p-3">
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
              <div className="bg-[#7B6208]/50 p-8">
                <div className="text-2xl">154</div>
                <div className="text-xs">Practicantes sin confirmar</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
