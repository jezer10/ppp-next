"use client";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  IdentificationIcon,
  DocumentIcon,
  UserGroupIcon,
  EyeIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IApiResponse, IEtapa, IProcess } from "./interfaces/process";
import { intToRoman } from "@/utils/romanConverter";
import Modal from "@/components/Modal";
import InfoStudent from "./components/InfoStudent";
import { IManageDocument, IModalProps } from "./interfaces/modal";
import { IStudent } from "./interfaces/student";
import DoubleModal from "@/components/DoubleModal";
import ManageDocument from "./components/ManageDocument";
import { ProcessService } from "@/services/process.service";
import PDFIcon from "@/components/icons/PDFIcon";

function StudentStatusFlag({ status }: { status: number }) {
  return (
    <span
      className={`rounded px-2 py-0.5  text-white ${
        status === 0
          ? "bg-[#29EB77]"
          : status === 1
            ? "bg-[#FFC700]"
            : status === 2
              ? "bg-[#FC6767]"
              : "bg-[#49D3FE]"
      }`}
    >
      {status === 0
        ? "En prácticas"
        : status === 1
          ? "Pendiente"
          : status === 2
            ? "Sin Confirmar"
            : "Finalizado"}
    </span>
  );
}

export default function Students() {
  const [studentList, setStudentList] = useState<IStudent[]>([]);
  const [processList, setProcessList] = useState<IProcess[]>([]);

  const fetchProcesses = async () => {
    const response: IApiResponse<IProcess[]> =
      await ProcessService.getAllProcesses();
    console.log(response.info);
    setProcessList(response.info);
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  const studentOptionItems = [
    {
      icon: IdentificationIcon,
      name: "Info Estudiante",
      actionFunction: (idx: number) => {
        const itemFound = processList.find((x) => x.process_id === idx);
        const studentFound: IModalProps = {
          fullName: `${itemFound!.Estudiante.Persona?.name} ${itemFound!
            .Estudiante.Persona?.surname}`,
          codeStudent: itemFound!.Estudiante.code,
          cycle: itemFound!.Estudiante.Cycle?.cycle,
          school: itemFound!.Estudiante.School?.name,
          DNI: itemFound!.Estudiante.Persona?.dni,
          email: itemFound!.Estudiante.Persona?.email,
          phone: itemFound!.Estudiante.Persona?.phone,
          practicesMode: itemFound!.type,
        };
        setSelectedStudentData(studentFound);
        setModalOpen(true);
      },
    },
    // { icon: ArrowTrendingUpIcon, name: "Estado", actionFunction: () => { } },
    {
      icon: DocumentIcon,
      name: "Documentos",
      actionFunction: (idx: number) => {
        setProcessList((prevProcessList) => {
          const closedItems = prevProcessList.map((e) => ({
            ...e,
            show: false,
          }));
          const itemFound = closedItems.find((x) => x.process_id === idx);
          itemFound!.show = true;
          return closedItems;
        });
      },
    },
    {
      icon: UserGroupIcon,
      name: "Cambiar Supervisor",
      actionFunction: () => {},
    },
    // { icon: TrashIcon, name: "Eliminar", actionFunction: () => { } },
  ];

  function ProcessOptions(props: any) {
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
            {studentOptionItems.map(
              ({ name, actionFunction, icon: Icon }, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={() => actionFunction(props.itemIndex)}
                      className={`${
                        active && "bg-[#EEEEEE]"
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

  /* Paginación */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra los datos según el término de búsqueda
  const filteredData = processList.filter(
    (item) =>
      item.Estudiante.Persona.name
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase()) ||
      item.Estudiante.Persona.surname
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase()) ||
      item.Estudiante.code
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase()),
  );

  // Calcula las páginas totales
  const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);

  // Asegurarse de que currentPage no sea mayor que totalPages
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  // Filtra los datos en función de la página actual
  const startIndex = Math.max((currentPage - 1) * itemsPerPage, 0);
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  // Cambia de página
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  // Cambia de página hacia atrás
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cambia de página hacia adelante
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Restablece currentPage a 1 cuando se borra el término de búsqueda
  const handleSearchTermChange = (newSearchTerm: any) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const initModalValues: IModalProps = {
    fullName: null,
    codeStudent: null,
    school: null,
    cycle: null,
    DNI: null,
    phone: null,
    email: null,
    practicesMode: null,
  };

  const initDoubleModalValues: IManageDocument = {
    studentName: null,
    documentName: null,
    onClose: () => {},
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [doubleModalOpen, setDoubleModalOpen] = useState(false);
  const [isLoadingManageDocument, setIsLoadingManageDocument] = useState(false);

  const [selectedStudentData, setSelectedStudentData] =
    useState<IModalProps>(initModalValues);
  const [selectedDocumentData, setSelectedDocumentData] =
    useState<IManageDocument>(initDoubleModalValues);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleDoubleModalToggle = () => {
    setDoubleModalOpen(!doubleModalOpen);
  };

  const handleManageDocument = (idx: number, docId: number) => {
    const itemFound = processList.find((x) => x.process_id === idx);
    const docFound = itemFound
      ? itemFound.Etapa.find((y) => y.type_id === docId)
      : null;

    const documentFound: IManageDocument = {
      studentName: `${itemFound!.Estudiante.Persona?.name} ${itemFound!
        .Estudiante.Persona?.surname}`,
      documentName: docFound?.filename!,
    };
    setSelectedDocumentData(documentFound);
    setDoubleModalOpen(true);
  };

  return (
    <>
      <DoubleModal isOpen={doubleModalOpen} onClose={handleDoubleModalToggle}>
        <ManageDocument
          studentName={selectedDocumentData.studentName}
          documentName={selectedDocumentData.documentName}
          onClose={handleDoubleModalToggle}
          isLoading={isLoadingManageDocument}
        />
      </DoubleModal>

      <Modal isOpen={modalOpen} onClose={handleModalToggle}>
        <InfoStudent {...selectedStudentData} />
      </Modal>

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
            <button className="min-h-full rounded-lg bg-[#FF9853] px-4 text-white">
              <FunnelIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-8 items-center rounded-[0.625rem] bg-white px-4 py-3 text-left text-[0.6875rem] font-medium text-[#757575]">
              <div>Código</div>
              <div>Nombre Completo</div>
              <div>E.P.</div>
              <div>Ciclo</div>
              <div>Estado</div>
              <div>Supervisor</div>
              <div>Tiempo</div>
              <div>Opciones</div>
            </div>

            {filteredData.length === 0 ? (
              <div className="rounded-[0.625rem] bg-[#D1D1D1]">
                <div className="grid grid-cols-1 items-center rounded-[0.625rem] bg-white px-4 py-6 text-center text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                  <div>
                    No se encontraron registros que coincidan con el filtro.
                  </div>
                </div>
              </div>
            ) : (
              <>
                {currentData.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="rounded-[0.625rem] bg-[#D1D1D1]"
                  >
                    <div className="grid grid-cols-8 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                      <div>{item.Estudiante.code}</div>
                      <div>
                        {`${item.Estudiante.Persona.name} ${item.Estudiante.Persona.surname}`}
                      </div>
                      <div>{item.Estudiante.School.name}</div>
                      <div>
                        {intToRoman(Number(item.Estudiante.Cycle.cycle))}
                      </div>
                      <div>
                        <StudentStatusFlag
                          status={Number(item.Estudiante.state)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        {`${item.Supervisor.Docente.Persona.name} ${item.Supervisor.Docente.Persona.surname}`}
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" /> 4M
                      </div>
                      <div className="rounded-r-lg">
                        <ProcessOptions itemIndex={item.process_id} />
                      </div>
                    </div>
                    {item.show && (
                      <div className="flex items-center gap-4  rounded-b-lg p-4">
                        {item.Etapa.map((document: IEtapa, documentIndex) => (
                          <div
                            key={documentIndex}
                            className={`flex items-center gap-2 rounded-[0.625rem] px-4 py-3 
                              
                              ${
                                document.state === "0"
                                  ? "bg-[#FFFFFF] text-[#757575]"
                                  : document.state === "1"
                                    ? "bg-[#55E38E] text-white "
                                    : "bg-[#FE7272] text-white "
                              }
                              `}
                          >
                            <PDFIcon className=" h-6 w-6 flex-none" />
                            <div>
                              <div className="whitespace-nowrap text-[0.625rem] font-bold">
                                {document.Tipo.name}
                              </div>
                              <div className="text-[0.4375rem] font-light">
                                {document.state === "0"
                                  ? "Pendiente"
                                  : document.state === "1"
                                    ? "Validado"
                                    : "Rechazado"}
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleManageDocument(
                                  item.process_id,
                                  document.type_id,
                                )
                              }
                              className="h-6 w-6 rounded-lg p-1 hover:bg-white/20"
                            >
                              <EyeIcon />
                            </button>
                          </div>
                          // <div
                          //   key={documentIndex}
                          //   className="flex items-center gap-2 rounded-[0.625rem] bg-[#55E38E] px-4 py-3 text-white"
                          // >
                          //   <PDFIcon className=" h-6 w-6 flex-none" />
                          //   <div>
                          //     <div className="whitespace-nowrap text-[0.625rem] font-bold">
                          //       {document.Tipo.name}
                          //     </div>
                          //     <div className="text-[0.4375rem] font-light">
                          //       Validado
                          //     </div>
                          //   </div>
                          //   <button onClick={() => handleManageDocument(item.process_id, document.type_id)} className="h-6 w-6 rounded-lg p-1 hover:bg-white/20">
                          //     <EyeIcon />
                          //   </button>
                          // </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>

          {filteredData.length !== 0 && (
            <>
              <div className="flex items-center justify-between">
                <div className="text-[0.625rem] text-[#757575]">
                  {`${startIndex + 1} - ${Math.min(
                    endIndex,
                    filteredData.length,
                  )} de ${filteredData.length}`}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    className={`h-[1.5rem] w-[1.5rem] p-0.5 ${
                      currentPage === 1 ? "text-[#bababa]" : "text-[#FF9853]"
                    }`}
                    onClick={() => goToPreviousPage()}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <div className="flex items-center ">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`h-[1.5rem] w-[1.5rem] rounded-[0.3125rem] text-[0.625rem] ${
                          currentPage == index + 1
                            ? "bg-[#FF9853] text-white"
                            : "text-[#757575]"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => goToNextPage()}
                    disabled={currentPage === totalPages}
                    className={`h-[1.5rem] w-[1.5rem] p-0.5 ${
                      currentPage === totalPages
                        ? "text-[#bababa]"
                        : "text-[#FF9853]"
                    }`}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
