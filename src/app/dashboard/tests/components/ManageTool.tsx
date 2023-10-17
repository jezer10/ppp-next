import {
    ArrowUturnLeftIcon,
    PlusIcon
} from "@heroicons/react/20/solid";
import { IDimension } from "../interfaces/dimension";
import { IApiResponse } from "../../students/interfaces/student";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ManageToolProps {
    onBack: () => void;
}

const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export default function ManageTool(props: ManageToolProps) {

    const { data: dimData = null, error } = useSWR<IApiResponse<IDimension[]>>("http://localhost:4000/dimension", fetcher);
    const [dimList, setDimList] = useState<IDimension[]>([]);
    const [selectedDims, setSelectedDims] = useState<IDimension[]>([]);
    const [selected, setSelected] = useState({ dimension_id: 0, name: "Añada una dimensión" })

    const handleAddDimension = () => {
        if (selected) {
            // Agregar a selectedDims
            setSelectedDims((prevSelectedDims) => [...prevSelectedDims, selected]);

            // Quitar de dimList
            setDimList((prevDimList) => prevDimList.filter((dim) => dim.dimension_id !== selected.dimension_id));

            setSelected({ dimension_id: 0, name: "Añada una dimensión" });
        }
    };

    const handleRemoveDimension = (dimension: IDimension) => {
        // Agregar de nuevo a dimList
        setDimList((prevDimList) => [...prevDimList, dimension]);
    
        // Quitar de selectedDims
        setSelectedDims((prevSelectedDims) => prevSelectedDims.filter((dim) => dim.dimension_id !== dimension.dimension_id));
      };
    

    useEffect(() => {
        if (dimData) setDimList(dimData?.info);
    }, [dimData]);



    return (
        <div className="h-full">
            <div className="flex h-full flex-col gap-3">
                <div className="flex justify-end">
                    <button onClick={() => props.onBack()} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                        <ArrowUturnLeftIcon className="h-4 w-4" /> Atrás
                    </button>
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-semibold text-[#7e7e7e]"> Nombre del instrumento</span>
                    <input
                        type="text"
                        // value={searchTerm}
                        // onChange={(e) => handleSearchTermChange(e.target.value)}
                        className="text-sm  border border-[#757575]/30 rounded-lg px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                    // placeholder="Buscar..."
                    />
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-semibold text-[#7e7e7e]">Dimensiones</span>

                    <div className="flex flex-row gap-5">
                        <Dropdown selected={selected} setSelected={setSelected} data={dimList} />
                        <button onClick={handleAddDimension} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                            <PlusIcon className="h-4 w-4" /> Añadir
                        </button>
                    </div>

                </div>
                <div>
                    {
                        selectedDims.length === 0 ? (
                            <div className="rounded-[0.625rem] bg-[#D1D1D1]">
                                <div className="grid grid-cols-1 items-center rounded-[0.625rem] text-center bg-white px-4 py-6 text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                                    <div>No hay dimensiones para este instrumento.</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {selectedDims.map((dim, dimIndex) => (
                                    <div key={dimIndex} className="rounded-[0.625rem] bg-[#D1D1D1]">
                                        <div className="grid grid-cols-2 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-sm font-normal text-[#717070] shadow ">
                                            <div>{dim.name}</div>
                                            <div className="flex flex-row gap-4 rounded-r-lg justify-end">
                                                <button onClick={() => console.log('asdasd')} className="min-h-full flex gap-3 items-center rounded-lg bg-[#55E38E] px-4 py-2 text-white">
                                                    <PlusIcon className="h-4 w-4" /> Añadir Items
                                                </button>
                                                <button onClick={() => handleRemoveDimension(dim)} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FE7272] px-4 py-2 text-white">
                                                    <XMarkIcon className="h-4 w-4" /> Quitar
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}