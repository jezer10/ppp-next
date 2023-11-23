"use client";
import React, { useState, useRef } from "react";
import { DocumentMinusIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { useForm } from "react-hook-form";
import PresentationLetterModal from "./components/PresentationLetterModal";
function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const empresaRef = useRef();
  const representanteRef = useRef();
  const gradoAcademicoRef = useRef();
  const cargoRef = useRef();
  const telefonoRef = useRef();
  const direccionRef = useRef();
  const areaPracticaRef = useRef();
  const fechaRef = useRef();
  const { register, handleSubmit, formState } = useForm();
  const generateDoc = async () => {
    const data = {
      empresa: empresaRef.current.value,
      representante: representanteRef.current.value,
      gradoAcademico: gradoAcademicoRef.current.value,
      cargo: cargoRef.current.value,
      telefono: telefonoRef.current.value,
      direccion: direccionRef.current.value,
      areaPractica: areaPracticaRef.current.value,
      fecha: fechaRef.current.value,
    };

    const templateResponse = await fetch("/templates/template.docx");

    const templateArrayBuffer = await templateResponse.arrayBuffer();

    const zip = new PizZip(templateArrayBuffer);
    try {
      const doc = new Docxtemplater(zip);
      doc.setData(data);
      doc.render();

      const output = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(output, "output.docx");
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex space-x-4">
        {/* Carta de presentación card */}
        <div
          className="w-56 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-4 text-sm text-gray-700 transition-all hover:bg-[#FF9853] hover:font-bold hover:text-white">
            <DocumentMinusIcon className="w-7" />
            <p>Carta de presentación</p>
          </div>
        </div>

        {/* Ficha de evaluación card */}
        <div className="w-56">
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-4 text-sm text-black transition-all hover:bg-gray-200">
            <DocumentMinusIcon className="w-7" />

            <p>Ficha de evaluación tutor empresarial</p>
            <LockClosedIcon className="w-7" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
