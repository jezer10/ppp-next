"use client";
import Image from "next/image";
import image_18 from "@public/image_18.svg";
import image_17 from "@public/image_17.svg";
import image_16 from "@public/image_16.svg";
import { useInformation } from "@/lib/hooks/useInformation";
import React, { useEffect } from "react";
import config from "@/config";

function Page() {
  const { loading, user } = useInformation();
  const URL_APIS = config.BACK_URL;

  async function validarIntroduccionVista() {
    const userId = user?.user_id;
    if (userId > 0) {
      const response = await fetch(
        URL_APIS + "/student/introduccion_visto/" + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      console.log(data);
    }
  }

  useEffect(() => {
    validarIntroduccionVista();
  });
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
      {/* <section>
        <div>
          <p className="text-2xl font-bold">
            1 Solicita los datos de la empresa
          </p>
          <p>Recuerda que necesitas los datos de la empresa como:</p>

          <div>
            <p>Nombre de la Empresa</p>
            <p>Nombre del Generente</p>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">
            2 Genera tu carta de presentación
          </p>
          <p>
            Una vez que tengas los datos ve a la opción de generar carta de
            presentación y coloca los datos correspondientes.
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            3 Solicita tu carta de aceptación
          </p>
          <p>
            Una vez contratado, solicita al área encargada tu carta de
            aceptación para poder subirlo a la plataforma y continuar con tu
            proceso de PPP.
          </p>
        </div>
        <button className="mt-[67px] h-10 w-[168px] shrink-0 rounded-[10px] bg-[#ff9853]">
          <p className="text-sm text-white">Continuar</p>
        </button>
        <p className="mt-[16px] w-max text-sm">Omitir</p>
      </section> */}
      <div className="flex w-full flex-col">
        <div className="flex h-[478px] shrink-0 flex-col justify-end gap-12 rounded-lg bg-white p-16">
          <div className="ml-1 flex flex-col items-start gap-6">
            <div className="flex w-3/5 flex-row items-start gap-2">
              <Image src={image_18} alt="contrato" className="w-20 shrink-0" />
              <div className="flex w-[363px] flex-col items-start gap-3">
                <div className="flex flex-col items-start self-stretch">
                  <div className="font-sans text-2xl font-bold text-[#3d3d3d]"></div>
                  <div className="font-sans text-xs text-[#3d3d3d]"></div>
                </div>
                <div className="font-sans text-xs text-[#3d3d3d]">
                  • Nombre de la Empresa <br />• Nombre del Generente //{" "}
                </div>
              </div>
            </div>
            <div className="flex w-3/5 flex-row items-center gap-3 self-end">
              <Image
                src={image_17}
                alt="portafolio"
                className="w-20 shrink-0 self-start"
              />
              <div className="flex w-[366px] flex-col items-start">
                <div className="font-sans text-2xl font-bold text-[#3d3d3d]">
                  2 Genera tu carta de presentación
                </div>
                <div className="ml-px w-full font-sans text-xs text-[#3d3d3d]">
                  Una vez que tengas los datos ve a la opción de generar carta
                  depresentación y coloca los datos correspondientes.
                </div>
              </div>
            </div>
          </div>
          <div className="mr-1 flex flex-row items-start justify-between">
            <div className="flex w-3/5 flex-row items-start gap-2">
              <Image src={image_16} alt="mano" className="mt-2 w-20 shrink-0" />
              <div className="flex w-[347px] flex-col items-start">
                <div className="font-sans text-2xl font-bold text-[#3d3d3d]">
                  3 Solicita tu carta de aceptación
                </div>
                <div className="ml-px w-full font-sans text-xs text-[#3d3d3d]">
                  Una vez contratado, solicita al área encargada tu carta de
                  aceptación para poder subirlo a la plataforma y continuar con
                  tu proceso de PPP.
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 self-end">
              <div className="flex h-10 w-40 shrink-0 flex-col items-center justify-center self-start rounded-lg bg-[#ff9853]">
                <div className="text-center font-sans text-sm font-bold text-white">
                  Saber más
                </div>
              </div>
              <div className="font-sans text-sm font-bold text-[#3d3d3d]">
                Omitir
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mx-[67px] mt-[35px]">
        <div></div>
        <section className="">
          <div className="leading-[normal]; text-[32px] font-bold not-italic">
            Proceso de PPP
          </div>
          <div className="leading-[normal]; text-sm font-normal not-italic">
            Gestión de practicas pre profesionales
          </div>
        </section>

        <div id="NewRootRoot" className="mt-[74px] flex w-full flex-col">
          <div className="flex flex-row items-start justify-center gap-20 rounded-lg bg-white pt-8">
            <div className="mb-8 flex flex-col items-start gap-6">
              <div className="relative mr-6 flex w-20 flex-col items-start self-end">
                <div className="absolute left-6 top-6 h-5 w-8 text-center font-['Gilroy'] text-base font-bold text-[#757575]">
                  25%
                </div>
                <div
                  id="Subtract"
                  className="bg-50%_50% relative flex h-20 w-20 shrink-0 flex-col items-end bg-[url(https://file.rendit.io/n/RB7eDoF0fPSlnSPcwfSK.svg)] bg-cover bg-no-repeat pr-0 bg-blend-normal"
                >
                  <Image
                    alt="substract"
                    src="https://file.rendit.io/n/TiCox1JZedst2VcFKT9Z.svg"
                    id="Subtract1"
                    className="w-10"
                  />
                </div>
              </div>
              <div className="flex h-[295px] w-40 shrink-0 flex-col gap-4">
                <div className="mb-px flex flex-row items-center gap-3">
                  <div
                    id="Ellipse"
                    className="bg-50%_50% flex h-6 w-6 shrink-0 flex-col items-start self-start bg-[url(https://file.rendit.io/n/S4rs8KIeTGGzF2K8lwl3.svg)] bg-cover bg-no-repeat pb-2 pl-2 pt-1 bg-blend-normal"
                  >
                    <div className="text-center font-sans text-xs text-[#ff9853]">
                      1
                    </div>
                  </div>
                  <div className="font-sans text-xs font-bold text-[#ff9853]">
                    Carta de Presentación
                  </div>
                </div>
                <div className="mb-px mr-3 flex flex-row items-start gap-3">
                  <div
                    id="Ellipse1"
                    className="bg-50%_50% flex h-6 w-6 shrink-0 flex-col items-start bg-[url(https://file.rendit.io/n/gT62qZuSD05og0nTWuRD.svg)] bg-cover bg-no-repeat pb-1 pl-2 pt-2 bg-blend-normal"
                  >
                    <div className="text-center font-sans text-xs text-[#757575]">
                      2
                    </div>
                  </div>
                  <div className="mt-2 font-sans text-xs text-[#757575]">
                    Carta de Aceptación
                  </div>
                </div>
                <div className="mb-px flex w-24 flex-row items-start gap-3 self-start">
                  <div
                    id="Ellipse2"
                    className="bg-50%_50% flex h-6 w-6 shrink-0 flex-col items-start bg-[url(https://file.rendit.io/n/drIeTHJdeYQgnDUDSCsK.svg)] bg-cover bg-no-repeat py-1 pl-2 bg-blend-normal"
                  >
                    <div className="text-center font-sans text-xs text-[#757575]">
                      3
                    </div>
                  </div>
                  <div className="mt-1 font-sans text-xs text-[#757575]">
                    Plan PPP
                  </div>
                </div>
                <div className="mb-px mr-10 flex flex-row items-start gap-3">
                  <div
                    id="Ellipse3"
                    className="bg-50%_50% flex h-6 w-6 shrink-0 flex-col items-start bg-[url(https://file.rendit.io/n/gT62qZuSD05og0nTWuRD.svg)] bg-cover bg-no-repeat py-1 pl-2 bg-blend-normal"
                  >
                    <div className="text-center font-sans text-xs text-[#757575]">
                      4
                    </div>
                  </div>
                  <div className="mt-1 font-sans text-xs text-[#757575]">
                    Convenio PPP
                  </div>
                </div>
                <div className="mr-12 flex flex-row items-center gap-3">
                  <div
                    id="Ellipse4"
                    className="bg-50%_50% flex h-6 w-6 shrink-0 flex-col items-start self-start bg-[url(https://file.rendit.io/n/sERooY7m1MWgR6Ipzm0h.svg)] bg-cover bg-no-repeat py-1 pl-2 bg-blend-normal"
                  >
                    <div className="text-center font-sans text-xs text-[#757575]">
                      5
                    </div>
                  </div>
                  <div className="font-sans text-xs text-[#757575]">
                    Informe PPP
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <div
                    id="Ellipse5"
                    className="bg-50%_50% flex h-6 w-6 shrink-0 flex-col items-start self-start bg-[url(https://file.rendit.io/n/sERooY7m1MWgR6Ipzm0h.svg)] bg-cover bg-no-repeat py-1 pl-2 bg-blend-normal"
                  >
                    <div className="text-center font-sans text-xs text-[#757575]">
                      6
                    </div>
                  </div>
                  <div className="font-sans text-xs text-[#757575]">
                    Constancia de Trabajo
                  </div>
                </div>
                <div className="flex w-2/3 flex-row items-center gap-3 self-start">
                  <div
                    id="Ellipse6"
                    className="bg-50%_50% flex h-6 w-6 shrink-0 flex-col items-start self-start bg-[url(https://file.rendit.io/n/sERooY7m1MWgR6Ipzm0h.svg)] bg-cover bg-no-repeat py-1 pl-2 bg-blend-normal"
                  >
                    <div className="text-center font-sans text-xs text-[#757575]">
                      7
                    </div>
                  </div>
                  <div className="font-sans text-xs text-[#757575]">
                    Documento
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex w-3/5 flex-row items-start gap-12">
              <div
                id="Line6"
                className="h-[386px] w-px shrink-0 border-y-0 border-l-0 border-r border-solid border-[rgba(117,_117,_117,_0.22)]"
              />
              <div className="flex w-[431px] flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <div className="mr-6 flex flex-col items-start gap-4">
                    <div className="text-center font-sans text-xl font-bold text-[#757575]">
                      Documentación
                    </div>
                    <div className="flex flex-col items-start gap-2 self-stretch">
                      <div className="text-center font-sans text-sm text-[#757575]">
                        Consideraciones:
                      </div>
                      <div className="flex flex-col items-start justify-between gap-1 self-stretch">
                        <div className="font-sans text-xs text-[#757575]">
                          • El archivo no debe exceder los 2MB
                        </div>
                        <div className="font-sans text-xs text-[#757575]">
                          • Formatos aceptados: .pdf
                        </div>
                        <div className="w-full font-sans text-xs text-[#757575]">
                          • Para generar la carta de presentación necesitas
                          tener a disposición la informacion que se solicita.
                        </div>
                        <div className="font-sans text-xs text-[#757575]">
                          • Puedes generar la carta de presentación desde la
                          opción <span className="font-bold">DOCUMENTOS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-1 flex flex-col gap-5">
                    <div className="mr-px flex flex-row items-start gap-2">
                      <Image
                        alt="contrato"
                        src="https://file.rendit.io/n/J91kBKSuVCr8QvmHzqDi.svg"
                        className="w-4 shrink-0"
                      />
                      <div className="mr-0 flex w-[356px] flex-col items-start gap-1">
                        <div className="font-sans text-xs font-light text-[#757575]">
                          carta-aceptacion.pdf
                        </div>
                        <div className="flex flex-col self-stretch rounded-lg bg-[#ececec]">
                          <div className="mr-16 h-1 shrink-0 rounded-lg bg-[#b4b4b4]" />
                        </div>
                      </div>
                      <div className="mt-1 font-sans text-xl font-light text-[#757575]">
                        75%
                      </div>
                    </div>
                    <div className="ml-0 flex h-20 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#ff9853] bg-[rgba(217,_217,_217,_0)]">
                      <Image
                        alt="archivo"
                        src="https://file.rendit.io/n/9vwwv3BdiuKUYOlQG3Hc.svg"
                        className="w-5"
                      />
                      <div className="text-center font-sans text-xs font-light text-[#767070]">
                        Arrastre y suelte el archivo{" "}
                        <span className="font-bold">aquí </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-1 mr-px flex h-8 shrink-0 flex-col items-end justify-center rounded-lg bg-[#ff9853] pr-[180px]">
                  <div className="text-center font-sans text-xs font-bold text-white">
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
export default Page;
