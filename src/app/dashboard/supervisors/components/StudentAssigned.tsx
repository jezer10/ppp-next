"use client";
import { changeStateStudentService } from "@/services/supervisor.service";
import { Switch } from "@headlessui/react";
import { useState } from "react";

export const StudentAssugnet = ({ data, supervisor , listStudentsAssigments, fetchProcesses}: { data: any, supervisor : number , listStudentsAssigments : any, fetchProcesses : any}) => {
  const [enabled, setEnabled] = useState(false);

  const changeStatus = async (item: any) => {
    const change_state = await changeStateStudentService(item.assigned_sup ? null : supervisor, item.student_id)
    listStudentsAssigments(supervisor)
    fetchProcesses()

}
  return (
    <div className="w-[100%] flex flex-col gap-4">
      <h1 className="text-[20px] font-bold">
        ASIGNAR PRACTICANTES
      </h1>
      <div className="flex flex-col gap-2 ">
        <div className="grid grid-cols-4 items-center rounded-[0.625rem] bg-[#FF9853] px-4 py-3 text-left text-[0.6875rem] font-medium text-white">
          <div>Código</div>
          <div>Nombre Completo</div>
          <div>Correo</div>
          <div>Estado de Asignación</div>
        </div>

        {data.length === 0 ? (
          <div className="rounded-[0.625rem] bg-[#D1D1D1]">
            <div className="grid grid-cols-1 items-center rounded-[0.625rem] bg-white px-4 py-6 text-center text-[0.625rem] font-normal text-black shadow ">
              <div>
                No se encontraron registros que coincidan con el filtro.
              </div>
            </div>
          </div>
        ) : (
          <>
            {data.map((item: any, itemIndex: any) => (
              <div key={itemIndex} className="rounded-[0.625rem] bg-[#D1D1D1]">
                <div className="grid grid-cols-4 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-[0.625rem] font-normal text-black shadow ">
                  <div>{item.code}</div>
                  <div>
                    {item.name.toUpperCase() + " " + item.surname.toUpperCase()}
                  </div>
                  <div>{item.email}</div>
                  <div
                    className={`w-[100%] flex justify-center items-center`}
                  >
                    <Switch
                      checked={item.assigned_sup}
                      onChange={()=>changeStatus(item)}
                      className={`${item.assigned_sup ? "bg-[#E4752B]" : "bg-gray-400"}
          relative inline-flex h-[0.9rem] w-[1.4rem] shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                            item.assigned_sup ? "translate-x-[0.5rem]" : "translate-x-0"
                        }
            pointer-events-none inline-block h-[0.75rem] w-[0.75rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
