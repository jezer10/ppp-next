"use client";
import React, { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import PresentationLetterModal from "./components/PresentationLetterModal";

function Page() {
  let [isOpen, setIsOpen] = useState(false);

  const documents = [
    {
      active: true,
      name: "Carta de presentación",
    },
    {
      active: false,
      name: "Ficha de evaluación tutor empresarial",
    },
    {
      active: false,
      name: "Ficha de evaluación tutor academico",
    },
  ];
  return (
    <>
      <PresentationLetterModal
        isOpen={isOpen}
        closeAction={() => setIsOpen(false)}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {documents.map((document, idx) => (
          <button
            onClick={() => setIsOpen(true)}
            key={idx}
            className={`flex items-center gap-4 rounded-lg  px-4 py-6 ${
              document.active
                ? "bg-[#FF9853] text-white shadow"
                : "border border-[#757575]/40 px-4 text-[#757575]"
            } `}
            disabled={!document.active}
          >
            <DocumentTextIcon className="h-8 w-8 " />
            <span className="w-full text-start">{document.name}</span>
            {!document.active && <LockClosedIcon className="h-8 w-8 " />}
          </button>
        ))}
      </div>
    </>
  );
}

export default Page;
