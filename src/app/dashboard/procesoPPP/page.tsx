import { InformationCircleIcon  } from '@heroicons/react/24/solid';

export default function ProcesoPPP() {
  return (
      <section className="mx-[67px] mt-[35px]">
          <section className="">
              <div className="text-[32px] not-italic font-bold leading-[normal];">Proceso de PPP</div>
              <div className="text-sm not-italic font-normal leading-[normal];">Gestión de practicas pre profesionales</div>
          </section>
          <section className="flex flex-col mt-[73px] bg-white w-full h-[460px] shrink-0 rounded-[10px] flex  items-center justify-center">
                  <div className="w-max text-[32px] not-italic font-bold leading-[normal]">Elije la modalidad de tus PPP</div>
                  <div className="flex flex-row mt-[66px]">
                      <div className="relative bg-[#0F3971]  w-[271px] h-[87px] shrink-0 rounded-[10px] flex items-center justify-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
                          <p className="text-[16px] text-white">Estudiante - Empresa</p>
                          <button>
                              <InformationCircleIcon className="w-5 h-5 text-white absolute top-2 right-2" />
                          </button>
                      </div>
                      <div className="relative ms-11 bg-white w-[271px] h-[87px] shrink-0 rounded-[10px] flex items-center justify-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
                          <p className="text-[16px] ">Estudiante - Universidad</p>
                          <button>
                              <InformationCircleIcon className="w-5 h-5 text-[#A6A6A6] absolute top-2 right-2" />
                          </button>
                      </div>
                  </div>
                  <div className="text-[10px] mt-5">
                      ¿No sabes cúal elegir? Solicita orientación al coordinador o supervisor responsable de las PPP
                  </div>
                  <button className="mt-16 bg-[#FF9853] w-[188px] h-[44.013px] shrink-0 rounded-[10px] flex items-center justify-center text-white">
                      Confirmar
                  </button>
          </section>
      </section>
  );
}
