import { ConfirmAlert, InfoAlert } from "@/components/Alert";
import { config } from "@/config";
import { ArrowUturnLeftIcon, FolderIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface PerformAssessmentProps {
    onBack: () => void;
    manageSuccess: (message: string) => void;
    assesmentId?: number | null;
}

interface IAssesment {
    assesment_id: number | null;
    assesment_tool_id: number | null;
    created_at: string | null;
    start_date: string | null;
    end_date: string | null;
    is_virtual: boolean | null;
    proceso_id: number | null;
    status: number | null;
    type: string | null;
    Instrumento: ITool;
}
interface ITool {
    assesment_tool_id: number | null;
    name: string | null;
    type: number | null;
    Instrumento_Dimension: IToolDimension[];
}
interface IToolDimension {
    tool_dimension_id: number | null;
    assesment_tool_id: number | null;
    dimension_id: number | null;
    Dimension: IDimension;
    Item: IItem[];
}
interface IDimension {
    dimension_id: number | null;
    name: string | null;
}
interface IItem {
    item_id: number | null;
    name: string | null;
    tool_dimension_id: number | null;
}
interface ILevelAssessment {
    level_id?: number;
    level: number; // El número del 1 al 5
    assesment_id: number;
    item_id: number;
}
export default function PerformAssessment({ onBack, manageSuccess, assesmentId }: PerformAssessmentProps) {
    const URL_APIS = config.BACK_URL;
    const [assesment, setAssesment] = useState<IAssesment | null>(null);
    const [levels, setLevels] = useState<ILevelAssessment[]>([]);

    const fetchAssesmentDataById = async (id: number) => {
        try {
            const response = await fetch(`${URL_APIS}/assessment/perform/${id}`);
            const data = await response.json();
            console.log(data.info)
            setAssesment(data.info)
            console.log(data.info)
        } catch (error) {
            console.error("Error en la solicitud de datos del instrumento:", error);
        }
    };

    const handleLevelChange = (item_id: number, level: number) => {
        // Buscar si ya existe un nivel para este ítem
        const existingLevelIndex = levels.findIndex(l => l.item_id === item_id);
        if (existingLevelIndex >= 0) {
            // Si existe, actualizar el nivel
            const updatedLevels = [...levels];
            updatedLevels[existingLevelIndex].level = level;
            setLevels(updatedLevels);
        } else {
            // Si no existe, añadir un nuevo nivel
            setLevels(prevLevels => [...prevLevels, {
                assesment_id: assesment!.assesment_id!, // Asegúrate de que assesment y assesment_id estén definidos
                item_id: item_id,
                level: level
            }]);
        }
    };

    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [messageInfo, setMessageInfo] = useState("");

    const openModalConfirmation = () => {
        const isToolValidated = validateAssessment();
        if (isToolValidated) {
            console.log('validado, todos los items se han calificado :)')
            setIsOpenConfirm(true);
        } else {
            setMessageInfo("Termine de calificar el instrumento.")
            setIsOpenInfo(true)
        }
    };

    const validateAssessment = () => {
        for (const dimension of assesment?.Instrumento.Instrumento_Dimension || []) {
            for (const item of dimension.Item) {
                const levelForItem = levels.find(level => level.item_id === item.item_id);
                if (!levelForItem) {
                    // Si no se encuentra un nivel para el ítem, la validación falla
                    return false;
                }
            }
        }
        // Si todos los ítems tienen un nivel, la validación pasa
        return true;
    }

    const handleConfirmModal = () => {
        setIsOpenConfirm(!isOpenConfirm);
    };

    const handleInfoModal = () => {
        setIsOpenInfo(!isOpenInfo);
    };


    const saveAssesment = async () => {
        setIsLoading(true)
        await fetch(URL_APIS + "/level/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(levels)
        })
        setIsOpenConfirm(false)
        setIsLoading(false);
        manageSuccess('Se ha finalizado la evaluación.');
        onBack();
    }

    useEffect(() => {
        if (assesmentId != null) {
            fetchAssesmentDataById(assesmentId)
        }
    }, [assesmentId]);

    useEffect(() => {
        console.log(levels)
    }, [levels])


    return (
        <>

            <ConfirmAlert
                isOpen={isOpenConfirm}
                onClose={handleConfirmModal}
                message={"¿Estás seguro de que deseas guardar esta evaluación?"}
                onCancel={() => setIsOpenConfirm(false)}
                onConfirm={() => saveAssesment()}
                isLoading={isLoading}
            />

            <InfoAlert
                isOpen={isOpenInfo}
                onClose={handleInfoModal}
                message={messageInfo}
            />

            <div className="h-full p-5">
                <div className="flex h-full flex-col gap-x-3 gap-y-5 mb-5">
                    <div className="flex justify-end">
                        <button onClick={() => onBack()} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                            <ArrowUturnLeftIcon className="h-4 w-4" /> Atrás
                        </button>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <span className="text-lg font-semibold text-[#7e7e7e]"> Evaluación de Prácticas Pre Profesionales </span>

                        <span className="text-md font-semibold text-[#7e7e7e]"> Tipo de evaluación:
                            {
                                assesment?.Instrumento.type === 0 ? ' Entrada ' : (assesment?.Instrumento.type === 1 ? ' Intermedio' : ' Final')
                            }
                        </span>
                        <span className="text-md font-normal text-[#7e7e7e]">
                            Este instrumento permitirá evaluar en el estudiante el logro de sus competencias de sus prácticas preprofesionales.
                        </span>
                    </div>
                    {
                        assesment?.Instrumento.Instrumento_Dimension.map((toolDimension: IToolDimension, toolDimensionIndex: number) => (
                            <div className="flex flex-col w-full gap-y-4">

                                <div className="grid grid-cols-1 items-center rounded-[0.625rem] text-center bg-white px-4 py-6 text-md font-normal text-[#707070] shadow ">
                                    Dimensión: {toolDimension.Dimension.name}
                                </div>

                                {
                                    toolDimension.Item.map((item: IItem, itemIndex: number) => (
                                        <div className="w-full grid grid-cols-2 gap-5 rounded-[0.625rem] text-center bg-white p-4 text-sm font-normal text-[#606060] shadow ">
                                            <div className="col-span-1">
                                                {item.name}
                                            </div>
                                            <div className="col-span-1 flex flex-row gap-5 flex-wrap">
                                                <div className="flex items-center gap-2">
                                                    <label>Carece</label>
                                                    <input className="w-4 h-4" type="radio" name={`group-${toolDimensionIndex}-${itemIndex}`} onChange={() => handleLevelChange(item.item_id!, 1)}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label>Mínimo</label>
                                                    <input className="w-4 h-4" type="radio" name={`group-${toolDimensionIndex}-${itemIndex}`} onChange={() => handleLevelChange(item.item_id!, 2)}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label>Aceptable</label>
                                                    <input className="w-4 h-4" type="radio" name={`group-${toolDimensionIndex}-${itemIndex}`} onChange={() => handleLevelChange(item.item_id!, 3)}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label>Satisfactorio</label>
                                                    <input className="w-4 h-4" type="radio" name={`group-${toolDimensionIndex}-${itemIndex}`} onChange={() => handleLevelChange(item.item_id!, 4)}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label>Sobresaliente</label>
                                                    <input className="w-4 h-4" type="radio" name={`group-${toolDimensionIndex}-${itemIndex}`} onChange={() => handleLevelChange(item.item_id!, 5)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }



                            </div>


                        ))
                    }
                    <div className="flex w-full justify-center">
                        <button onClick={openModalConfirmation} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
                            <FolderIcon className="h-4 w-4" /> Guardar Evaluación
                        </button>
                    </div>
                </div>
            </div >
        </>
    )

}