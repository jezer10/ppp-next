import Image from "next/image";
import firstComposition from "@/app/assets/images/first_composition.png";
import secondComposition from "@/app/assets/images/second_composition.png";

export default function ProcessWelcomeModal() {

    
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 px-4">
      <div className="relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg bg-white py-32">
        <div className="absolute left-2 grid grid-cols-3 gap-2 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => (
            <div
              className="h-0.5 w-0.5 rounded-full bg-gray-400  md:h-1 md:w-1"
              key={e}
            ></div>
          ))}
        </div>
        <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-2 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
            <div
              className="h-0.5 w-0.5 rounded-full bg-gray-400 md:h-1 md:w-1"
              key={e}
            ></div>
          ))}
        </div>
        <Image
          src={firstComposition}
          alt="first composition"
          className="absolute bottom-0 left-0 w-12 md:w-auto"
        />
        <Image
          src={secondComposition}
          alt="second composition"
          className="absolute right-0 w-12 md:w-auto"
        />

        <div className="flex flex-col items-center justify-center gap-12 text-[#3D3D3D]">
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold md:text-6xl ">👋Bienvenido</div>
            <div className="text-base font-normal md:text-xl">
              Al proceso de PPP
            </div>
          </div>
          <div className="flex w-40 flex-col items-center gap-2 ">
            <button className="w-full rounded-xl bg-[#FF9853] py-3 font-medium text-white">
              Continuar
            </button>
            <button className="rounded-lg px-4  py-1 font-medium text-[#3D3D3D] hover:bg-gray-200">
              Omitir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
