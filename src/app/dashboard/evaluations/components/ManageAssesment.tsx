import {
    ArrowUturnLeftIcon,
    FolderIcon
} from "@heroicons/react/20/solid";
import { config } from "@/config";
import { useEffect, useState } from "react";
import { IProcess } from "../interfaces/process";
import Dropdown from "../../tests/components/Dropdown";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ConfirmAlert, InfoAlert } from "@/components/Alert";

interface ManageAssessmentProps {
    onBack: () => void;
    process?: IProcess | null;
    manageSuccess: (message: string) => void;
    /* only in editing */
    isEditing: boolean;
    assesmentId?: number | null;
    typeId?: number | null;
}

interface ITool {
    assesment_tool_id: number;
    name: string;
}

interface IAssessmentSchema {
    proceso_id?: number;
    assesment_tool_id?: number | null;
    start_date?: string | null;
    end_date?: string | null;
    is_virtual?: boolean;
    type?: number;
}

const TIPO_INICIAL = 0;
const TIPO_INTERMEDIO = 1;
const TIPO_FINAL = 2;
const ESTADO_TERMINADO = 1;

const initSchema: IAssessmentSchema = {
    is_virtual: false,
    assesment_tool_id: null,
    start_date: null,
    end_date: null,
}

function convertToStringDate(utcDate: any) {
    const date = new Date(utcDate);
    const dateString = date.toLocaleDateString('es-PE', { timeZone: 'America/Lima' });
    const timeString = date.toLocaleTimeString('es-PE', { timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit' });
    return `${dateString} ${timeString}`;
}

function convertToDateTimeLocalFormat(dateString: any) {
    // Divide la fecha y la hora
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('/');
    const timePart = parts[1];

    // Reordena las partes para formar una cadena con formato YYYY-MM-DDTHH:mm
    const formattedString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;

    return formattedString;
}

export default function ManageAssesment({ onBack, process, manageSuccess, isEditing, assesmentId, typeId }: ManageAssessmentProps) {
    const URL_APIS = config.BACK_URL;
    const [selected, setSelected] = useState({ assesment_tool_id: 0, name: "Eliga un instrumento" })
    const [toolList, setToolList] = useState<ITool[]>([]);
    const [assessmentSchema, setAssessmentSchema] = useState<IAssessmentSchema | null>(initSchema);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [messageInfo, setMessageInfo] = useState("");


    const fetchToolsByType = async (type: number) => {
        try {
            const response = await fetch(`${URL_APIS}/tool/type/${type}`);
            const data = await response.json();
            console.log(data)
            setToolList(data.info)
        } catch (error) {
            console.error("Error en la solicitud de datos del instrumento:", error);
        }
    }

    const determineTypeTool = (process: IProcess) => {
        let hasInitial = false;
        let hasIntermediate = false;
        let hasFinal = false;

        for (const evaluacion of process.Evaluacion) {
            if (evaluacion.status === ESTADO_TERMINADO) {
                if (Number(evaluacion.type) === TIPO_INICIAL) {
                    hasInitial = true;
                } else if (Number(evaluacion.type) === TIPO_INTERMEDIO) {
                    hasIntermediate = true;
                } else if (Number(evaluacion.type) === TIPO_FINAL) {
                    hasFinal = true;
                }
            }
        }

        let nextType = 0;

        if (!hasInitial) {
            console.log('crear evaluacion inicial')
            nextType = 0;
        } else if (hasInitial && !hasIntermediate) {
            console.log('crear evaluacion intermedia')
            nextType = 1;
        } else if (hasInitial && hasIntermediate && !hasFinal) {
            console.log('crear evaluacion final')
            nextType = 2;
        } else {
            console.log('get out of here')
            onBack();
        }

        setAssessmentSchema((prevAssessmentSchema) => ({
            ...prevAssessmentSchema,
            type: nextType,
            proceso_id: process.process_id
        }));

        fetchToolsByType(nextType);
    }

    const openModalConfirmation = () => {
        const isToolValidated = validateTool();
        if (isToolValidated) {
            setIsOpenConfirm(true);
        }

    };

    const validateTool = () => {
        console.log(assessmentSchema)
        if (assessmentSchema?.assesment_tool_id === null) {
            setMessageInfo("Seleccione un instrumento.")
            setIsOpenInfo(true)
            return false;
        }

        if (assessmentSchema?.start_date === null || assessmentSchema?.end_date === null) {
            setMessageInfo("Defina las fechas de la evaluación.")
            setIsOpenInfo(true)
            return false;
        }

        return true;
    };

    const saveAssesment = async () => {
        setIsLoading(true);
        // console.log(assesmentSchema);

        await fetch(URL_APIS + "/assessment/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assessmentSchema)
        })

        setIsOpenConfirm(false)
        setIsLoading(false);
        manageSuccess('Se ha creado la evaluación.');
        onBack();

    }

    const handleConfirmModal = () => {
        setIsOpenConfirm(!isOpenConfirm);
    };
    const handleInfoModal = () => {
        setIsOpenInfo(!isOpenInfo);
    };

    const [isLoadingPage, setIsLoadingPage] = useState(false);

    const fetchAssesmentDataById = async (id: number) => {
        try {
            const response = await fetch(`${URL_APIS}/assessment/${id}`);
            const data = await response.json();
            console.log(data)
            loadDataInSchema(data.info)
        } catch (error) {
            console.error("Error en la solicitud de datos de la evaluacion:", error);
        }
    };

    const loadDataInSchema = async (data: any) => {
        console.log(data)
        console.log(data.assesment_tool_id)

        const formattedStartDate = convertToDateTimeLocalFormat(convertToStringDate(data.start_date))
        const formattedEndDate = convertToDateTimeLocalFormat(convertToStringDate(data.end_date))
        setAssessmentSchema((prevAssesmentSchema) => ({
            ...prevAssesmentSchema,
            is_virtual: data.is_virtual,
            start_date: formattedStartDate,
            end_date: formattedEndDate
        }));

        // Encuentra el ítem en toolList que coincide con el assesment_tool_id de data
        const defaultSelectedItem = toolList.find(item => item.assesment_tool_id === data.assesment_tool_id);
        console.log(toolList)
        console.log(defaultSelectedItem)
        // Si se encuentra un ítem, actualiza el estado 'selected' con ese ítem
        if (defaultSelectedItem) {
            setSelected(defaultSelectedItem);
            setAssessmentSchema(prevSchema => ({
                ...prevSchema,
                assesment_tool_id: defaultSelectedItem.assesment_tool_id,
            }));
        }

        setIsLoadingPage(false)

    }


    useEffect(() => {
        console.log(selected)
    }, [selected]);


    useEffect(() => {
        console.log(process)
        if (process && !isEditing) {
            determineTypeTool(process)
        }
    }, [process, isEditing]);

    useEffect(() => {
        if (typeId != null && assesmentId != null && isEditing) {
            setIsLoadingPage(true)
            fetchToolsByType(typeId)
        }

    }, [typeId, assesmentId, isEditing]);

    useEffect(() => {
        if (toolList.length > 0 && isEditing && assesmentId != null) {
            fetchAssesmentDataById(assesmentId)
        }

    }, [toolList, isEditing, assesmentId]);


    return (

        <>
            <ConfirmAlert
                isOpen={isOpenConfirm}
                onClose={handleConfirmModal}
                message={"¿Estás seguro de crear esta nueva evaluación?"}
                onCancel={() => setIsOpenConfirm(false)}
                onConfirm={() => saveAssesment()}
                isLoading={isLoading}
            />

            <InfoAlert
                isOpen={isOpenInfo}
                onClose={handleInfoModal}
                message={messageInfo}
            />


            {
                isLoadingPage ?
                    <>
                        <div className="h-[calc(100vh-105px)] flex flex-col justify-center items-center w-full bg-black bg-opacity-5 ">
                            <div role="status">
                                <svg aria-hidden="true" className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#FF9853]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </> :
                    <>

                        <div className="h-full">
                            <div className="flex h-full flex-col gap-x-3 gap-y-5 mb-5">

                                <div className="flex justify-end">
                                    <button onClick={() => onBack()} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                                        <ArrowUturnLeftIcon className="h-4 w-4" /> Atrás
                                    </button>
                                </div>

                                <div className="flex flex-row gap-5 w-full">
                                    <div className="flex flex-col w-full gap-9">
                                        <div className="flex flex-row gap-3">

                                            <div className="flex flex-col w-full">
                                                <span className="text-sm font-semibold text-[#7e7e7e]">Instrumento de evaluación</span>
                                                <div className="flex flex-row gap-1">
                                                    <Dropdown selected={selected}
                                                        setSelected={(item: ITool) => {
                                                            setSelected(item);
                                                            setAssessmentSchema({
                                                                ...assessmentSchema,
                                                                assesment_tool_id: item.assesment_tool_id,
                                                            });
                                                        }} data={toolList} />
                                                    <button className="h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                                                        <EyeIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer"
                                                    checked={assessmentSchema?.is_virtual || false}
                                                    onChange={(e) =>
                                                        setAssessmentSchema({
                                                            ...assessmentSchema,
                                                            is_virtual: e.target.checked,
                                                        })
                                                    } />
                                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ms-3 text-sm font-semibold text-[#7e7e7e]">Crear sala zoom</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full gap-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-[#7e7e7e]">Fecha inicio</span>
                                            <input className="text-sm  border border-[#757575]/30 rounded-lg px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                                                type="datetime-local"
                                                value={assessmentSchema?.start_date || ''}
                                                onChange={(e) =>
                                                    setAssessmentSchema({
                                                        ...assessmentSchema,
                                                        start_date: e.target.value,
                                                    })
                                                } />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-[#7e7e7e]">Fecha fin</span>
                                            <input className="text-sm  border border-[#757575]/30 rounded-lg px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                                                type="datetime-local"
                                                value={assessmentSchema?.end_date || ''}
                                                onChange={(e) =>
                                                    setAssessmentSchema({
                                                        ...assessmentSchema,
                                                        end_date: e.target.value,
                                                    })
                                                } />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <button onClick={openModalConfirmation} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                                        <FolderIcon className="h-4 w-4" /> Guardar Evaluación
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>

            }


        </>

    )
}