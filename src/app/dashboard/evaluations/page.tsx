"use client";
import { ProcessService } from '@/services/process.service';
import React from 'react'
import { Fragment, useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  IdentificationIcon,
  TrashIcon,
  UserIcon,
  ClockIcon,
  DocumentIcon,
  ClipboardDocumentIcon,
  Bars3Icon,
  PencilSquareIcon,
  PlayIcon,
  PlusIcon
} from "@heroicons/react/20/solid";
import { intToRoman } from '@/utils/romanConverter';
import { IProcess } from './interfaces/process';
import { Menu, Transition } from "@headlessui/react";
import { IModalProps } from '../students/interfaces/modal';
import Modal from '@/components/Modal';
import InfoStudent from '../students/components/InfoStudent';
import { useInformation } from "@/lib/hooks/useInformation";
import { IAssesment } from './interfaces/process';
import ManageAssesment from './components/ManageAssesment';
import { ConfirmAlert, SuccessAlert } from '@/components/Alert';
import PerformAssessment from './components/PerformAssessment';
import config from "@/config";

const initModalValues: IModalProps = {
  fullName: null,
  codeStudent: null,
  school: null,
  cycle: null,
  DNI: null,
  phone: null,
  email: null,
  practicesMode: null
}

function convertToLocalDate(dateString: any) {
  // Suponiendo que el formato es 'dd/mm/yyyy hh:mm'
  const [date, time] = dateString.split(' ');
  const [day, month, year] = date.split('/');
  const [hour, minute] = time.split(':');

  // Creamos un objeto Date usando los componentes de la fecha y hora
  // Los meses en JS son 0-indexados, por eso restamos 1.
  const localDate = new Date(year, month - 1, day, hour, minute);

  return localDate;
}

