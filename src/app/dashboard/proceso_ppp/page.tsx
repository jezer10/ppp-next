"use client";
import Image from "next/image";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useInformation } from "@/lib/hooks/useInformation";
import { useCallback, useEffect, useState } from "react";
import config from "@/config";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProcessWelcomeModal from "./components/ProcessWelcomeModal";
import ProcessTypeSelection from "./components/ProcessTypeSelection";
const maxSize = 1024 * 1024 * 5;
const maxFiles = 1;
const percentage = 25;
function Page() {
  const { user } = useInformation();
  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [stageTypes, setStageTypes] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [uploadCounter, setUploadCounter] = useState(0);
  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const deleteFiles = () => {
    setSelectedFiles([]);
  };

  useEffect(() => {
    async function getStageTypes() {
      if (user?.user_id) {
        const response = await fetch(
          `${config.BACK_URL}/process/stages/${user?.user_id}`,
        );
        const { data } = await response.json();
        setSelectedStage(data[0]);
        setStageTypes(data);
      }
    }
    getStageTypes();
  }, [user?.user_id]);

  const onDropRejected = useCallback((files: any, event: any) => {
    const [error] = files.reduce((arr: any, file: any) => {
      return [...arr, ...file.errors.map((error: any) => error.code)];
    }, []);
    if (error == "file-too-large") {
      return toast.error("El archivo excede el tamaño máximo permitido");
    }
    if (error == "file-invalid-type") {
      return toast.error("El archivo no es un formato valido");
    }
    if (error == "too-many-files") {
      return toast.error("Solo se permite un archivo");
    }
    return toast.error("Archivo invalido");
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles,
    noClick: true,
    noKeyboard: true,
    maxSize,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
  });

  const uploadFile = async () => {
    setIsUploading(true);
    const [file] = selectedFiles;
    const fileRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadCounter(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        );
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(fileRef);
        console.log(downloadURL);
        setIsUploading(false);
        toast.success("Archivo subido correctamente");
      },
    );
  };

  function fileViewOpen() {
    window.open(selectedStage?.path);
  }
  return (
    <div className="flex flex-col gap-8 rounded-lg  bg-white p-8 md:h-full md:flex-row md:divide-x">
      <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/4">
        <div className="h-20 w-20">
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: "#FF9853",
            })}
          >
            <span
              className={`font-bold  text-[#757575]`}
            >{`${percentage}%`}</span>
          </CircularProgressbarWithChildren>
        </div>
        <div className="relative">
          <div className="absolute inset-x-0 left-3.5 h-full w-1 border-l-2 border-dashed border-[#757575]"></div>

          <div className=" relative flex shrink-0 flex-col gap-4">
            {stageTypes.map((e, index) => (
              <div
                key={index}
                className="mb-px flex flex-row items-center gap-4"
              >
                <div
                  className={`${
                    e?.state ? "bg-[#FF9853]" : "bg-[#757575]"
                  }  h-8 w-8 flex-none rounded-full  p-0.5`}
                >
                  <div
                    className={`${
                      e?.state ? "text-[#ff9853]" : "text-[#757575]"
                    } flex h-full w-full items-center justify-center rounded-full bg-white text-center  text-xs `}
                  >
                    {e.type_id}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStage(e)}
                  className={`${
                    e?.state ? "text-[#FF9853]" : "text-[#757575]"
                  } rounded-xl px-4 py-2  font-sans text-sm font-medium hover:bg-gray-200 disabled:hover:bg-none`}
                  disabled={e?.type_id == selectedStage?.type_id}
                >
                  {e.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-12 md:w-3/4">
        <div className="flex w-[431px] flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="mr-6 flex flex-col items-start gap-4">
              <div className="text-center font-sans text-xl font-bold text-[#757575]">
                {selectedStage?.name}
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
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-8">
              {!selectedStage?.path ? (
                <div
                  {...getRootProps()}
                  className=" flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#ff9853] py-12 "
                >
                  <input {...getInputProps()} />

                  <Image
                    alt="archivo"
                    src="https://file.rendit.io/n/9vwwv3BdiuKUYOlQG3Hc.svg"
                    className="w-12"
                    width={0}
                    height={0}
                  />
                  <div className="text-center font-sans text-xs font-light text-[#767070]">
                    Arrastre y suelte el archivo{" "}
                    <a
                      className="cursor-pointer text-sm font-bold hover:underline"
                      onClick={open}
                    >
                      aquí
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold">
                  <DocumentIcon className="h-8 w-8 flex-none text-red-600" />
                  <div className=" flex w-[356px] flex-col items-start gap-1">
                    <div
                      className={`w-full truncate font-sans text-[#757575] ${
                        isUploading ? "text-xs font-light" : "text-sm font-bold"
                      }`}
                    >
                      {selectedStage?.filename}
                    </div>
                    {isUploading && (
                      <div className="flex flex-col self-stretch rounded-lg bg-[#ececec]">
                        <div
                          className="h-1 shrink-0 rounded-lg bg-[#b4b4b4] transition-all duration-1000"
                          style={{
                            width: `${uploadCounter}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {
                    <button
                      onClick={fileViewOpen}
                      className="h-8 w-8 flex-none rounded-full p-2 text-yellow-600 hover:bg-gray-200"
                    >
                      <EyeIcon />
                    </button>
                  }
                  {isUploading ? (
                    <div className=" font-sans text-xl font-light text-[#757575]">
                      {`${uploadCounter}%`}
                    </div>
                  ) : (
                    selectedStage?.status != 1 && (
                      <button
                        onClick={deleteFiles}
                        className="h-8 w-8 flex-none rounded-full p-2 text-red-500 hover:bg-gray-200"
                      >
                        <TrashIcon />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
            {selectedStage?.state && (
              <div>
                <span
                  className={`rounded-lg px-4 py-1 shadow ${
                    selectedStage?.state === "0"
                      ? "bg-[#FFFFFF] text-[#757575]"
                      : selectedStage?.state === "1"
                        ? "bg-[#55E38E] text-white "
                        : "bg-[#FE7272] text-white "
                  }`}
                >
                  {selectedStage?.state === "0"
                    ? "Pendiente"
                    : selectedStage?.state === "1"
                      ? "Validado"
                      : "Rechazado"}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={uploadFile}
            className="rounded-lg bg-[#ff9853] py-2 text-center font-sans text-xs font-bold text-white disabled:bg-gray-200"
            disabled={isUploading || selectedFiles.length == 0}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
export default Page;
