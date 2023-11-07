"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { IApiResponse } from "../students/interfaces/student";
import { ToolService } from "@/services/tool.service";
import { CreateToolBody } from "@/services/interfaces/tool";
import { ITool } from "./interfaces/tool";
import { Menu, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  IdentificationIcon,
  ArrowTrendingUpIcon,
  DocumentIcon,
  UserGroupIcon,
  TrashIcon,
  EyeIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  PlusCircleIcon
} from "@heroicons/react/20/solid";
import ManageTool from "./components/ManageTool";
import Dropdown from "./components/Dropdown";
import { config } from "@/config";
import { ConfirmAlert, SuccessAlert } from "@/components/Alert";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function Tests() {

  const { data: toolData = null, error } = useSWR<IApiResponse<ITool[]>>("http://localhost:4000/tool", fetcher, { revalidateOnMount: true, revalidateOnFocus: true });
  const [toolList, setToolList] = useState<ITool[]>([]);
  const { mutate } = useSWRConfig()
  const URL_APIS = config.BACK_URL;

  useEffect(() => {
    if (toolData) setToolList(toolData?.info);
  }, [toolData]);

  const toolOptionsItems = [
    { icon: ClipboardDocumentListIcon, name: "Detalle", actionFunction: (idx: number) => { } },
    {
      icon: PencilSquareIcon, name: "Editar", actionFunction: (idx: number) => {
        setIsEditing(true)
        setSelectedToolID(idx)
        setManageToolComponent(true)
      }
    },
    {
      icon: TrashIcon, name: "Eliminar", actionFunction: (idx: number) => {
        setIsOpenConfirm(true);
        setSelectedToolID(idx);
      }
    }
  ];

  function ToolOptions(props: any) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#EAEAEA] px-2  py-1 text-[0.625rem] text-[#757575] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Opciones
            <ChevronDownIcon className="w-[1rem]" aria-hidden="true" />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {toolOptionsItems.map(
              ({ name, actionFunction, icon: Icon }, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={() => actionFunction(props.itemIndex)}
                      className={`${active && "bg-[#EEEEEE]"
                        } flex w-full items-center gap-2 whitespace-nowrap px-2 py-1 text-[0.5rem] text-[#757575]`}
                    >
                      <Icon className="w-[0.75rem]" />
                      {name}
                    </button>
                  )}
                </Menu.Item>
              ),
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  /* Paginación y filtro */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = toolList.filter(item =>
    item.name.toLowerCase().trim().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const startIndex = Math.max((currentPage - 1) * itemsPerPage, 0);
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    console.log(currentPage)
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchTermChange = (newSearchTerm: any) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  /* Views */

  const [manageToolComponent, setManageToolComponent] = useState(false); // change this to manageToolComponent
  const [selectedToolID, setSelectedToolID] = useState<number | null>(null);

  const handleBackToMain = () => {
    revalidateData();
    setManageToolComponent(false);
  };

  const revalidateData = () => {
    mutate('http://localhost:4000/tool')
  }

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenSuccessManage, setIsOpenSuccessManage] = useState({ state: false, message: '' }); // change to isOpenSuccessManage

  const handleModalToggle = () => {
    setIsOpenConfirm(!isOpenConfirm);
  };

  const handleSuccessToggle = () => {
    setIsOpenSuccess(!isOpenSuccess);
  };

  const handleSuccessModalManage = () => {
    setIsOpenSuccessManage({ state: !isOpenSuccessManage.state, message: '' });
  };

  const handleDeleteTool = async () => {
    try {
      setIsLoading(true)
      const toolId = selectedToolID;
      const response = await fetch(URL_APIS + "/tool/" + toolId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      console.log(response)
      setSelectedToolID(null);
      setIsOpenConfirm(false);
      setIsLoading(false)
      setIsOpenSuccess(true);
      revalidateData();
    } catch (error) {
      console.log(error)
    }
  }

  const manageToolSuccess = (message: string) => {
    console.log(message)
    setIsOpenSuccessManage({ state: true, message: message })
  }

  if (manageToolComponent) {
    return (
      <ManageTool toolId={selectedToolID} onBack={handleBackToMain} manageToolSuccess={manageToolSuccess} isEditing={isEditing} />
    )
  }

  return (
    <>
      <div>
        <ConfirmAlert
          isOpen={isOpenConfirm}
          onClose={handleModalToggle}
          message={"¿Deseas eliminar este instrumento de evaluación?"}
          onCancel={() => setIsOpenConfirm(false)}
          onConfirm={() => handleDeleteTool()}
          isLoading={isLoading}
        />
      </div>
      <div>
        <SuccessAlert
          isOpen={isOpenSuccess}
          onClose={handleSuccessToggle}
          message={"Se ha eliminado el instrumento de evaluación."}
        />
      </div>
      <SuccessAlert
        isOpen={isOpenSuccessManage.state}
        onClose={handleSuccessModalManage}
        message={isOpenSuccessManage.message}
      />
      <div className="h-full">
        <div className="flex h-full flex-col gap-8">
          <div className="flex items-stretch justify-end gap-4">
            <div className="flex overflow-hidden rounded-lg ">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchTermChange(e.target.value)}
                className=" px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                placeholder="Buscar..."
              />
              <button className="h-full bg-[#FF9853] px-4 text-white ">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
            <button onClick={() => {
              setManageToolComponent(true)
              setIsEditing(false)
            }} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 text-white">
              <PlusCircleIcon className="h-4 w-4" /> Nuevo
            </button>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-2 items-center rounded-[0.625rem] bg-white px-4 py-3 text-left text-[0.6875rem] font-medium text-[#757575]">
              <div>Instrumento</div>
              <div>Opciones</div>
            </div>

            {
              filteredData.length === 0 ? (
                <div className="rounded-[0.625rem] bg-[#D1D1D1]">
                  <div className="grid grid-cols-1 items-center rounded-[0.625rem] text-center bg-white px-4 py-6 text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                    <div>No se encontraron registros que coincidan con el filtro.</div>
                  </div>
                </div>
              ) : (
                <>
                  {currentData.map((tool, toolIndex) => (
                    <div key={toolIndex} className="rounded-[0.625rem] bg-[#D1D1D1]">
                      <div className="grid grid-cols-2 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                        <div>{tool.name}</div>
                        <div className="rounded-r-lg">
                          <ToolOptions itemIndex={tool.assesment_tool_id} />
                        </div>
                      </div>

                    </div>
                  ))}
                </>
              )
            }

            {
              filteredData.length !== 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-[0.625rem] text-[#757575]"> {`${startIndex + 1} - ${Math.min(endIndex, filteredData.length)} de ${filteredData.length}`} </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}

                        className={`h-[1.5rem] w-[1.5rem] p-0.5
            ${currentPage === 1 ? 'text-[#bababa]' : 'text-[#FF9853]'}`}
                        onClick={() => goToPreviousPage()} >
                        <ChevronLeftIcon />
                      </button>
                      <div className="flex items-center ">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button key={index} className={`h-[1.5rem] w-[1.5rem] rounded-[0.3125rem] text-[0.625rem] 
                ${currentPage == index + 1 ? "bg-[#FF9853] text-white" : "text-[#757575]"
                            }`} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => goToNextPage()}
                        disabled={currentPage === totalPages}

                        className={`h-[1.5rem] w-[1.5rem] p-0.5
              
              ${currentPage === totalPages ? 'text-[#bababa]' : 'text-[#FF9853]'}`}>
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                </>
              )
            }


          </div>
        </div>
      </div>
    </>


  );
}
