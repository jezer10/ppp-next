"use client";
import { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import PresentationLetterModal from "./components/PresentationLetterModal";
function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const templates = [
    {
      isActive: true,
      name: "Carta de presentación",
    },
    {
      isActive: false,
      name: "Ficha de evaluación tutor empresarial",
    },
    {
      isActive: false,
      name: "Ficha de evaluación tutor académico",
    },
  ];
  return (
    <>
      {isModalOpen && (
        <>
          {
            <PresentationLetterModal
              isOpen={true}
              closeAction={() => setIsModalOpen(false)}
            />
          }
        </>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <button
            key={index}
            disabled={!template.isActive}
            onClick={() => template.isActive && setIsModalOpen(true)}
            className={`${
              template.isActive ? "bg-[#FF9853] text-white hover:shadow-2xl" : "text-[#757575] border border-[#757575]/40"
            } flex h-24 items-center justify-center gap-2  rounded-lg px-4 py-4  shadow transition-all `}
          >
            <DocumentTextIcon className="w-8" />
            <p>Ficha de evaluación tutor empresarial</p>
            {!template.isActive && <LockClosedIcon className="w-8" />}{" "}
          </button>
        ))}
      </div>
    </>
  );
}

export default Page;
