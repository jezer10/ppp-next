"use client";
import Image from "next/image";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useInformation } from "@/lib/hooks/useInformation";
import { useCallback, useEffect, useState } from "react";
import config from "@/config";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const maxSize = 1024 * 1024 * 2;
const maxFiles = 1;
const percentage = 25;
function Page() {
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
  async function getStageTypes() {
    const response = await fetch(`${config.BACK_URL}/process/stages`);
    const { data } = await response.json();
    console.log(data);
    setStageTypes(data);
  }

  useEffect(() => {
    getStageTypes();
  }, []);

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
                className="mb-px flex flex-row items-center gap-6"
              >
                <div className="h-8 w-8 flex-none rounded-full bg-[#FF9853] p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center  text-xs text-[#ff9853]">
                    {e.type_id}
                  </div>
                </div>
                <div className="font-sans text-sm font-medium text-[#ff9853]">
                  {e.name}
                </div>
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
                    • Para generar la carta de presentación necesitas tener a
                    disposición la informacion que se solicita.
                  </div>
                  <div className="font-sans text-xs text-[#757575]">
                    • Puedes generar la carta de presentación desde la opción{" "}
                    <span className="font-bold">DOCUMENTOS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-8">
              {selectedFiles.length == 0 ? (
                <div
                  {...getRootProps()}
                  className=" flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#ff9853] py-12 "
                >
                  <input {...getInputProps()} />

                  <Image
                    alt="archivo"
                    src="https://file.rendit.io/n/9vwwv3BdiuKUYOlQG3Hc.svg"
                    className="w-5"
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
                selectedFiles.map((file: any, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs font-bold"
                  >
                    <DocumentIcon className="w-8 text-red-600" />
                    <div className=" flex w-[356px] flex-col items-start gap-1">
                      <div
                        className={`w-full truncate font-sans text-[#757575] ${
                          isUploading
                            ? "text-xs font-light"
                            : "text-sm font-bold"
                        }`}
                      >
                        {file.name}
                      </div>
                      {isUploading && (
                        <div className="flex flex-col self-stretch rounded-lg bg-[#ececec]">
                          <div
                            className="h-1 shrink-0 rounded-lg bg-[#b4b4b4]"
                            style={{
                              width: `${uploadCounter}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {isUploading ? (
                      <div className="mt-1 font-sans text-xl font-light text-[#757575]">
                        {`${uploadCounter}%`}
                      </div>
                    ) : (
                      <button
                        onClick={deleteFiles}
                        className="h-8 w-8 rounded-full p-2 text-red-500 hover:bg-gray-200"
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
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
