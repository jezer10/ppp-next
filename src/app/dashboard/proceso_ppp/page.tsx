'use client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Image from "next/image";
import pose13_1 from "@public/Pose13_1.svg";
import image_18 from "@public/image_18.svg";
import image_17 from "@public/image_17.svg";
import image_16 from "@public/image_16.svg";
import { useInformation } from "@/lib/hooks/useInformation";
import React from "react";
import { config } from "@/config";


function Page() {
  const { user_data, loading } = useInformation();
  const URL_APIS = config.BACK_URL;
  console.log("hola");

  console.log(user_data);
  validarIntroduccionVista();

  async function validarIntroduccionVista() {
    const userId = user_data[0].user_id;
    const introduccion_visto: boolean = false;
    console.log("userID:" + userId);

    if (userId > 0) {

      const response = await fetch(URL_APIS + "/student/introduccion_visto/" + userId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    }
    console.log(introduccion_visto);
  }
  return (
    // <section className="mx-[67px] mt-[35px]">
    //     <section className="">
    //         <div className="text-[32px] not-italic font-bold leading-[normal];">Proceso de PPP</div>
    //         <div className="text-sm not-italic font-normal leading-[normal];">Gestión de practicas pre profesionales</div>
    //     </section>
    //     <section className="flex flex-col mt-[73px] bg-white w-full h-[460px] shrink-0 rounded-[10px] flex  items-center justify-center">
    //             <div className="w-max text-[32px] not-italic font-bold leading-[normal]">Elije la modalidad de tus PPP</div>
    //             <div className="flex flex-row mt-[66px]">
    //                 <div className="relative bg-[#0F3971]  w-[271px] h-[87px] shrink-0 rounded-[10px] flex items-center justify-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
    //                     <p className="text-[16px] text-white">Estudiante - Empresa</p>
    //                     <button>
    //                         <InformationCircleIcon className="w-5 h-5 text-white absolute top-2 right-2" />
    //                     </button>
    //                 </div>
    //                 <div className="relative ms-11 bg-white w-[271px] h-[87px] shrink-0 rounded-[10px] flex items-center justify-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
    //                     <p className="text-[16px] ">Estudiante - Universidad</p>
    //                     <button>
    //                         <InformationCircleIcon className="w-5 h-5 text-[#A6A6A6] absolute top-2 right-2" />
    //                     </button>
    //                 </div>
    //             </div>
    //             <div className="text-[10px] mt-5">
    //                 ¿No sabes cúal elegir? Solicita orientación al coordinador o supervisor responsable de las PPP
    //             </div>
    //             <button className="mt-16 bg-[#FF9853] w-[188px] h-[44.013px] shrink-0 rounded-[10px] flex items-center justify-center text-white">
    //                 Confirmar
    //             </button>
    //     </section>
    // </section>






<>
    



    // <section>
    //     <div>
    //         <p className="text-2xl font-bold">1 Solicita los datos de la empresa</p>
    //         <p>Recuerda que necesitas los datos de la empresa como:</p>
    //         <div>
    //             <p>Nombre de la Empresa</p>
    //             <p>Nombre del Generente</p>
    //         </div>
    //     </div>
    //     <div>
    //         <p className="text-2xl font-bold">2 Genera tu carta de presentación</p>
    //         <p>Una vez que tengas los datos ve a la opción de generar carta de presentación y coloca los datos correspondientes.</p>
    //     </div>
    //     <div>
    //         <p className="text-2xl font-bold">3 Solicita tu carta de aceptación</p>
    //         <p>Una vez contratado, solicita al área encargada tu carta de aceptación para poder subirlo a la plataforma y continuar con tu proceso de PPP.</p>
    //     </div>
    //     <button className="w-[168px] mt-[67px] h-10 shrink-0 rounded-[10px] bg-[#ff9853]">
    //         <p className="text-white text-sm">Continuar</p>
    //     </button>
    //     <p className="text-sm w-max mt-[16px]">Omitir</p>
    // </section>





    //
    // <div className="flex flex-col w-full">
    //     <div className="bg-white flex flex-col justify-end gap-12 h-[478px] shrink-0 p-16 rounded-lg">
    //         <div className="flex flex-col ml-1 gap-6 items-start">
    //             <div className="flex flex-row gap-2 w-3/5 items-start">
    //                 <Image src={image_18} alt="contrato" className="w-20 shrink-0" />
    //                 <div className="flex flex-col gap-3 w-[363px] items-start">
    //                     <div className="self-stretch flex flex-col items-start">
    //                         <div className="text-2xl font-sans font-bold text-[#3d3d3d]">
    //                             1 Solicita los datos de la empresa
    //                         </div>
    //                         <div className="text-xs font-sans text-[#3d3d3d]">
    //                             Recuerda que necesitas los datos de la empresa como:
    //                         </div>
    //                     </div>
    //                     <div className="text-xs font-sans text-[#3d3d3d]">
    //                         • Nombre de la Empresa
    //                         <br />• Nombre del Generente
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="self-end flex flex-row gap-3 w-3/5 items-center">
    //                 <Image src={image_17} alt="portafolio" className="self-start w-20 shrink-0" />
    //                 <div className="flex flex-col w-[366px] items-start">
    //                     <div className="text-2xl font-sans font-bold text-[#3d3d3d]">
    //                         2 Genera tu carta de presentación
    //                     </div>
    //                     <div className="text-xs font-sans text-[#3d3d3d] ml-px w-full">
    //                         Una vez que tengas los datos ve a la opción de generar carta de
    //                         presentación y coloca los datos correspondientes.
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="flex flex-row justify-between mr-1 items-start">
    //             <div className="flex flex-row gap-2 w-3/5 items-start">
    //                 <Image src={image_16} alt="mano" className="mt-2 w-20 shrink-0" />
    //                 <div className="flex flex-col w-[347px] items-start">
    //                     <div className="text-2xl font-sans font-bold text-[#3d3d3d]">
    //                         3 Solicita tu carta de aceptación
    //                     </div>
    //                     <div className="text-xs font-sans text-[#3d3d3d] ml-px w-full">
    //                         Una vez contratado, solicita al área encargada tu carta de
    //                         aceptación para poder subirlo a la plataforma y continuar con tu
    //                         proceso de PPP.
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="self-end flex flex-col mt-8 gap-4 items-center">
    //                 <div className="bg-[#ff9853] self-start flex flex-col justify-center w-40 h-10 shrink-0 items-center rounded-lg">
    //                     <div className="text-center text-sm font-sans font-bold text-white">
    //                         Saber más
    //                     </div>
    //                 </div>
    //                 <div className="text-sm font-sans font-bold text-[#3d3d3d]">Omitir</div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    //
    //



    <section className="mx-[67px] mt-[35px]">
      <div>
      </div>
      <section className="">
        <div className="text-[32px] not-italic font-bold leading-[normal];">Proceso de PPP</div>
        <div className="text-sm not-italic font-normal leading-[normal];">Gestión de practicas pre profesionales</div>
      </section>

      <div id="NewRootRoot" className="flex flex-col w-full mt-[74px]">
        <div className="bg-white flex flex-row justify-center pt-8 gap-20 items-start rounded-lg">
          <div className="flex flex-col mb-8 gap-6 items-start">
            <div className="self-end relative flex flex-col mr-6 w-20 items-start">
              <div className="text-center text-base font-['Gilroy'] font-bold text-[#757575] absolute top-6 left-6 h-5 w-8">
                25%
              </div>
              <div
                id="Subtract"
                className="bg-[url(https://file.rendit.io/n/RB7eDoF0fPSlnSPcwfSK.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat relative flex flex-col pr-0 w-20 h-20 shrink-0 items-end"
              >
                <img
                  src="https://file.rendit.io/n/TiCox1JZedst2VcFKT9Z.svg"
                  id="Subtract1"
                  className="w-10"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-40 h-[295px] shrink-0">
              <div className="flex flex-row mb-px gap-3 items-center">
                <div
                  id="Ellipse"
                  className="bg-[url(https://file.rendit.io/n/S4rs8KIeTGGzF2K8lwl3.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat self-start flex flex-col w-6 shrink-0 h-6 items-start pt-1 pb-2 pl-2"
                >
                  <div className="text-center text-xs font-sans text-[#ff9853]">
                    1
                  </div>
                </div>
                <div className="text-xs font-sans font-bold text-[#ff9853]">
                  Carta de Presentación
                </div>
              </div>
              <div className="flex flex-row gap-3 items-start mb-px mr-3">
                <div
                  id="Ellipse1"
                  className="bg-[url(https://file.rendit.io/n/gT62qZuSD05og0nTWuRD.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col w-6 shrink-0 h-6 items-start pt-2 pb-1 pl-2"
                >
                  <div className="text-center text-xs font-sans text-[#757575]">
                    2
                  </div>
                </div>
                <div className="text-xs font-sans text-[#757575] mt-2">
                  Carta de Aceptación
                </div>
              </div>
              <div className="self-start flex flex-row mb-px gap-3 w-24 items-start">
                <div
                  id="Ellipse2"
                  className="bg-[url(https://file.rendit.io/n/drIeTHJdeYQgnDUDSCsK.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col w-6 shrink-0 h-6 items-start pl-2 py-1"
                >
                  <div className="text-center text-xs font-sans text-[#757575]">
                    3
                  </div>
                </div>
                <div className="text-xs font-sans text-[#757575] mt-1">Plan PPP</div>
              </div>
              <div className="flex flex-row gap-3 items-start mb-px mr-10">
                <div
                  id="Ellipse3"
                  className="bg-[url(https://file.rendit.io/n/gT62qZuSD05og0nTWuRD.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col w-6 shrink-0 h-6 items-start pl-2 py-1"
                >
                  <div className="text-center text-xs font-sans text-[#757575]">
                    4
                  </div>
                </div>
                <div className="text-xs font-sans text-[#757575] mt-1">
                  Convenio PPP
                </div>
              </div>
              <div className="flex flex-row mr-12 gap-3 items-center">
                <div
                  id="Ellipse4"
                  className="bg-[url(https://file.rendit.io/n/sERooY7m1MWgR6Ipzm0h.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat self-start flex flex-col w-6 shrink-0 h-6 items-start pl-2 py-1"
                >
                  <div className="text-center text-xs font-sans text-[#757575]">
                    5
                  </div>
                </div>
                <div className="text-xs font-sans text-[#757575]">Informe PPP</div>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div
                  id="Ellipse5"
                  className="bg-[url(https://file.rendit.io/n/sERooY7m1MWgR6Ipzm0h.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat self-start flex flex-col w-6 shrink-0 h-6 items-start pl-2 py-1"
                >
                  <div className="text-center text-xs font-sans text-[#757575]">
                    6
                  </div>
                </div>
                <div className="text-xs font-sans text-[#757575]">
                  Constancia de Trabajo
                </div>
              </div>
              <div className="self-start flex flex-row gap-3 w-2/3 items-center">
                <div
                  id="Ellipse6"
                  className="bg-[url(https://file.rendit.io/n/sERooY7m1MWgR6Ipzm0h.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat self-start flex flex-col w-6 shrink-0 h-6 items-start pl-2 py-1"
                >
                  <div className="text-center text-xs font-sans text-[#757575]">
                    7
                  </div>
                </div>
                <div className="text-xs font-sans text-[#757575]">Documento</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-2 gap-12 w-3/5 items-start">
            <div
              id="Line6"
              className="border-solid border-[rgba(117,_117,_117,_0.22)] w-px shrink-0 h-[386px] border-r border-l-0 border-y-0"
            />
            <div className="flex flex-col gap-10 w-[431px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col mr-6 gap-4 items-start">
                  <div className="text-center text-xl font-sans font-bold text-[#757575]">
                    Documentación
                  </div>
                  <div className="self-stretch flex flex-col gap-2 items-start">
                    <div className="text-center text-sm font-sans text-[#757575]">
                      Consideraciones:
                    </div>
                    <div className="self-stretch flex flex-col justify-between gap-1 items-start">
                      <div className="text-xs font-sans text-[#757575]">
                        • El archivo no debe exceder los 2MB
                      </div>
                      <div className="text-xs font-sans text-[#757575]">
                        • Formatos aceptados: .pdf
                      </div>
                      <div className="text-xs font-sans text-[#757575] w-full">
                        • Para generar la carta de presentación necesitas tener a
                        disposición la informacion que se solicita.
                      </div>
                      <div className="text-xs font-sans text-[#757575]">
                        • Puedes generar la carta de presentación desde la opción{" "}
                        <span className="font-bold">DOCUMENTOS</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-1 gap-5">
                  <div className="flex flex-row mr-px gap-2 items-start">
                    <img
                      src="https://file.rendit.io/n/J91kBKSuVCr8QvmHzqDi.svg"
                      className="w-4 shrink-0"
                    />
                    <div className="flex flex-col mr-0 gap-1 w-[356px] items-start">
                      <div className="text-xs font-sans font-light text-[#757575]">
                        carta-aceptacion.pdf
                      </div>
                      <div className="bg-[#ececec] self-stretch flex flex-col rounded-lg">
                        <div className="bg-[#b4b4b4] mr-16 h-1 shrink-0 rounded-lg" />
                      </div>
                    </div>
                    <div className="text-xl font-sans font-light text-[#757575] mt-1">
                      75%
                    </div>
                  </div>
                  <div className="border-dashed border-[#ff9853] bg-[rgba(217,_217,_217,_0)] flex flex-col justify-center ml-0 gap-1 h-20 shrink-0 items-center border-2 rounded-lg">
                    <img
                      src="https://file.rendit.io/n/9vwwv3BdiuKUYOlQG3Hc.svg"
                      className="w-5"
                    />
                    <div className="text-center text-xs font-sans font-light text-[#767070]">
                      Arrastre y suelte el archivo{" "}
                      <span className="font-bold">aquí </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#ff9853] flex flex-col justify-center pr-[180px] h-8 shrink-0 items-end ml-1 mr-px rounded-lg">
                <div className="text-center text-xs font-sans font-bold text-white">
                  Enviar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
export default Page