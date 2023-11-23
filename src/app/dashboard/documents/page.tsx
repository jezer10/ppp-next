"use client";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
import document_logo from "@public/document_logo.svg";
import upload_cloud from "@public/upload_cloud.svg";
import loader_icon from "@public/loader.svg";
import { storage } from "@/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";

import { Menu, Transition, Switch } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  TrashIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  EyeSlashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

const documentList = [
  { id: 1, name: "Ficha de evaluación tutor empresarial", enabled: false },
  { id: 2, name: "Ficha de evaluación tutor academico", enabled: true },
];

export default function Documents() {
  const { register, handleSubmit, watch } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);

  const [xd, setDocumentList] = useState([] as any[]);

  useEffect(() => {
    getDocumentsList();
  }, []);

  const getDocumentsList = async () => {
    const response = await fetch("http://localhost:4000/documents");
    const data = await response.json();
    setDocumentList(data.info);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 1;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files) as File[];
    setUploadedFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...files] as File[];
      return newFiles;
    });
  }

  function onSubmit(data: any) {
    const { documentName } = data;
    console.log(documentName);

    if (!documentName) {
      return;
    }

    handleUpload(documentName);
  }

  function handleUpload(documentName: string) {
    if (!storage) {
      return;
    }

    uploadedFiles.forEach((file) => {
      setUploadingCount((prev) => prev + 1);
      const fileRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          setProgress(progress);
        },
        (error) => {
          setUploadingCount((prev) => prev - 1);
        },
        async () => {
          setUploadingCount((prev) => prev - 1);

          setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
          const downloadURL = await getDownloadURL(fileRef);

          const response = await fetch("http://localhost:4000/documents", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: documentName,
              file_route: downloadURL,
            }),
          });
          const data = await response.json();
        },
      );
    });
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  function deleteFile(id: number) {
    setUploadedFiles((prevFiles) => {
      const newData = [...prevFiles];
      newData.splice(id, 1);
      return newData;
    });
  }
  function addFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []) as File[];
    setUploadedFiles((prevFiles) => [...prevFiles, ...files] as File[]);
    e.target.value = "";
  }

  return (
    <>
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="absolute inset-0 z-20 flex h-full justify-center overflow-y-auto  bg-black/50">
            <div className="w-full max-w-xl   rounded-lg ">
              <div className="relative  h-auto overflow-hidden rounded-lg  bg-white p-8  text-[#757575] shadow">
                {isSaving && (
                  <div className=" absolute inset-0 z-40 flex h-full w-full items-center justify-center bg-white">
                    <Image
                      src={loader_icon}
                      alt="loader"
                      className="animate-spin"
                    />
                  </div>
                )}
                <button
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={closeModal}
                >
                  <XMarkIcon />
                </button>
                <div className="flex flex-col gap-8">
                  <div className="text-2xl font-bold">
                    Subir nuevo documento
                  </div>

                  <div className="flex flex-col gap-1 text-sm">
                    <div>Nombre del documento</div>
                    <input
                      type="text"
                      placeholder="Ingrese nombre del documento"
                      {...register("documentName", { required: true })}
                      className="w-full rounded-lg bg-white px-4 py-2 shadow placeholder:text-xs placeholder:text-[#CECECE] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    {uploadedFiles.map((e, id) => (
                      <div key={id} className="flex w-full items-end gap-2">
                        <button onClick={() => deleteFile(id)}>
                          <Image
                            src={document_logo}
                            alt="document logo"
                            className="h-full"
                          />
                        </button>
                        <div className="w-full">
                          <div className="font-light">{e.name}</div>
                          <div className="relative h-2  w-full overflow-hidden rounded-lg">
                            <div className="h-full w-full bg-[#ECECEC]"></div>
                            <div
                              className="absolute inset-0 h-full rounded-lg bg-[#B4B4B4] transition-all "
                              style={{
                                width: `${progress}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-lg font-light leading-4">{`${progress}%`}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#FF9853] p-8"
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={(e) => handleDragOver(e)}
                  >
                    <Image src={upload_cloud} alt="upload cloud" />
                    <div className="text-center font-light">
                      Arrastre y suelte el archivo{" "}
                      <label
                        className="cursor-pointer font-bold hover:underline"
                        htmlFor="file_input"
                      >
                        aquí
                      </label>
                      <input
                        type="file"
                        className="hidden"
                        id="file_input"
                        onChange={addFile}
                      />
                    </div>
                  </div>
                  <button
                    className={`w-full rounded-lg py-3 font-bold text-white ${
                      uploadingCount > 0
                        ? "cursor-not-allowed opacity-50"
                        : "bg-[#FF9853]"
                    }`}
                    disabled={uploadingCount > 0}
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className="grid md:grid-cols-3 gap-4">
        {xd!.map((document, id) => (
          <div key={id} className="group flex flex-col gap-1">
            <div className="relative h-40 md:h-56 rounded-lg">
              {!document.enabled ? (
                <></>
              ) : (
                <>
                  <div
                    className={`absolute inset-0 h-full w-full rounded-lg bg-black/30`}
                  ></div>
                  <EyeSlashIcon className=" absolute left-2 top-2 h-6 w-6 text-white" />
                </>
              )}
              <DocumentMenu
                className="absolute right-2 top-2"
                enabled={document.enabled}
              />

              {/* Añade el iframe aquí para la previsualización con Google Drive */}
              <DocumentPreview fileRoute={document.file_route} />
            </div>
            <div className="w-full truncate text-sm text-[#757575]">
              {document.name}
            </div>
          </div>
        ))}
        <div
          onClick={openModal}
          className="flex h-56 cursor-pointer items-center justify-center rounded-lg bg-[#E2E2E2] p-6 transition-colors  hover:bg-opacity-50"
        >
          <div className="aspect-square h-full rounded-full border-4 border-dashed border-white p-6 text-white">
            <PlusIcon />
          </div>
        </div>
      </div>
    </>
  );
}

function DocumentPreview({ fileRoute }: { fileRoute: string }) {
  const encodedURL = encodeURIComponent(fileRoute);
  const googleDocsViewerLink = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodedURL}`;

  return (
    <iframe src={googleDocsViewerLink} width="100%" height="100%"></iframe>
  );
}

function DocumentMenu({
  className,
  enabled,
}: {
  className: any;
  enabled: boolean;
}) {
  return (
    <div className={className}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`${
              enabled
                ? "bg-[#A6A6A6] text-[#FFFFFF]"
                : "bg-[white] text-[#7D7A7A]"
            } h-6 w-6 rounded-full p-0.5 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <EllipsisHorizontalIcon aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-36  origin-top-right overflow-hidden  rounded-md bg-white shadow-lg focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? "bg-[#EEEEEE]" : ""
                  } flex w-full items-center justify-between  px-2  py-2 text-xs font-light text-[#757575]`}
                >
                  <div className="flex items-center gap-1">
                    <EyeSlashIcon className=" h-4 w-4" />
                    Ocultar
                  </div>
                  <Toggle />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#EEEEEE]" : ""
                  }  flex w-full items-center gap-1 px-2  py-2 text-xs font-light text-[#757575]`}
                >
                  <PencilIcon className=" h-4 w-4" />
                  Editar
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#EEEEEE]" : ""
                  }  flex w-full items-center gap-1 px-2  py-2 text-xs font-light text-[#757575]`}
                >
                  <TrashIcon className=" h-4 w-4" />
                  Eliminar
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-[#E4752B]" : "bg-gray-400"}
          relative inline-flex h-[0.9rem] w-[1.4rem] shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-[0.5rem]" : "translate-x-0"}
            pointer-events-none inline-block h-[0.75rem] w-[0.75rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
