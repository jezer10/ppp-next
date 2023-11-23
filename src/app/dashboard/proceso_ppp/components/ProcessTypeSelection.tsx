import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ProcessTypeSelection() {
  const [modalities, setModalities] = useState([
    { selected: true, modality: "Empresa" },
    { selected: false, modality: "Universidad" },
  ]);
  function changeModality(idx: number) {
    const result = modalities.map((e, index) =>
      index == idx ? { ...e, selected: true } : { ...e, selected: false },
    );
    setModalities(result);
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-24 rounded-xl bg-white">
      <h1 className="text-5xl font-bold text-[#757575]">
        Elige la modalidad de tus PPP
      </h1>
      <div className="flex gap-4">
        {modalities.map((e, idx) => (
          <div
            onClick={() => changeModality(idx)}
            key={idx}
            className={`${
              e.selected
                ? "bg-[#0F3971] font-bold text-white shadow"
                : "cursor-pointer border-[0.5px] border-gray-100 bg-white text-[#757575] shadow-xl hover:shadow-2xl"
            } relative rounded-lg  px-32 py-16 `}
          >
            <button
              className={`${
                e.selected ? "" : "text-[#A6A6A6]"
              } absolute right-2 top-2 h-8 w-8`}
            >
              <InformationCircleIcon />
            </button>
            <span>{`Estudiante - ${e.modality}`}</span>
          </div>
        ))}
      </div>
      <button className="rounded-xl bg-[#FF9853] px-20 py-4 text-white">
        Confirmar
      </button>
    </div>
  );
}
