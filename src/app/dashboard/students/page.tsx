'use client';

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
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Student {
  id: number;
  code: number;
  fullName: string;
  cycle: string;
  show: boolean;
  documents: {
    name: string;
    status: number;
  }[];
}
export default async function Students() {
  const studentMock: Student[] = await (
    await fetch('/api/students', {
      method: 'GET',
    })
  ).json();
  const [studentList, setStudentList] = useState(studentMock);

  const studentOptionItems = [
    {
      icon: IdentificationIcon,
      name: 'Info Estudiante',
      actionFunction: (idx: number) => {
        setStudentList((prevStudentList) => {
          const closedItems = prevStudentList.map((e) => ({
            ...e,
            show: false,
          }));
          closedItems[idx]['show'] = true;
          return closedItems;
        });
      },
    },
    { icon: ArrowTrendingUpIcon, name: 'Estado', actionFunction: () => {} },
    { icon: DocumentIcon, name: 'Documentos', actionFunction: () => {} },
    {
      icon: UserGroupIcon,
      name: 'Cambiar Supervisor',
      actionFunction: () => {},
    },
    { icon: TrashIcon, name: 'Eliminar', actionFunction: () => {} },
  ];

  function StudentOptions(props: any) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className=" flex items-center gap-2 text-[#757575] bg-[#EAEAEA] w-full justify-center rounded-md  px-2 py-1 text-[0.625rem]    focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Opciones
            <ChevronDownIcon className="  w-[0.5625rem] " aria-hidden="true" />
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
          <Menu.Items className="absolute right-0 mt-2 z-10 w-32 overflow-hidden origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {studentOptionItems.map(
              ({ name, actionFunction, icon: Icon }, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={() => actionFunction(props.itemIndex)}
                      className={`${
                        active && 'bg-[#EEEEEE]'
                      } flex w-full items-center gap-2 text-[0.5rem] py-1 px-2 whitespace-nowrap text-[#757575]`}
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

  return (
    <div className="h-full flex flex-col gap-8">
      <div className="flex justify-end gap-4 items-stretch">
        <div className="flex rounded-lg overflow-hidden ">
          <input
            type="text"
            className=" px-4 py-2 placeholder:text-[#C4C4C4] placeholder:text-sm placeholder:font-light focus:outline-none"
            placeholder="Buscar..."
          />
          <button className="text-white h-full px-4 bg-[#FF9853] ">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
        <button className="min-h-full px-4 bg-[#FF9853] rounded-lg text-white">
          <FunnelIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto flex flex-col gap-4">
        <div className="bg-white px-4 py-3 text-left text-[0.6875rem] text-[#757575] font-medium rounded-[0.625rem] grid grid-cols-8">
          <div>Código</div>
          <div>Nombre Completo</div>
          <div>E.P.</div>
          <div>Ciclo</div>
          <div>Estado</div>
          <div>Supervisor</div>
          <div>Tiempo</div>
          <div>Opciones</div>
        </div>

        {studentList.map((student, studentIndex) => (
          <div key={studentIndex} className="rounded-[0.625rem] bg-[#D1D1D1]">
            <div className="bg-white shadow-red-700 shadow px-4 py-6 text-left text-[0.625rem] rounded-[0.625rem] text-[#C4C4C4] font-normal grid grid-cols-8 items-center">
              <div>{student.code}</div>
              <div>{student.fullName}</div>
              <div>E.P.</div>
              <div>{student.cycle}</div>
              <div>Estado</div>
              <div>Supervisor</div>
              <div>Tiempo</div>
              <div className="rounded-r-lg">
                <StudentOptions itemIndex={studentIndex} />
              </div>
            </div>
            {student.show && (
              <div className="flex p-4 gap-4  items-center rounded-b-lg">
                {student.documents.map((document, documentIndex) => (
                  <div
                    key={documentIndex}
                    className="rounded-[0.625rem] px-4 py-3 text-white bg-[#55E38E] flex items-center gap-2"
                  >
                    <PDFIcon className=" flex-none w-6 h-6" />
                    <div>
                      <div className="font-bold text-[0.625rem] whitespace-nowrap">
                        {document.name}
                      </div>
                      <div className="font-light text-[0.4375rem]">
                        Validado
                      </div>
                    </div>
                    <button className="w-6 h-6 p-1 rounded-lg hover:bg-white/20">
                      <EyeIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-[#757575] text-[0.625rem]">1 - 4 de 54</div>
        <div className="flex gap-2 items-center">
          <button className="w-[1.5rem] h-[1.5rem] p-0.5 text-[#FF9853]">
            <ChevronLeftIcon />
          </button>
          <div className="flex items-center ">
            {[1, 2, 3].map((e, ind) => (
              <button
                key={ind}
                className={`w-[1.5rem] h-[1.5rem] rounded-[0.3125rem]   text-[0.625rem] ${
                  ind == 0 ? 'bg-[#FF9853] text-white' : 'text-[#757575]'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <button className="w-[1.5rem] h-[1.5rem] p-0.5 text-[#FF9853]">
            <ChevronRightIcon />
          </button>
        </div>
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
