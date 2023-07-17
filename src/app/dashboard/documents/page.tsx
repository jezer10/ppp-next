'use client';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
import preview_document from '@public/preview_document.png';
import document_logo from '@public/document_logo.svg';
import upload_cloud from '@public/upload_cloud.svg';
import loader_icon from '@public/loader.svg';

import { Menu, Transition, Switch, Dialog } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  TrashIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  EyeSlashIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';

const documentList = [
  { id: 1, name: 'Ficha de evaluación tutor empresarial', enabled: false },
  { id: 2, name: 'Ficha de evaluación tutor academico', enabled: true },
];

export default function Documents() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    console.log(files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files] as File[]);
    e.target.value = '';
  }

  return (
    <>
      {isOpen && (
        <div className="bg-black/50 overflow-y-auto absolute inset-0 h-full z-20 flex  justify-center">
          <div className="max-w-xl w-full   rounded-lg ">
            <div className="bg-white  relative rounded-lg overflow-hidden  shadow text-[#757575]  p-8 h-auto">
              {isSaving && (
                <div className=" inset-0 absolute bg-white h-full z-40 w-full flex items-center justify-center">
                  <Image
                    src={loader_icon}
                    alt="loader"
                    className="animate-spin"
                  />
                </div>
              )}
              <button
                className="w-6 h-6 absolute right-2 top-2"
                onClick={closeModal}
              >
                <XMarkIcon />
              </button>
              <div className="flex flex-col gap-8">
                <div className="font-bold text-2xl">Subir nuevo documento</div>

                <div className="flex flex-col gap-1 text-sm">
                  <div>Nombre del documento</div>
                  <input
                    type="text"
                    placeholder="Ingrese nombre del documento"
                    className="bg-white rounded-lg focus:outline-none shadow px-4 py-2 placeholder:text-[#CECECE] placeholder:text-xs w-full"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {uploadedFiles.map((e, id) => (
                    <div key={id} className="flex gap-2 w-full items-end">
                      <button onClick={() => deleteFile(id)}>
                        <Image
                          src={document_logo}
                          alt="document logo"
                          className="h-full"
                        />
                      </button>
                      <div className="w-full">
                        <div className="font-light">{e.name}</div>
                        <div className="h-2 rounded-lg  w-full relative overflow-hidden">
                          <div className="bg-[#ECECEC] w-full h-full"></div>
                          <div
                            className="bg-[#B4B4B4] absolute h-full inset-0 rounded-lg transition-all "
                            style={{
                              width: `${progress}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="font-light text-lg leading-4">{`${progress}%`}</div>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-lg border-2 border-[#FF9853] p-8 border-dashed flex flex-col gap-2 items-center justify-center"
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => handleDragOver(e)}
                >
                  <Image src={upload_cloud} alt="upload cloud" />
                  <div className="font-light text-center">
                    Arrastre y suelte el archivo{' '}
                    <label
                      className="font-bold cursor-pointer hover:underline"
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
                <button className="text-white font-bold py-3 bg-[#FF9853] rounded-lg w-full">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {documentList.map((document, id) => (
          <div key={id} className="flex flex-col gap-1 group">
            <div className="h-40 rounded-lg relative">
              {document.enabled ? (
                <></>
              ) : (
                <>
                  <div
                    className={`h-full w-full rounded-lg bg-black/30 absolute inset-0`}
                  ></div>
                  <EyeSlashIcon className=" top-2 left-2 w-6 h-6 absolute text-white" />
                </>
              )}
              <DocumentMenu
                className="right-2 top-2 absolute"
                enabled={document.enabled}
              />
              <Image
                src={preview_document}
                alt="document preview"
                className="rounded-lg w-full h-full object-cover object-top "
              />
            </div>
            <div className="text-[#757575] text-sm w-full truncate">
              {document.name}
            </div>
          </div>
        ))}
        <div
          onClick={openModal}
          className="bg-[#E2E2E2] h-40 rounded-lg flex items-center justify-center p-6 cursor-pointer transition-colors  hover:bg-opacity-50"
        >
          <div className="h-full aspect-square rounded-full p-6 border-white text-white border-4 border-dashed">
            <PlusIcon />
          </div>
        </div>
      </div>
    </>
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
                ? 'bg-[#A6A6A6] text-[#FFFFFF]'
                : 'bg-[white] text-[#7D7A7A]'
            } shadow-lg p-0.5 rounded-full h-6 w-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
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
                    active ? 'bg-[#EEEEEE]' : ''
                  } flex items-center justify-between w-full  font-light  px-2 py-2 text-xs text-[#757575]`}
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
                    active ? 'bg-[#EEEEEE]' : ''
                  }  flex w-full items-center gap-1 font-light  px-2 py-2 text-xs text-[#757575]`}
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
                    active ? 'bg-[#EEEEEE]' : ''
                  }  flex w-full items-center gap-1 font-light  px-2 py-2 text-xs text-[#757575]`}
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
      className={`${enabled ? 'bg-[#E4752B]' : 'bg-gray-400'}
          relative inline-flex h-[0.9rem] w-[1.4rem] shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-[0.5rem]' : 'translate-x-0'}
            pointer-events-none inline-block h-[0.75rem] w-[0.75rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
