"use client";
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import pose13_1 from "@public/Pose13_1.svg";
import { BellIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import image_18 from "@public/image_18.svg";
import image_17 from "@public/image_17.svg";
import image_16 from "@public/image_16.svg";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useInformation } from "@/lib/hooks/useInformation";
import { config } from "@/config";
import { LoadingComponent } from "@/components/LoadingComponent";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user_data } = useInformation();
  const [visto, setVisto] = useState(true);
  const [step, setStep] = useState(1);
  const URL_APIS = config.BACK_URL;


  const validateFirstScreen = async () => {
    const userId = user_data[0].user_id;
    // const introduccion_visto: boolean = false;
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

      if(data.status === 200){
        const lol = data?.info.introduccion_visto;
        console.log(lol)
        setVisto(lol);
        console.log(data);
      }
    }
  }

  const handleCheckPreview = async () => {
    setVisto(true)

    try {
      const userId = user_data[0].user_id;
      const response = await fetch(URL_APIS + "/student/update-view-intro/" + userId, {
        method: "PUT", // Usamos el método PUT para la actualización
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ introduccion_visto: true }), // Los datos que deseas actualizar
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextPreview = () => {
    setStep(2)
  }

  useEffect(() => {
    validateFirstScreen()
  }, [])

  if (!user_data) {
    return <div className='h-[100vh]'>
    <LoadingComponent/>
  </div>
  }

  if (!visto) {
    return (<>
      {
        step === 1 && (
          <section className="flex flex-col justify-center items-center w-full h-screen" style={{ overflow: 'hidden' }}>
            <p className="text-[64px] font-bold text-[#3D3D3D] ">Antes de continuar</p>
            <p className="text-[24px] text-[#3D3D3D] ">Necesitas conocer estos pasos</p>
            <button onClick={() => handleNextPreview()} className="w-[168px] mt-[67px] h-10 shrink-0 rounded-[10px] bg-[#ff9853]">
              <p className="text-white text-sm">Continuar</p>
            </button>
            <p onClick={() => handleCheckPreview()} className="cursor-pointer text-sm w-max mt-[16px]">Omitir</p>
            <Image
              src={pose13_1}
              alt="logo adventista"
              className=" w-[348px] h-[300px] shrink-0 absolute bottom-0 left-0"
            />
          </section>
        )
      }

      {
        step === 2 && (

          <div className="flex flex-col justify-center px-16 w-full h-screen ">
            <div className="flex flex-col ml-1 gap-6 items-start">
              <div className="flex flex-row gap-2 w-3/5 items-start">
                <Image src={image_18} alt="contrato" className="w-20 shrink-0" />
                <div className="flex flex-col gap-3 w-[363px] items-start">
                  <div className="self-stretch flex flex-col items-start">
                    <div className="text-2xl font-sans font-bold text-[#3d3d3d]">
                      1 Solicita los datos de la empresa
                    </div>
                    <div className="text-xs font-sans text-[#3d3d3d]">
                      Recuerda que necesitas los datos de la empresa como:
                    </div>
                  </div>
                  <div className="text-xs font-sans text-[#3d3d3d]">
                    • Nombre de la Empresa
                    <br />• Nombre del Generente
                  </div>
                </div>
              </div>
              <div className="self-end flex flex-row gap-3 w-3/5 items-center">
                <Image src={image_17} alt="portafolio" className="self-start w-20 shrink-0" />
                <div className="flex flex-col w-[366px] items-start">
                  <div className="text-2xl font-sans font-bold text-[#3d3d3d]">
                    2 Genera tu carta de presentación
                  </div>
                  <div className="text-xs font-sans text-[#3d3d3d] ml-px w-full">
                    Una vez que tengas los datos ve a la opción de generar carta de
                    presentación y coloca los datos correspondientes.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mr-1 items-start">
              <div className="flex flex-row gap-2 w-3/5 items-start">
                <Image src={image_16} alt="mano" className="mt-2 w-20 shrink-0" />
                <div className="flex flex-col w-[347px] items-start">
                  <div className="text-2xl font-sans font-bold text-[#3d3d3d]">
                    3 Solicita tu carta de aceptación
                  </div>
                  <div className="text-xs font-sans text-[#3d3d3d] ml-px w-full">
                    Una vez contratado, solicita al área encargada tu carta de
                    aceptación para poder subirlo a la plataforma y continuar con tu
                    proceso de PPP.
                  </div>
                </div>
              </div>
              <div className="self-end flex flex-col mt-8 gap-4 items-center">
                <div className="cursor-pointer bg-[#ff9853] self-start flex flex-col justify-center w-40 h-10 shrink-0 items-center rounded-lg">
                  <div onClick={() => handleCheckPreview()} className="text-center text-sm font-sans font-bold text-white">
                    Saber más
                  </div>
                </div>
                <div onClick={() => handleCheckPreview()} className=" cursor-pointer text-sm font-sans font-bold text-[#3d3d3d]">Omitir</div>
              </div>
            </div>
          </div>




        )
      }

    </>

    );
  }


  return (
    <div className="flex h-screen items-stretch">
      <SideBar />
      <main className="relative flex h-full w-full flex-col gap-4 overflow-y-auto p-4" style={{ backgroundColor: "#EEE" }}>
        <header className="flex items-center justify-between">
          <div className="text-[#757575]">
            <div className="text-2xl font-bold">Inicio</div>
            <div className="text-sm">
              Bienvenido,{" "}
              <span className="font-bold">
                {user_data[0].name + " " + user_data[0].surname}
              </span>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg bg-[#FF9853] px-4 py-3 text-white">
            <button className="h-5 w-5">
              <QuestionMarkCircleIcon />
            </button>
            <button className="relative h-5 w-5">
              <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-600"></div>
              <BellIcon />
            </button>
            <button className="h-5 w-5">
              <GlobeAltIcon />
            </button>
          </div>
        </header>
        <section className="">{children}</section>
      </main>
    </div>
  );
}
