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
import { Fragment, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { IApiResponse, IEtapa, IStudent } from "./interfaces/student";
import { intToRoman } from "@/utils/romanConverter";
import Modal from "@/components/Modal";
import InfoStudent from "./components/InfoStudent";
import { IManageDocument, IModalProps } from "./interfaces/modal";
import DoubleModal from "@/components/DoubleModal";
import ManageDocument from "./components/ManageDocument";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
export default function Students() {
  const [studentList, setStudentList] = useState<IStudent[]>([]);
  const { data = null, error } = useSWR<IApiResponse<IStudent[]>>(
    "http://localhost:4000/student",
    fetcher,
  );

  useEffect(() => {
    if (data) setStudentList(data.info);
  }, [data]);

  const studentOptionItems = [
    {
      icon: IdentificationIcon,
      name: "Info Estudiante",
      actionFunction: (idx: number) => {
        const itemFound = studentList.find((x) => x.student_id === idx);
        console.log(itemFound);
        const studentFound: IModalProps = {
          fullName:
            itemFound!.Persona?.name + " " + itemFound!.Persona?.surname,
          codeStudent: itemFound!.code,
          cycle: itemFound!.Cycle?.cycle,
          school: itemFound!.School?.name,
          DNI: itemFound!.Persona?.dni,
          email: itemFound!.Persona?.email,
          phone: itemFound!.Persona?.phone,
          practicesMode: itemFound!.Proceso[0]?.type,
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
        setStudentList((prevStudentList) => {
          const closedItems = prevStudentList.map((e) => ({
            ...e,
            show: false,
          }));
          const itemFound = closedItems.find((x) => x.student_id === idx);
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

  function StudentOptions(props: any) {
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

  function StudentDocumentPreview() {
    return (
      <div>
        {/* <Document file={"http://infolab.stanford.edu/pub/papers/google.pdf"}>
          <Page pageNumber={1} />
        </Document> */}
      </div>
    );
  }

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

  /* Paginación */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra los datos según el término de búsqueda
  const filteredData = studentList.filter(
    (item) =>
      item.Persona.name
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase()) ||
      item.Persona.surname
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().trim().includes(searchTerm.toLowerCase()),
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
    console.log(page);
    setCurrentPage(page);
  };

  // Cambia de página hacia atrás
  const goToPreviousPage = () => {
    console.log(currentPage);
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

  const handleManageDocument = (idx: number) => {
    const itemFound = studentList.find((x) => x.student_id === idx);
    console.log(itemFound);
    const documentFound: IManageDocument = {
      studentName: itemFound!.Persona?.name + " " + itemFound!.Persona?.surname,
      documentName: itemFound!.Proceso[0]?.Etapa[0].filename,
    };
    setSelectedDocumentData(documentFound);
    setDoubleModalOpen(true);
  };

  return (
    <div className="h-full">
      <Modal isOpen={modalOpen} onClose={handleModalToggle}>
        <InfoStudent {...selectedStudentData} />
      </Modal>
      <DoubleModal isOpen={doubleModalOpen} onClose={handleDoubleModalToggle}>
        <div className="w-[70%] rounded-l-lg bg-[#404040]">
          {/* aqui pon el componente de  la previsualización */}
        </div>
        <div className="w-[30%]">
          <ManageDocument
            studentName={selectedDocumentData.studentName}
            documentName={selectedDocumentData.documentName}
            onClose={handleDoubleModalToggle}
          />
        </div>
      </DoubleModal>

      <StudentDocumentPreview />
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
              {currentData.map((student, studentIndex) => (
                <div
                  key={studentIndex}
                  className="rounded-[0.625rem] bg-[#D1D1D1]"
                >
                  <div className="grid grid-cols-8 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                    <div>{student.code}</div>
                    <div>
                      {student.Persona.name + " " + student.Persona.surname}
                    </div>
                    <div>{student.School.name}</div>
                    <div>{intToRoman(Number(student.Cycle.cycle))}</div>
                    <div>
                      <StudentStatusFlag status={Number(student.state)} />
                    </div>
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />{" "}
                      {student.Proceso[0]?.Supervisor.Docente.Persona.name +
                        " " +
                        student.Proceso[0]?.Supervisor.Docente.Persona.surname}
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" /> 4M
                    </div>
                    <div className="rounded-r-lg">
                      <StudentOptions itemIndex={student.student_id} />
                    </div>
                  </div>
                  {student.show && (
                    <div className="flex items-center gap-4  rounded-b-lg p-4">
                      {student.Proceso[0]?.Etapa.map(
                        (document: IEtapa, documentIndex) => (
                          <div
                            key={documentIndex}
                            className="flex items-center gap-2 rounded-[0.625rem] bg-[#55E38E] px-4 py-3 text-white"
                          >
                            <PDFIcon className=" h-6 w-6 flex-none" />
                            <div>
                              <div className="whitespace-nowrap text-[0.625rem] font-bold">
                                {document.Tipo.name}
                              </div>
                              <div className="text-[0.4375rem] font-light">
                                Validado
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleManageDocument(student.student_id)
                              }
                              className="h-6 w-6 rounded-lg p-1 hover:bg-white/20"
                            >
                              <EyeIcon />
                            </button>
                          </div>
                        ),
                      )}
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
                {" "}
                {`${startIndex + 1} - ${Math.min(
                  endIndex,
                  filteredData.length,
                )} de ${filteredData.length}`}{" "}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  className={`h-[1.5rem] w-[1.5rem] p-0.5
            ${currentPage === 1 ? "text-[#bababa]" : "text-[#FF9853]"}`}
                  onClick={() => goToPreviousPage()}
                >
                  <ChevronLeftIcon />
                </button>
                <div className="flex items-center ">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`h-[1.5rem] w-[1.5rem] rounded-[0.3125rem] text-[0.625rem] 
                ${
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
                  className={`h-[1.5rem] w-[1.5rem] p-0.5
              
              ${
                currentPage === totalPages ? "text-[#bababa]" : "text-[#FF9853]"
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
  );
}

function PDFIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 4.5V14C14 14.5304 13.7893 15.0391 13.4142 15.4142C13.0391 15.7893 12.5304 16 12 16H11V15H12C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V4.5H11C10.6022 4.5 10.2206 4.34196 9.93934 4.06066C9.65804 3.77936 9.5 3.39782 9.5 3V1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V11H2V2C2 1.46957 2.21071 0.960859 2.58579 0.585786C2.96086 0.210714 3.46957 0 4 0L9.5 0L14 4.5ZM1.6 11.85H0V15.849H0.791V14.507H1.594C1.881 14.507 2.125 14.45 2.326 14.334C2.529 14.217 2.684 14.059 2.789 13.86C2.89799 13.6512 2.95331 13.4185 2.95 13.183C2.95 12.933 2.897 12.707 2.792 12.506C2.68756 12.3062 2.52789 12.1406 2.332 12.029C2.132 11.909 1.889 11.85 1.6 11.85ZM2.145 13.183C2.1486 13.3148 2.1194 13.4453 2.06 13.563C2.00671 13.6654 1.92377 13.7494 1.822 13.804C1.70559 13.8616 1.57683 13.8897 1.447 13.886H0.788V12.48H1.448C1.666 12.48 1.837 12.54 1.96 12.661C2.083 12.783 2.145 12.957 2.145 13.183ZM3.362 11.85V15.849H4.822C5.223 15.849 5.556 15.769 5.82 15.612C6.08716 15.4522 6.29577 15.2106 6.415 14.923C6.545 14.623 6.611 14.261 6.611 13.839C6.611 13.419 6.546 13.061 6.415 12.764C6.29718 12.4797 6.09056 12.2412 5.826 12.084C5.562 11.928 5.227 11.85 4.821 11.85H3.362ZM4.153 12.495H4.716C4.964 12.495 5.166 12.545 5.325 12.647C5.49004 12.7549 5.61456 12.9146 5.679 13.101C5.758 13.302 5.797 13.553 5.797 13.854C5.8001 14.0534 5.77724 14.2524 5.729 14.446C5.69337 14.5986 5.62665 14.7423 5.533 14.868C5.44599 14.9801 5.33072 15.0671 5.199 15.12C5.04466 15.1777 4.88075 15.2056 4.716 15.202H4.153V12.495ZM7.896 14.258V15.849H7.106V11.85H9.654V12.503H7.896V13.62H9.502V14.258H7.896Z"
        fill="currentColor"
      />
    </svg>
  );
}
