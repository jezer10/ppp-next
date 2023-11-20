"use client"
import { LoadingComponent } from "@/components/LoadingComponent";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ClockIcon, DocumentIcon, FunnelIcon, IdentificationIcon, MagnifyingGlassIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import { IModalProps } from "../students/interfaces/modal";
import { intToRoman } from "@/utils/romanConverter";
import { IProcess } from "../students/interfaces/process";
import { ProcessService } from "@/services/process.service";
import { ISupervisor } from "./interfaces/supervisor";
import Modal from "@/components/Modal";
import { StudentAssugnet } from "./components/StudentAssigned";
import { getAllSupervisorService, getStudentsForAssignService } from "@/services/supervisor.service";

export default function Supervisors() {
  const [studentList, setStudentList] = useState<any[]>([]);
  const [superSelected, setSuperSelected] = useState<any>();
  const [supervisorList, setSupervisorList] = useState<ISupervisor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  const fetchProcesses = async () => {
    const response: IApiResponse<ISupervisor[]> = await getAllSupervisorService();
    console.log(response.info)
    setSupervisorList(response.info)
  }

  const listStudentsAssigments = async (supervisor_id : number) => {
    const response = await getStudentsForAssignService(supervisor_id)

    if (response.status === 200) {
      console.log(response.info)
      setStudentList(response.info)
      setSuperSelected(supervisor_id)
    }
  }


  useEffect(() => {
    fetchProcesses();
  }, []);

  const studentOptionItems = [
    // {
    //   icon: IdentificationIcon,
    //   name: "Info Estudiante",
    //   actionFunction: (idx: number) => {
    //     const itemFound = processList.find(x => x.process_id === idx);
    //     console.log(itemFound);
    //     const studentFound: IModalProps = {
    //       fullName: itemFound!.Estudiante.Persona?.name + " " + itemFound!.Estudiante.Persona?.surname,
    //       codeStudent: itemFound!.Estudiante.code,
    //       cycle: itemFound!.Estudiante.Cycle?.cycle,
    //       school: itemFound!.Estudiante.School?.name,
    //       DNI: itemFound!.Estudiante.Persona?.dni,
    //       email: itemFound!.Estudiante.Persona?.email,
    //       phone: itemFound!.Estudiante.Persona?.phone,
    //       practicesMode: itemFound!.type
    //     }
    //     setSelectedStudentData(studentFound)
    //     setModalOpen(true)
    //   }
    // },
    // // { icon: ArrowTrendingUpIcon, name: "Estado", actionFunction: () => { } },
    // {
    //   icon: DocumentIcon, name: "Documentos", actionFunction: (idx: number) => {
    //     setProcessList((prevProcessList) => {
    //       const closedItems = prevProcessList.map((e) => ({
    //         ...e,
    //         show: false,
    //       }));
    //       const itemFound = closedItems.find(x => x.process_id === idx);
    //       itemFound!.show = true
    //       return closedItems;
    //     });
    //   },
    // },
    {
      icon: UserGroupIcon,
      name: "Asignar Practicantes",
      actionFunction: (id : number) => { 
        listStudentsAssigments(id)
        setModalOpen(true)
      },
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
                      // onClick={() => actionFunction(props.itemIndex)}
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

  function SupervisorStatusFlag({ status }: { status: number }) {
    return (
      <span
        className={`rounded px-2 py-0.5  text-white ${status === 0
          ? "bg-[#29EB77]"
          : status > 0
            ? "bg-[#FFC700]"
            : status === 10
              ? "bg-[#FC6767]"
              : "bg-[#49D3FE]"
          }`}
      >
        {status === 0
          ? "Sin Asignar"
          : status === 1
            ? "Disponible"
            : status === 2
              ? "Asignado"
              : "Finalizado"}
      </span>
    );
  }
  
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = supervisorList.filter(item =>
    item.name.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
    item.surname.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().trim().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);

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
      console.log(page)
      setCurrentPage(page);
    };
  
    // Cambia de página hacia atrás
    const goToPreviousPage = () => {
      console.log(currentPage)
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
  return <>
  <Modal
        isOpen={modalOpen}
        onClose={handleModalToggle}
      >
        <StudentAssugnet data={studentList} supervisor={superSelected} listStudentsAssigments={listStudentsAssigments} fetchProcesses={fetchProcesses}/>

        
        </Modal>
   <div className="h-full">
        <div className="flex h-full flex-col gap-8">
          <div className="flex items-stretch justify-end gap-4">
            <div className="flex overflow-hidden rounded-lg ">
              <input
                type="text"
                // value={searchTerm}
                // onChange={(e) => handleSearchTermChange(e.target.value)}
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
            <div className="grid grid-cols-6 items-center rounded-[0.625rem] bg-white px-4 py-3 text-left text-[0.6875rem] font-medium text-[#757575]">
              <div>Código</div>
              <div>Nombre Completo</div>
              <div>E.P.</div>
              <div>Estado</div>
              <div>Practicantes Asignados</div>
              <div>Opciones</div>
            </div>

            {filteredData.length === 0 ? (
              <div className="rounded-[0.625rem] bg-[#D1D1D1]">
                <div className="grid grid-cols-1 items-center rounded-[0.625rem] text-center bg-white px-4 py-6 text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                  <div>No se encontraron registros que coincidan con el filtro.</div>
                </div>
              </div>
            ) : (
              <>
                {currentData.map((item, itemIndex) => (
                  <div key={itemIndex} className="rounded-[0.625rem] bg-[#D1D1D1]">
                    <div className="grid grid-cols-6 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                      <div>{item.code}</div>
                      <div>{item.name + " " + item.surname}</div>
                      <div>{"Ingeniería de Sistemas"}</div>
                      <div>
                        <SupervisorStatusFlag status={Number(item.students_assigned.length)} />
                      </div>
                      <div>{item.students_assigned.length}</div>
                      <div className="rounded-r-lg">
                        <ProcessOptions itemIndex={item.supervisor_id} />
                      </div>
                    </div>
                   
                  </div>
                ))}
              </>
            )}
          </div>

          {/* {filteredData.length !== 0 && (
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
          )} */}
        </div>
      </div>
  </>;
}
