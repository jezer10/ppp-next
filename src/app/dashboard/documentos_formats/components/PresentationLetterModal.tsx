import { XMarkIcon } from "@heroicons/react/24/solid";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
import { register } from "module";
import PizZip from "pizzip";
import { useForm } from "react-hook-form";

export default function PresentationLetterModal({
  isOpen,
  closeAction,
}: {
  isOpen: boolean;
  closeAction: () => void;
}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    console.log("formulario enviado", data);
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
  });
  return (
    isOpen && (
      <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/40 px-4">
        <div className="relative flex w-full max-w-3xl flex-col gap-4 rounded-lg bg-white p-4 sm:px-12 sm:py-8">
          <button
            onClick={closeAction}
            className="absolute right-4 top-4 rounded-full hover:bg-black/10 sm:p-2"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <h1 className="text-xl font-bold text-[#757575]">
            Generar carta de presentación
          </h1>
          <form onSubmit={onSubmit}>
            <div className="grid gap-8">
              <div className="grid gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Nombre de la empresa
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("companyName")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Dirección de la Empresa
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("companyAddress")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Representante de la empresa
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("companyAgent")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Cargo del Representante
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("agentPosition")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Grado Académico del Representante
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("agentPosition")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Contacto del representante
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("agentContact")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Área práctica
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("practiceArea")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Código Universitario
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("alumnCode")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Coloca tu Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("fullName")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-[#757575] ">
                    Inicio de prácticas
                  </label>
                  <input
                    type="date"
                    placeholder="Ingrese nombre de la empresa"
                    className="rounded-lg border border-[#CECECE] px-4 py-2 placeholder:font-thin placeholder:text-[#CECECE] focus:border-[#FF9853] focus:outline-none"
                    {...register("practiceStart")}
                  />
                </div>
              </div>
              <button
                className="w-full rounded-lg bg-[#FF9853] py-4 text-center font-bold text-white"
                type="submit"
              >
                Generar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
