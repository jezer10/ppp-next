"use client";
import { ProcessService } from '@/services/process.service';
import React from 'react'
import { useEffect, useState } from "react";

function EvaluationComponent() {

  const [assesmentList, setAssesmentList] =  useState<any>([]);

  /* Services */

  const fetchProcesses = async () => {
    const response = await ProcessService.getAllProcesses();
    console.log(response)
  }

  /* Paginación y filtro */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = assesmentList.filter((item:any) =>
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


  useEffect(() => {
    fetchProcesses();
  }, []);

  return (
    <>
      {/* <div className="h-full">
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
      </div> */}
    </>
  )
}

export default EvaluationComponent