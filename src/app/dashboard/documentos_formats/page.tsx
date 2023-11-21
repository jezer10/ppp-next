"use client";
import React, { useState, useRef } from "react";
import { DocumentMinusIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

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
    <div className="flex space-x-4">
      {/* Carta de presentación card */}
      <div className="w-56 cursor-pointer" onClick={() => setIsModalOpen(true)}>
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
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
            <div className="w-1/2 rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-4 text-xl">Generar Carta de presentación</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre de la empresa
                  </label>
                  <input
                    ref={empresaRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombres y apellidos del representante de la empresa
                  </label>
                  <input
                    ref={representanteRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Grado académico del representante de la empresa
                  </label>
                  <input
                    ref={gradoAcademicoRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cargo que ejerce el representante de la empresa
                  </label>
                  <input
                    ref={cargoRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono y/o celular del representante de la empresa
                  </label>
                  <input
                    ref={telefonoRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dirección de la empresa
                  </label>
                  <input
                    ref={direccionRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Área de práctica
                  </label>
                  <input
                    ref={areaPracticaRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha que inicia sus PPP
                  </label>
                  <input
                    ref={fechaRef}
                    className="mt-1 w-full rounded-md border p-2"
                    type="date"
                  />
                </div>
              </div>
              <button onClick={generateDoc}>generar</button>
              <button
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
