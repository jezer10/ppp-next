import { ArrowUturnLeftIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
<<<<<<< HEAD
  CreateTool,
  Dimension,
  IDimension,
  Item,
} from "../interfaces/dimension";
import { IApiResponse } from "../../students/interfaces/student";
=======
    ArrowUturnLeftIcon,
    PlusIcon
} from "@heroicons/react/20/solid";
import { CreateTool, Dimension, IDimension, Item } from "../interfaces/dimension";
>>>>>>> master
import useSWR from "swr";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { XMarkIcon, FolderIcon } from "@heroicons/react/24/solid";
<<<<<<< HEAD
import config from "@/config";
import { ConfirmAlert, InfoAlert, SuccessAlert } from "@/components/Alert";
=======
import { config } from "@/config";
import { ConfirmAlert, InfoAlert } from "@/components/Alert";
>>>>>>> master
import { IToolResponse } from "../interfaces/ToolResponse";
import useLoadingStore from '../../../../store/isLoadingStore';

interface ManageToolProps {
  onBack: () => void;
  manageToolSuccess: (message: string) => void;
  isEditing: boolean;
  toolId?: number | null;
}

<<<<<<< HEAD
const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function ManageTool({
  onBack,
  manageToolSuccess,
  isEditing,
  toolId,
}: ManageToolProps) {
  const URL_APIS = config.BACK_URL;
  const { data: dimData = null } = useSWR<IApiResponse<IDimension[]>>(
    "http://localhost:4000/dimension",
    fetcher,
  );
  const [dimList, setDimList] = useState<IDimension[]>([]);
  const [toolSchema, setToolSchema] = useState<CreateTool>({
    name: "",
    dimensions: [],
  });
  const [selected, setSelected] = useState({
    dimension_id: 0,
    name: "Añada una dimensión",
  });
  const [itemInputs, setItemInputs] = useState(
    Array(toolSchema.dimensions?.length).fill(""),
  );
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");

  /* Tool  */

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newLevel = Number(event.target.value);
    setToolSchema((prevToolSchema) => ({
      ...prevToolSchema,
      type: newLevel,
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
=======
export default function ManageTool({ onBack, manageToolSuccess, isEditing, toolId }: ManageToolProps) {
    const URL_APIS = config.BACK_URL;
    const [dimList, setDimList] = useState<IDimension[]>([]);
    const [toolSchema, setToolSchema] = useState<CreateTool>({ name: "", dimensions: [] });
    const [selected, setSelected] = useState({ dimension_id: 0, name: "Añada una dimensión" })
    const [itemInputs, setItemInputs] = useState(Array(toolSchema.dimensions?.length).fill(""));
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageInfo, setMessageInfo] = useState("");
    const [fetchCount, setFetchCount] = useState(0);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    /* Tool  */

    const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLevel = Number(event.target.value);
        setToolSchema((prevToolSchema) => ({
            ...prevToolSchema,
            type: newLevel
        }));
    };
>>>>>>> master

      // Agregar la nueva dimensión a toolSchema
      setToolSchema((prevToolSchema: CreateTool) => ({
        ...prevToolSchema,
        dimensions: prevToolSchema.dimensions
          ? [...prevToolSchema.dimensions, newDimension]
          : [newDimension], // Si prevToolSchema.dimensions es null o undefined, crea un nuevo arreglo con newDimension
      }));

      // Quitar de dimList
      setDimList((prevDimList) =>
        prevDimList.filter((dim) => dim.dimension_id !== selected.dimension_id),
      );

      setSelected({ dimension_id: 0, name: "Añada una dimensión" });
    }
  };

  const handleRemoveDimension = (dimension: any) => {
    // Agregar de nuevo a dimList
    setDimList((prevDimList) => [
      ...prevDimList,
      { dimension_id: dimension.dimension_id, name: dimension.name },
    ]);

    // Quitar de selectedDims
    setToolSchema((prevToolSchema: CreateTool) => {
      if (prevToolSchema.dimensions) {
        return {
          ...prevToolSchema,
          dimensions: prevToolSchema.dimensions.filter(
            (dim) => dim.dimension_id !== dimension.dimension_id,
          ),
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
      console.log("ponle un nombre a tu instrumento");
      return false;
    }

<<<<<<< HEAD
    if (toolSchema.type == null) {
      console.log("selecciona el tipo de instrumento");
      return false;
    }

    if (!toolSchema.dimensions?.length) {
      setMessageInfo("Ingrese al menos una dimensión.");
      setIsOpenInfo(true);
      return false;
=======
    const saveTool = async () => {
        setIsLoading(true)
        console.log(toolSchema)
        if (isEditing) {
            const response = await fetch(URL_APIS + "/tool/" + toolId, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(toolSchema)
            })

            setIsOpenConfirm(false)
            setIsLoading(false);
            manageToolSuccess('Se ha editado el instrumento de evaluación.');


        } else {
            const response = await fetch(URL_APIS + "/tool/create", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(toolSchema)
            })

            setIsOpenConfirm(false)
            setIsLoading(false);
            manageToolSuccess('Se ha creado el instrumento de evaluación.');

        }
        onBack();
    }

    const fetchDimensions = async () => {
        try {
            const response = await fetch(`${URL_APIS}/dimension`);
            const data = await response.json();
            setDimList(data.info)

        } catch (error) {
            console.error("Error en la solicitud de datos del instrumento:", error);
        }
>>>>>>> master
    }

    if (toolSchema.dimensions!.length > 0) {
      for (const dimension of toolSchema.dimensions!) {
        if (dimension.items?.length === 0) {
          setMessageInfo(
            "Ingrese al menos un item para la dimensión: " + dimension.name,
          );
          setIsOpenInfo(true);
          return false;
        }
<<<<<<< HEAD
      }
    }

    return true;
  };

  const saveTool = async () => {
    setIsLoading(true);
    const response = await fetch(URL_APIS + "/tool/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toolSchema),
    });
    console.log(response);
    setIsOpenConfirm(false);
    setIsLoading(false);
    // setIsOpenSuccess(true);
    manageToolSuccess("Se ha creado el instrumento de evaluación.");
    onBack();
  };
=======
    };

    const loadToolDataInSchema = async (data: IToolResponse) => {
        console.log(data)
        setToolSchema((prevToolSchema) => ({
            ...prevToolSchema,
            assesment_tool_id: toolId,
            name: data.name,
            type: data.type,
            dimensions: data.Instrumento_Dimension.map((dimResponse) => ({
                dimension_id: dimResponse.Dimension.dimension_id,
                name: dimResponse.Dimension.name,
                items: dimResponse.Item.map((itemResponse) => ({
                    name: itemResponse.name,
                })),
            })),
            toolDimensions: data.Instrumento_Dimension.map((inDresponse) => ({
                tool_dimension_id: inDresponse.tool_dimension_id,
                assesment_tool_id: inDresponse.assesment_tool_id,
                dimension_id: inDresponse.dimension_id,
            })),
        }));

        // Obtén una lista de los `dimension_id` de las dimensiones ya cargadas en `toolSchema`
        const loadedDimensionIds = new Set(
            data.Instrumento_Dimension?.map((dim) => dim.Dimension.dimension_id) || []
        );

        const response = await fetch(`${URL_APIS}/dimension`);
        const re = await response.json();

        console.log(loadedDimensionIds)
        console.log(dimList)
        // Filtra `dimList` para eliminar las dimensiones que ya han sido cargadas
        const updatedDimList = re.info.filter(
            (dim: any) => !loadedDimensionIds.has(dim.dimension_id)
        );
        console.log(updatedDimList);

        // Actualiza `dimList` con la lista filtrada
        setDimList(updatedDimList);

    }

    /* Modals */
>>>>>>> master

  const fetchDimensions = async () => {
    try {
      const response = await fetch(`${URL_APIS}/dimension`);
      const data = await response.json();
      setDimList(data.info);
    } catch (error) {
      console.error("Error en la solicitud de datos del instrumento:", error);
    }
  };

  /* Only In Editing */

  const fetchToolDataById = async (toolId: number) => {
    try {
      const response = await fetch(`${URL_APIS}/tool/${toolId}`);
      const data = await response.json();
      loadToolDataInSchema(data.info);
    } catch (error) {
      console.error("Error en la solicitud de datos del instrumento:", error);
    }
  };

  const loadToolDataInSchema = async (data: IToolResponse) => {
    console.log(data);
    setToolSchema((prevToolSchema) => ({
      ...prevToolSchema,
      name: data.name,
      type: data.type,
      dimensions: data.Instrumento_Dimension.map((dimResponse) => ({
        dimension_id: dimResponse.Dimension.dimension_id,
        name: dimResponse.Dimension.name,
        items: dimResponse.Item.map((itemResponse) => ({
          name: itemResponse.name,
        })),
      })),
    }));

<<<<<<< HEAD
    // Obtén una lista de los `dimension_id` de las dimensiones ya cargadas en `toolSchema`
    const loadedDimensionIds = new Set(
      data.Instrumento_Dimension?.map((dim) => dim.Dimension.dimension_id) ||
        [],
=======
    const handleFetchStart = () => {
        setFetchCount((prevCount) => prevCount + 1);
        setIsLoadingPage(true); // Establecer isLoadingPage en true cuando comienza un fetch.
    };

    const handleFetchEnd = () => {
        setFetchCount((prevCount) => prevCount - 1);
        if (fetchCount === 0) {
            // Si el contador llega a 1, significa que todos los fetch se han completado.
            setIsLoadingPage(false); // Establecer isLoadingPage en false cuando todos los fetch se han completado.
        }
    };

    useEffect(() => {
        fetchDimensions();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          const fetchPromises = [];
          // Iniciar un fetch y agregarlo a fetchPromises
          handleFetchStart();
          fetchPromises.push(fetchDimensions());
    
          if (toolId && isEditing) {
            // Iniciar otro fetch y agregarlo a fetchPromises
            handleFetchStart();
            fetchPromises.push(fetchToolDataById(toolId));
          }
    
          // Esperar a que todos los fetch se completen antes de finalizar isLoadingPage
          try {
            await Promise.all(fetchPromises);
          } catch (error) {
            console.error("Error al cargar los datos:", error);
          } finally {
            handleFetchEnd();
          }
        };
    
        fetchData();
      }, [toolId, isEditing]);
    

    return (
        <>
            <ConfirmAlert
                isOpen={isOpenConfirm}
                onClose={handleConfirmModal}
                message={isEditing ? "¿Estás seguro de que deseas editar este instrumento de evaluación?" : "¿Estás seguro de que deseas crear este instrumento de evaluación?"}
                onCancel={() => setIsOpenConfirm(false)}
                onConfirm={() => saveTool()}
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
                    </>

                    :
                    <>
                        <div className="h-full">

                            <div className="flex h-full flex-col gap-x-3 gap-y-5 mb-5">
                                <div className="flex justify-end">
                                    <button onClick={() => onBack()} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FF9853] px-4 py-2 text-white">
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
                                                checked={toolSchema.type === 0}
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
                                                checked={toolSchema.type === 1}
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
                                                checked={toolSchema.type === 2}
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
                                                        <div key={dim.dimension_id} className="rounded-[0.625rem] bg-[#D1D1D1]">
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
                                                                                    <div key={itmIndex} className="col-span-3">
                                                                                        <div className="grid grid-cols-3 items-center rounded-[0.625rem]  text-center bg-slate-100 px-4 py-6 text-sm font-normal text-[#717070] shadow ">
                                                                                            <div className="col-span-2" >{itm.name}</div>
                                                                                            <div className="col-span-1 flex flex-row gap-4 rounded-r-lg justify-end">
                                                                                                <button onClick={() => handleRemoveItem(dim, itm)} className="min-h-full flex gap-3 items-center rounded-lg bg-[#FE7272] px-4 py-2 text-white">
                                                                                                    <XMarkIcon className="h-4 w-4" /> Quitar
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
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

            }


        </>
>>>>>>> master
    );

    const response = await fetch(`${URL_APIS}/dimension`);
    const re = await response.json();

    console.log(loadedDimensionIds);
    console.log(dimList);
    // Filtra `dimList` para eliminar las dimensiones que ya han sido cargadas
    const updatedDimList = re.info.filter(
      (dim: any) => !loadedDimensionIds.has(dim.dimension_id),
    );
    console.log(updatedDimList);

    // Actualiza `dimList` con la lista filtrada
    setDimList(updatedDimList);
  };

  /* Modals */

  const openModalConfirmation = () => {
    const isToolValidated = validateTool();
    if (isToolValidated) {
      setIsOpenConfirm(true);
    }
  };

  const handleInfoModal = () => {
    setIsOpenInfo(!isOpenInfo);
  };

  const handleConfirmModal = () => {
    setIsOpenConfirm(!isOpenConfirm);
  };

  const handleSuccessModal = () => {
    setIsOpenSuccess(!isOpenSuccess);
  };

  useEffect(() => {
    fetchDimensions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDimensions();
      if (toolId && isEditing) {
        fetchToolDataById(toolId);
      }
    };

    fetchData();
  }, [toolId, isEditing]);

  return (
    <>
      <ConfirmAlert
        isOpen={isOpenConfirm}
        onClose={handleConfirmModal}
        message={
          "¿Estás seguro de que deseas crear este instrumento de evaluación?"
        }
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
        <div className="mb-5 flex h-full flex-col gap-x-3 gap-y-5">
          <div className="flex justify-end">
            <button
              onClick={() => onBack()}
              className="flex min-h-full items-center gap-3 rounded-lg bg-[#FF9853] px-4 py-2 text-white"
            >
              <ArrowUturnLeftIcon className="h-4 w-4" /> Atrás
            </button>
          </div>
          <div className="flex w-full flex-col">
            <span className="text-sm font-semibold text-[#7e7e7e]">
              {" "}
              Nombre del instrumento
            </span>
            <input
              type="text"
              value={toolSchema.name ?? ""}
              onChange={handleNameChange}
              className="rounded-lg  border border-[#757575]/30 px-4 py-2 text-sm placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="text-sm font-semibold text-[#7e7e7e]">
              {" "}
              Tipo de instrumento
            </span>
            <div className="flex w-full gap-x-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="inicio"
                  name="nivel"
                  value="0"
                  checked={toolSchema.type === 0}
                  onChange={handleRadioButtonChange}
                  className="form-radio mr-2 h-4 w-4 text-indigo-600"
                />
                <label
                  htmlFor="inicio"
                  className="text-sm font-semibold text-[#7e7e7e]"
                >
                  Entrada
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="intermedio"
                  name="nivel"
                  value="1"
                  checked={toolSchema.type === 1}
                  onChange={handleRadioButtonChange}
                  className="form-radio mr-2 h-4 w-4 text-indigo-600"
                />
                <label
                  htmlFor="intermedio"
                  className="text-sm font-semibold text-[#7e7e7e]"
                >
                  Intermedio
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="final"
                  name="nivel"
                  value="2"
                  checked={toolSchema.type === 2}
                  onChange={handleRadioButtonChange}
                  className="form-radio mr-2 h-4 w-4 text-indigo-600"
                />
                <label
                  htmlFor="final"
                  className="text-sm font-semibold text-[#7e7e7e]"
                >
                  Final
                </label>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <span className="text-sm font-semibold text-[#7e7e7e]">
              Dimensiones
            </span>

            <div className="flex flex-row gap-5">
              <Dropdown
                selected={selected}
                setSelected={setSelected}
                data={dimList}
              />
              <button
                onClick={handleAddDimension}
                className="flex min-h-full items-center gap-3 rounded-lg bg-[#FF9853] px-4 py-2 text-white"
              >
                <PlusIcon className="h-4 w-4" /> Añadir
              </button>
            </div>
          </div>
          <div>
            {toolSchema.dimensions?.length === 0 ? (
              <div className="rounded-[0.625rem] bg-[#D1D1D1]">
                <div className="grid grid-cols-1 items-center rounded-[0.625rem] bg-white px-4 py-6 text-center text-[0.625rem] font-normal text-[#C4C4C4] shadow ">
                  <div>No hay dimensiones para este instrumento.</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {toolSchema.dimensions?.map((dim, dimIndex) => (
                  <>
                    <div
                      key={dim.dimension_id}
                      className="rounded-[0.625rem] bg-[#D1D1D1]"
                    >
                      <div className="grid grid-cols-3 items-center gap-4 rounded-[0.625rem] bg-white px-4 py-6 text-left text-sm font-normal text-[#717070] shadow ">
                        <div className="col-span-1">{dim.name}</div>
                        <div className="col-span-2 flex flex-col-reverse items-end gap-4 rounded-r-lg md:flex-row md:justify-end">
                          <div className="flex w-full flex-row gap-4">
                            <input
                              value={itemInputs[dimIndex] || ""} // Usar el estado específico de esta dimensión
                              onChange={(e) => {
                                setItemInputs({
                                  ...itemInputs,
                                  [dimIndex]: e.target.value, // Actualizar el estado específico de esta dimensión
                                });
                              }}
                              className="w-full rounded-lg border border-[#757575]/30 px-4 py-2 text-sm placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                              placeholder="Escribe un item..."
                            />
                            <button
                              onClick={() => handleAddItem(dim, dimIndex)}
                              className="flex min-h-full items-center gap-3 rounded-lg bg-[#55E38E] px-4 py-2 text-white"
                            >
                              <PlusIcon className="h-4 w-4" /> Añadir
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveDimension(dim)}
                            className="flex min-h-full items-center gap-3 rounded-lg bg-[#FE7272] px-4 py-2 text-white"
                          >
                            <XMarkIcon className="h-4 w-4" /> Quitar
                          </button>
                        </div>

                        {dim.items?.length === 0 ? (
                          <div className="col-span-3">
                            <div className="grid grid-cols-1 items-center rounded-[0.625rem]  bg-slate-100 px-4 py-6 text-center text-[0.625rem] font-normal text-[#afafaf] shadow ">
                              <div>No hay items para esta dimension.</div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {dim.items?.map((itm, itmIndex) => (
                              <div key={itmIndex} className="col-span-3">
                                <div className="grid grid-cols-3 items-center rounded-[0.625rem]  bg-slate-100 px-4 py-6 text-center text-sm font-normal text-[#717070] shadow ">
                                  <div className="col-span-2">{itm.name}</div>
                                  <div className="col-span-1 flex flex-row justify-end gap-4 rounded-r-lg">
                                    <button
                                      onClick={() => handleRemoveItem(dim, itm)}
                                      className="flex min-h-full items-center gap-3 rounded-lg bg-[#FE7272] px-4 py-2 text-white"
                                    >
                                      <XMarkIcon className="h-4 w-4" /> Quitar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
          <div className="flex w-full justify-center">
            <button
              onClick={openModalConfirmation}
              className="flex min-h-full items-center gap-3 rounded-lg bg-[#FF9853] px-4 py-2 text-white"
            >
              <FolderIcon className="h-4 w-4" /> Guardar Instrumento
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
