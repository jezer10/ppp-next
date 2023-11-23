import { useEffect, useState } from "react";
import Image from "next/image";
import pose13_1 from "@public/Pose13_1.svg";
import image_18 from "@public/image_18.svg";
import image_17 from "@public/image_17.svg";
import image_16 from "@public/image_16.svg";
import config from "@/config";
import {
  getStudentPreviewState,
  updateStudentPreviewState,
} from "@/services/student.service";
const URL_APIS = config.BACK_URL;

interface ISplashScreen {
  userId: number;
}
export default function SplashScreenModal({ userId }: ISplashScreen) {
  const [step, setStep] = useState(1);
  const [viewed, setViewed] = useState(true);
  const handleCheckPreview = async () => {
    await updateStudentPreviewState(userId);
    setViewed(true);
  };

  useEffect(() => {
    async function getPreviewState() {
      if (userId) {
        const {
          data: { introduccion_visto },
        } = await getStudentPreviewState(userId);
        setViewed(introduccion_visto);
      }
    }
    getPreviewState();
  }, [userId]);
  return (
    <>
      {step === 1 && (
        <section className="flex h-screen w-full flex-col items-center justify-center">
          <p className="text-7xl font-bold text-[#3D3D3D] ">
            Antes de continuar
          </p>
          <p className="text-2xl text-[#3D3D3D] ">
            Necesitas conocer estos pasos
          </p>
          <button
            onClick={() => {
              setStep(2);
            }}
            className="mt-[67px] h-10 w-[168px] shrink-0 rounded-[10px] bg-[#ff9853]"
          >
            <p className="text-sm text-white">Continuar</p>
          </button>
          <p
            onClick={() => handleCheckPreview()}
            className="mt-[16px] w-max cursor-pointer text-sm"
          >
            Omitir
          </p>
          <Image
            src={pose13_1}
            alt="logo adventista"
            className=" absolute bottom-0 left-0 h-[300px] w-[348px] shrink-0"
          />
        </section>
      )}

      {step === 2 && (
        <div className="flex h-screen w-full flex-col justify-center px-16 ">
          <div className="ml-1 flex flex-col items-start gap-6">
            <div className="flex w-3/5 flex-row items-start gap-2">
              <Image src={image_18} alt="contrato" className="w-20 shrink-0" />
              <div className="flex w-[363px] flex-col items-start gap-3">
                <div className="flex flex-col items-start self-stretch">
                  <div className="font-sans text-2xl font-bold text-[#3d3d3d]">
                    1 Solicita los datos de la empresa
                  </div>
                  <div className="font-sans text-xs text-[#3d3d3d]">
                    Recuerda que necesitas los datos de la empresa como:
                  </div>
                </div>
                <div className="font-sans text-xs text-[#3d3d3d]">
                  • Nombre de la Empresa
                  <br />• Nombre del Generente
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
                  de presentación y coloca los datos correspondientes.
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
              <div className="flex h-10 w-40 shrink-0 cursor-pointer flex-col items-center justify-center self-start rounded-lg bg-[#ff9853]">
                <div
                  onClick={() => handleCheckPreview()}
                  className="text-center font-sans text-sm font-bold text-white"
                >
                  Saber más
                </div>
              </div>
              <div
                onClick={() => handleCheckPreview()}
                className=" cursor-pointer font-sans text-sm font-bold text-[#3d3d3d]"
              >
                Omitir
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