function convertToStringDate(utcDate: any) {
  const date = new Date(utcDate);
  const dateString = date.toLocaleDateString('es-PE', { timeZone: 'America/Lima' });
  const timeString = date.toLocaleTimeString('es-PE', { timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit' });
  return `${dateString} ${timeString}`;
}

function EvaluationComponent() {

  const [processList, setProcessList] = useState<IProcess[]>([]);
  const [selectedStudentData, setSelectedStudentData] = useState<IModalProps>(initModalValues);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useInformation();
  const URL_APIS = config.BACK_URL;

  const [modalAssesment, setModalAssesment] = useState(false);
  const [messageAssesment, setMessageAssesment] = useState("");
  const [isOpenSuccessManage, setIsOpenSuccessManage] = useState({ state: false, message: '' }); // change to isOpenSuccessManage
  const [isOpenSuccessManage2, setIsOpenSuccessManage2] = useState({ state: false, message: '' }); // change to isOpenSuccessManage

  const handleModalAssesment = () => {
    setModalAssesment(!modalAssesment);
  };

  const _currentDate = new Date();

  const studentOptionItems = [
    {
      icon: IdentificationIcon,
      name: "Info Estudiante",
      actionFunction: (idx: number) => {
        const itemFound = processList.find(x => x.process_id === idx);
        console.log(itemFound);
        const studentFound: IModalProps = {
          fullName: itemFound!.Estudiante.Persona?.name + " " + itemFound!.Estudiante.Persona?.surname,
          codeStudent: itemFound!.Estudiante.code,
          cycle: itemFound!.Estudiante.Cycle?.cycle,
          school: itemFound!.Estudiante.School?.name,
          DNI: itemFound!.Estudiante.Persona?.dni,
          email: itemFound!.Estudiante.Persona?.email,
          phone: itemFound!.Estudiante.Persona?.phone,
          practicesMode: itemFound!.type
        }
        setSelectedStudentData(studentFound)
        setModalOpen(true)
      }
    },
    // { icon: ArrowTrendingUpIcon, name: "Estado", actionFunction: () => { } },
    {
      icon: DocumentIcon, name: "Evaluaciones", actionFunction: (idx: number) => {
        setProcessList((prevProcessList) => {
          const closedItems = prevProcessList.map((e) => ({
            ...e,
            show: false,
          }));
          const itemFound = closedItems.find(x => x.process_id === idx);
          itemFound!.show = true
          return closedItems;
        });
      },
    }
  ];


  const deleteAssesment = async (id: number | null) => {
    try {
      const res = await fetch(`${URL_APIS}/assessment/delete/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      console.log(res)
      setIsOpenConfirm(false) // cierro el modal de delete
      setIsLoading(false) // que deje de correr el loader
      setIsOpenSuccessManage3({ state: true, message: "Se ha eliminado la evaluación correctamente." })
      fetchProcesses();
    } catch (error) {
      console.error("Error al eliminar assesment:", error);
    }
  }

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

  function AssesmentOptions(props: any) {
    const processFound = processList.find(x => x.process_id === props.processId);
    const assesmentFound = processFound?.Evaluacion.find(y => y.assesment_id === props.assesmentId);

    const startDateStr = convertToStringDate(assesmentFound!.start_date);
    const endDateStr = convertToStringDate(assesmentFound!.end_date);

    // Convertimos los strings a objetos Date
    const startDate = convertToLocalDate(startDateStr);
    const endDate = convertToLocalDate(endDateStr);

    const currentDate = new Date();

    let assesmentOptionsItems = [
      {
        icon: PencilSquareIcon,
        name: "Editar",
        actionFunction: (processId: number, assesmentId: number) => {

          setIsEditing(true);
          setSelectedId(assesmentId);
          setSelectedType(Number(assesmentFound?.type));
          setManageAssesment(true);
          // Implementar la lógica de edición aquí
        },
      },
      {
        icon: TrashIcon,
        name: "Eliminar",
        actionFunction: (processId: number, assesmentId: number) => {
          // Implementar la lógica de eliminación aquí
          setSelectedId(assesmentId);
          setIsOpenConfirm(true);
        },
      },
    ];

    if (assesmentFound?.status === 1) {
      console.log('evaluacion terminada :)')
    } else if (currentDate >= startDate && currentDate < endDate) {
      console.log("¡La evaluación está habilitada! Puede comenzar.");
      // Si la evaluación está habilitada, añadir la opción "Comenzar"
      assesmentOptionsItems.push({
        icon: PlayIcon,
        name: "Comenzar",
        actionFunction: (processId: number, assesmentId: number) => {
          // Implementar la lógica de inicio aquí
          console.log('acape')
          setSelectedId(assesmentId);
          setPerformAssessment(true);
        },
      });

    } else if (currentDate < startDate) {
      console.log("La evaluación aún no está habilitada. Por favor, espere.");

    } else {
      console.log("La evaluación ha expirado. Ya no puede realizarla.");

    }

    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#EAEAEA] px-2  py-1 text-[0.625rem] text-[#757575]">
            <Bars3Icon className="w-[1rem]" />
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
            {assesmentOptionsItems.map(
              ({ name, actionFunction, icon: Icon }, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={() => actionFunction(props.processId, props.assesmentId)}
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

  /* Services */

  const fetchProcesses = async () => {
    const userId = user.user_id;
    const response = await ProcessService.getProcessAssesment(userId);
    console.log(response)
    setProcessList(response.info)

  }

  /* Paginación y filtro */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = processList.filter(item =>
    item.Estudiante.Persona.name.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
    item.Estudiante.Persona.surname.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
    item.Estudiante.code.toLowerCase().trim().includes(searchTerm.toLowerCase())
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

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleNewAssesment = (processId: number) => {
    console.log(processId);
    setIsEditing(false)
    const processFound = processList.find(x => x.process_id === processId);
    setSelectedProcess(processFound!);
    setManageAssesment(true)
    // setManageAssesment(true);
  }


  useEffect(() => {
    fetchProcesses();
  }, []);

  const [manageAssesment, setManageAssesment] = useState(false);
  const [performAssessment, setPerformAssessment] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<IProcess | null>(null);

  const handleBackToMain = () => {
    fetchProcesses();
    setManageAssesment(false);
  };

  const handleBackToMain2 = () => {
    fetchProcesses();
    setPerformAssessment(false);
  }

  const manageSuccess = (message: string) => {
    setIsOpenSuccessManage({ state: true, message: message })
  }

  const manageSuccess2 = (message: string) => {
    setIsOpenSuccessManage2({ state: true, message: message })

  }

  const handleSuccessModalManage = () => {
    setIsOpenSuccessManage({ state: !isOpenSuccessManage.state, message: '' });
  };

  const handleSuccessModalManage2 = () => {
    setIsOpenSuccessManage2({ state: !isOpenSuccessManage2.state, message: '' });
  };


  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  /* Confirm delete code */
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSuccessManage3, setIsOpenSuccessManage3] = useState({ state: false, message: '' }); // change to isOpenSuccessManage


  const handleConfirmModal = () => {
    setIsOpenConfirm(!isOpenConfirm);
  };

  const handleSuccessModalManage3 = () => {
    setIsOpenSuccessManage3({ state: !isOpenSuccessManage3.state, message: '' });
  };


  if (performAssessment) {
    return (
      <PerformAssessment onBack={handleBackToMain2} manageSuccess={manageSuccess2} assesmentId={selectedId} />
    )
  }

  if (manageAssesment) {
    return (
      <ManageAssesment typeId={selectedType} isEditing={isEditing} assesmentId={selectedId} process={selectedProcess} onBack={handleBackToMain} manageSuccess={manageSuccess} />
    )
  }

  return (
    <>

      <ConfirmAlert
        isOpen={isOpenConfirm}
        onClose={handleConfirmModal}
        message={"¿Estás seguro de que deseas eliminar esta evaluación?"}
        onCancel={() => setIsOpenConfirm(false)}
        onConfirm={() => deleteAssesment(selectedId)}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modalAssesment}
        onClose={handleModalAssesment}
      >
        {messageAssesment}
      </Modal>

      <Modal
        isOpen={modalOpen}
        onClose={handleModalToggle}
      >
        <InfoStudent {...selectedStudentData} />
      </Modal>

      <SuccessAlert
        isOpen={isOpenSuccessManage.state}
        onClose={handleSuccessModalManage}
        message={isOpenSuccessManage.message}
      />

      <SuccessAlert
        isOpen={isOpenSuccessManage2.state}
        onClose={handleSuccessModalManage2}
        message={isOpenSuccessManage2.message}
      />

      <SuccessAlert
        isOpen={isOpenSuccessManage3.state}
        onClose={handleSuccessModalManage3}
        message={isOpenSuccessManage3.message}
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
                <div className="grid grid-cols-1 items-center rounded-[0.625rem] text-center bg-white px-4 py-6 text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                  <div>No se encontraron registros que coincidan con el filtro.</div>
                </div>
              </div>
            ) : (
              <>
                {currentData.map((item, itemIndex) => (
                  <div key={itemIndex} className="rounded-[0.625rem] bg-[#D1D1D1]">
                    <div className="grid grid-cols-8 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                      <div>{item.Estudiante.code}</div>
                      <div>{item.Estudiante.Persona.name + " " + item.Estudiante.Persona.surname}</div>
                      <div>{item.Estudiante.School.name}</div>
                      <div>{intToRoman(Number(item.Estudiante.Cycle.cycle))}</div>
                      <div>
                        {/* <StudentStatusFlag status={Number(item.Estudiante.state)} /> */}
                      </div>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" /> {item.Supervisor.Docente.Persona.name + " " + item.Supervisor.Docente.Persona.surname}
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

                        {/* Evaluacion: 0 : Pendiente, 1: Finalizado */}

                        {item.Evaluacion.map((assesment: IAssesment, documentIndex) => (
                          <div key={documentIndex}
                            className={`flex items-center gap-2 rounded-[0.625rem] px-4 py-3 
                              ${assesment.status === 0 ? "bg-[#FFFFFF] text-[#757575]" : "bg-[#55E38E] text-white "} )}
                              `}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row items-center justify-between gap-2">
                                <div className="flex flex-row items-center gap-2">
                                  <ClipboardDocumentIcon className=" h-6 w-6 flex-none" />
                                  <div>
                                    <div className="whitespace-nowrap text-[0.625rem] font-bold">
                                      {Number(assesment.type) === 0 ? "Ev. Inicial" : (Number(assesment.type) === 1 ? "Ev. Intermedia" : "Ev. Final")}
                                    </div>
                                    <div className="text-[0.6rem] font-light">
                                      {
                                        assesment.status === 0 ? "Pendiente" : "Finalizado"
                                      }
                                    </div>
                                  </div>
                                </div>
                                <AssesmentOptions processId={item.process_id} assesmentId={assesment.assesment_id} />
                              </div>

                              {
                                assesment.status === 1 ? (
                                  <span className="text-xs"> Evaluación finalizada</span>
                                ) : _currentDate >= convertToLocalDate(convertToStringDate(assesment.start_date)) && _currentDate < convertToLocalDate(convertToStringDate(assesment.end_date)) ? (
                                  <span className="text-xs"> Evaluación habilitada. </span>
                                ) : _currentDate < convertToLocalDate(convertToStringDate(assesment.start_date)) ? (
                                  <span className="text-xs"> Se habilita el {convertToStringDate(assesment.start_date)} </span>
                                ) : (
                                  <span className="text-xs"> Evaluación expirada. </span>
                                )
                              }

                            </div>
                          </div>
                        ))}

                        {shouldShowAddAssessment(item.Evaluacion) && (
                          <div
                            onClick={() => handleNewAssesment(item.process_id)}
                            className="flex cursor-pointer items-center justify-center rounded-lg bg-[#E2E2E2] px-4 py-3  transition-colors  hover:bg-opacity-50"
                          >
                            <div className="aspect-square h-full rounded-full border-4 border-dashed border-white p-3 text-white">
                              <PlusIcon className="w-6 h-6" />
                            </div>
                          </div>
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
          )}
        </div>
      </div>
    </>

  )
}

function shouldShowAddAssessment(list: any) {
  if (
    list.length === 0 ||
    (list.length < 3 && list.every((assesment: any) => assesment.status === 1))
  ) {
    return true;
  } else {
    return false;
  }
}

function convertirFecha(fechaIso: string): string {
  const fechaObjeto = new Date(fechaIso);

  // Ajustar la fecha a la zona horaria local
  const fechaLocal = new Date(fechaObjeto.getTime() + fechaObjeto.getTimezoneOffset() * 60000);

  const dia = fechaLocal.getDate();
  const mes = fechaLocal.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  const año = fechaLocal.getFullYear();
  const hora = fechaLocal.getHours();
  const minuto = fechaLocal.getMinutes();
  const segundo = fechaLocal.getSeconds();

  const fechaFormateada = `${dia}-${mes}-${año} ${hora}:${minuto}:${segundo}`;

  return fechaFormateada;
}

function parseFecha(fecha: string): any {
  const fechaObjeto = new Date(fecha);
  const fechaLocal = new Date(fechaObjeto.getTime() + fechaObjeto.getTimezoneOffset() * 60000);
  return fechaLocal;
}

export default EvaluationComponent