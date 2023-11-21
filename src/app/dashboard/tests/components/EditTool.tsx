import {
    ArrowUturnLeftIcon,
    PlusIcon
} from "@heroicons/react/20/solid";
import { CreateTool, Dimension, IDimension, Item } from "../interfaces/dimension";
import { IApiResponse } from "../../students/interfaces/student";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { XMarkIcon, FolderIcon } from "@heroicons/react/24/solid";
import { config } from "@/config";
import { ConfirmAlert, InfoAlert, SuccessAlert } from "@/components/Alert";

interface EditToolProps {
    toolId: number;
    onBack: () => void;
    editToolSuccess: () => void;
}

const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export default function EditTool(props: EditToolProps) {
    const URL_APIS = config.BACK_URL;
    const { data: dimData = null, error } = useSWR<IApiResponse<IDimension[]>>("http://localhost:4000/dimension", fetcher);
    const [dimList, setDimList] = useState<IDimension[]>([]);
    const [toolSchema, setToolSchema] = useState<CreateTool>({ name: "", dimensions: [] });
    const [selected, setSelected] = useState({ dimension_id: 0, name: "Añada una dimensión" })
    const [itemInputs, setItemInputs] = useState(Array(toolSchema.dimensions?.length).fill(""));
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageInfo, setMessageInfo] = useState("")

    const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLevel = Number(event.target.value);
        setToolSchema((prevToolSchema) => ({
            ...prevToolSchema,
            type: newLevel
        }));
    };

    const handleNameChange = (e: any) => {
        const newName = e.target.value;
        setToolSchema((prevToolSchema) => ({
            ...prevToolSchema,
            name: newName,
        }));
    };

    const handleAddDimension = () => {
        if (selected && selected.dimension_id != 0) {
            const newDimension: Dimension = {
                dimension_id: selected.dimension_id,
                name: selected.name,
                items: [], // Puedes inicializar los items como un arreglo vacío o según tus necesidades
            };

            // Agregar la nueva dimensión a toolSchema
            setToolSchema((prevToolSchema: CreateTool) => ({
                ...prevToolSchema,
                dimensions: prevToolSchema.dimensions
                    ? [...prevToolSchema.dimensions, newDimension]
                    : [newDimension], // Si prevToolSchema.dimensions es null o undefined, crea un nuevo arreglo con newDimension
            }));


            // Quitar de dimList
            setDimList((prevDimList) => prevDimList.filter((dim) => dim.dimension_id !== selected.dimension_id));

            setSelected({ dimension_id: 0, name: "Añada una dimensión" });
        }
    };

    const handleRemoveDimension = (dimension: any) => {
        // Agregar de nuevo a dimList
        setDimList((prevDimList) => [...prevDimList, { dimension_id: dimension.dimension_id, name: dimension.name }]);

        // Quitar de selectedDims
        setToolSchema((prevToolSchema: CreateTool) => {
            if (prevToolSchema.dimensions) {
                return {
                    ...prevToolSchema,
                    dimensions: prevToolSchema.dimensions.filter((dim) => dim.dimension_id !== dimension.dimension_id),
                };
            }
            return prevToolSchema; // Si dimensions es null o undefined, no hacemos cambios en toolSchema
        });
    };

    const handleAddItem = (dimension: Dimension, dimIndex: number) => {
        // Crea un nuevo item usando el valor del input específico de esta dimensión
        const newItem: Item = {
            name: itemInputs[dimIndex] || "", // Usar el estado específico de esta dimensión
        };

        // Encuentra la dimensión correspondiente en toolSchema y agrega el nuevo item
        setToolSchema((prevToolSchema: CreateTool) => ({
            ...prevToolSchema,
            dimensions: prevToolSchema.dimensions?.map((dim, index) => {
                if (dim.dimension_id === dimension.dimension_id && index === dimIndex) {
                    return {
                        ...dim,
                        items: dim.items ? [...dim.items, newItem] : [newItem],
                    };
                }
                return dim;
            }),
        }));

        // Limpia el input después de agregar el item específico de esta dimensión
        setItemInputs({
            ...itemInputs,
            [dimIndex]: "", // Limpiar el input específico de esta dimensión
        });
    };

    const handleRemoveItem = (dimension: Dimension, item: Item) => {
        // Encuentra la dimensión correspondiente en toolSchema y quita el item
        setToolSchema((prevToolSchema: CreateTool) => ({
            ...prevToolSchema,
            dimensions: prevToolSchema.dimensions?.map((dim) => {
                if (dim.dimension_id === dimension.dimension_id) {
                    return {
                        ...dim,
                        items: dim.items?.filter((itm) => itm !== item),
                    };
                }
                return dim;
            }),
        }));
    };

    const validateTool = () => {

        if (toolSchema.name == null || toolSchema.name.trim() == "") {
            console.log('ponle un nombre a tu instrumento')
            return false;
        }

        if (toolSchema.type == null) {
            console.log('selecciona el tipo de instrumento')
            return false;
        }

        if (toolSchema.dimensions?.length === 0) {
            setMessageInfo("Ingrese al menos una dimensión.")
            setIsOpenInfo(true)
            return false;
        }

        if (toolSchema.dimensions!.length > 0) {
            // Verificar que todas las dimensiones tengan longitud mayor a 0
            for (const dimension of toolSchema.dimensions!) {
                if (dimension.items?.length === 0) {
                    setMessageInfo("Ingrese al menos un item para la dimensión: " + dimension.name);
                    setIsOpenInfo(true)
                    return false;
                }
            }
        }

        return true;
    }

    const openModalConfirmation = () => {
        const isToolValidated = validateTool();
        if (isToolValidated) {
            setIsOpenConfirm(true);
        }

    }

    const saveTool = async () => {
        setIsLoading(true)
        const response = await fetch(URL_APIS + "/tool/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toolSchema)
        })
        console.log(response)
        setIsOpenConfirm(false)
        setIsLoading(false);
        // setIsOpenSuccess(true);
        // props.createToolSuccess();
        props.onBack();
    }

    const handleInfoModal = () => {
        setIsOpenInfo(!isOpenInfo);
    };

    const handleConfirmModal = () => {
        setIsOpenConfirm(!isOpenConfirm);
    };

    const handleSuccessModal = () => {
        setIsOpenSuccess(!isOpenSuccess);
    };

    const loadToolData = async () => {
        
    }

    useEffect(() => {
        if (dimData) setDimList(dimData?.info);
    }, [dimData]);

    useEffect(() => {
        loadToolData();
    }, []);

    return (
        <>
            <ConfirmAlert
                isOpen={isOpenConfirm}
                onClose={handleConfirmModal}
                message={"¿Estás seguro de que deseas crear este instrumento de evaluación?"}
                onCancel={() => setIsOpenConfirm(false)}
                onConfirm={() => saveTool()}
                isLoading={isLoading}
            />
            <SuccessAlert
                isOpen={isOpenSuccess}
                onClose={handleSuccessModal}
                message={"Se ha creado el instrumento de evaluación."}
            />

            <InfoAlert
                isOpen={isOpenInfo}
                onClose={handleInfoModal}
                message={messageInfo}
            />
            <div className="h-full">

                <div className="flex h-full flex-col gap-x-3 gap-y-5 mb-5">
                    <div className="flex justify-end">
                        <button onClick={() => props.onBack()} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                            <ArrowUturnLeftIcon className="h-4 w-4" /> Atrás
                        </button>
                    </div>
                    <div className="flex flex-col w-full">
                        <span className="text-sm font-semibold text-[#7e7e7e]"> Nombre del instrumento</span>
                        <input
                            type="text"
                            value={toolSchema.name ?? ""}
                            onChange={handleNameChange}
                            className="text-sm  border border-[#757575]/30 rounded-lg px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-3 w-full" >
                        <span className="text-sm font-semibold text-[#7e7e7e]"> Tipo de instrumento</span>
                        <div className="flex gap-x-5 w-full">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="inicio"
                                    name="nivel"
                                    value="0"
                                    onChange={handleRadioButtonChange}
                                    className="mr-2 form-radio h-4 w-4 text-indigo-600"
                                />
                                <label htmlFor="inicio" className="text-sm font-semibold text-[#7e7e7e]">Entrada</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="intermedio"
                                    name="nivel"
                                    value="1"
                                    onChange={handleRadioButtonChange}
                                    className="mr-2 form-radio h-4 w-4 text-indigo-600"
                                />
                                <label htmlFor="intermedio" className="text-sm font-semibold text-[#7e7e7e]">Intermedio</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="final"
                                    name="nivel"
                                    value="2"
                                    onChange={handleRadioButtonChange}
                                    className="mr-2 form-radio h-4 w-4 text-indigo-600"
                                />
                                <label htmlFor="final" className="text-sm font-semibold text-[#7e7e7e]">Final</label>
                            </div>
                        </div>
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
                            toolSchema.dimensions?.length === 0 ? (
                                <div className="rounded-[0.625rem] bg-[#D1D1D1]">
                                    <div className="grid grid-cols-1 items-center rounded-[0.625rem] text-center bg-white px-4 py-6 text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                                        <div>No hay dimensiones para este instrumento.</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {toolSchema.dimensions?.map((dim, dimIndex) => (
                                        <>
                                            <div key={dimIndex} className="rounded-[0.625rem] bg-[#D1D1D1]">
                                                <div className="grid grid-cols-3 gap-4 items-center rounded-[0.625rem] bg-white px-4 py-6 text-left text-sm font-normal text-[#717070] shadow ">
                                                    <div className="col-span-1" >{dim.name}</div>
                                                    <div className="col-span-2 flex flex-col-reverse md:flex-row gap-4 rounded-r-lg items-end md:justify-end">

                                                        <div className="flex flex-row gap-4 w-full">
                                                            <input
                                                                value={itemInputs[dimIndex] || ""} // Usar el estado específico de esta dimensión
                                                                onChange={(e) => {
                                                                    setItemInputs({
                                                                        ...itemInputs,
                                                                        [dimIndex]: e.target.value, // Actualizar el estado específico de esta dimensión
                                                                    });
                                                                }}
                                                                className="w-full text-sm border border-[#757575]/30 rounded-lg px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                                                                placeholder="Escribe un item..."
                                                            />
                                                            <button onClick={() => handleAddItem(dim, dimIndex)} className="min-h-full flex gap-3 items-center rounded-lg bg-[#55E38E] px-4 py-2 text-white">
                                                                <PlusIcon className="h-4 w-4" /> Añadir
                                                            </button>
                                                        </div>
                                                        <button onClick={() => handleRemoveDimension(dim)} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FE7272] px-4 py-2 text-white">
                                                            <XMarkIcon className="h-4 w-4" /> Quitar
                                                        </button>
                                                    </div>

                                                    {
                                                        dim.items?.length === 0 ? (
                                                            <div className="col-span-3">
                                                                <div className="grid grid-cols-1 items-center rounded-[0.625rem]  text-center bg-slate-100 px-4 py-6 text-[0.625rem] font-normal text-[#afafaf] shadow ">
                                                                    <div>No hay items para esta dimension.</div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {
                                                                    dim.items?.map((itm, itmIndex) => (
                                                                        <div className="col-span-3">
                                                                            <div className="grid grid-cols-3 items-center rounded-[0.625rem]  text-center bg-slate-100 px-4 py-6 text-sm font-normal text-[#717070] shadow ">
                                                                                <div className="col-span-2" >{itm.name}</div>
                                                                                <div className="col-span-1 flex flex-row gap-4 rounded-r-lg justify-end">
                                                                                    <button onClick={() => handleRemoveItem(dim, itm)} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FE7272] px-4 py-2 text-white">
                                                                                        <XMarkIcon className="h-4 w-4" /> Quitar
                                                                                    </button>
                                                                                </div>                                                            </div>

                                                                        </div>
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>

                                            </div>
                                        </>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                    <div className="flex w-full justify-center">
                        <button onClick={openModalConfirmation} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                            <FolderIcon className="h-4 w-4" /> Guardar Instrumento
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}