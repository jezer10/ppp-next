import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  selected: any;
  setSelected: (option: any) => void;
  data:any[]
}

function Dropdown({ selected, setSelected, data }: DropdownProps) {
  const [isActive, setIsActive] = useState(false);
  const options = ["React", "Vue", "Angular"];

  /* Style for shadow 
    shadow-[3px_3px_10px_6px_rgba(0,0,0,0.06)]
  */

  return (
    <div className="w-full relative mx-auto select-none">
      <div
        onClick={() => setIsActive(!isActive)}
        className="py-2 px-4 h-full bg-[#fff] border border-[#757575]/30 text-sm rounded-lg text-[#333] flex items-center justify-between"
      >
        {selected.name}
        <ChevronDownIcon className="h-4 w-4" />
      </div>
      {isActive && (
        <div className="absolute w-full top-[110%] left-0 border border-[#757575]/30 rounded-lg bg-[#fff] font-medium text-[#333]">
          {data.map((option) => (
            <div
              key={option.dimension_id}
              onClick={() => {
                setSelected(option);
                setIsActive(false);
              }}
              className="px-4 py-2 cursor-pointer font-medium text-sm transition-all hover:bg-[#f4f4f4]"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
