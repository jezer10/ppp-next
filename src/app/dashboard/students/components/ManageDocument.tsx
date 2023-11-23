import { rejectStudentDocument, validateStudentDocument } from "@/services";
import { IManageDocument } from "../interfaces/modal";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Resend } from "resend";
import ValidateDocumentEmail from "@/components/templates/ValidateDocumentEmail";

const RESEND_KEY = "re_RD2L1uQK_MP9tuokbb2QumngwzYqLmQ2z";
const MAIN_EMAIL = "onboarding@.dev";

const resend = new Resend(RESEND_KEY);
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
function ManageDocument(props: IManageDocument) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const validateDocument = async () => {
    try {
      await validateStudentDocument(props.document?.step_id, inputValue);

      const response = await fetch("/api/emails/validate", {
        method: "POST",
        headers,
        body: JSON.stringify({
          observaciones: inputValue,
          fullName: props.document?.fullName,
        }),
      });
      console.log(await response.json());

      toast.success("Documento validado correctamente");
      props.onClose(true);
    } catch (error) {
      return toast.error("Error al validar el documento");
    }
  };

  const rejectDocument = async () => {
    if (!inputValue) {
      return toast.error("Debe ingresar una observación");
    }
    await rejectStudentDocument(props.document?.step_id, inputValue);
    const response = await fetch("/api/emails/reject", {
      method: "POST",
      headers,
      body: JSON.stringify({
        observaciones: inputValue,
        fullName: props.document?.fullName,
      }),
    });
    console.log(await response.json());
    toast.success("Documento rechazado correctamente");
    props.onClose(true);
  };

  return (
    <>
      <div className="flex h-full w-full justify-center rounded-l-lg bg-[#404040] md:h-auto md:w-[70%]">
        <DocumentPreview fileRoute={props.document?.path} />
      </div>
      <div className="relative flex w-full justify-center rounded-l-lg md:w-[30%]">
        <div className="flex h-full w-full flex-col justify-between gap-3 px-8 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col ">
              <span className="font-thin text-[#7e7e7e]">Alumno</span>
              <span className="text-xl font-bold text-[#757575]">
                {props.document?.fullName ?? "-"}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="font-thin text-[#7e7e7e]">
                Nombre del archivo
              </span>
              <span className="text-xl font-bold text-[#757575]">
                {props.document?.filename ?? "-"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-thin text-[#7e7e7e]">Observaciones:</span>
              {props.document?.state == 0 ? (
                <>
                  <textarea
                    className="resize-none rounded-lg border border-[#757575]/30 px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                    placeholder="Describa sus Observaciones"
                    rows={5}
                    value={inputValue}
                    onChange={handleInputChange}
                  ></textarea>
                </>
              ) : (
                <span className="text-xl font-bold text-[#757575]">
                  {props.document?.observaciones ?? "-"}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            {props.document?.state == 0 && (
              <>
                <button
                  onClick={validateDocument}
                  className="w-full rounded-lg bg-[#FF9853] py-4 font-bold text-white "
                >
                  Validar
                </button>
                <button
                  onClick={rejectDocument}
                  className="w-full rounded-lg border border-[#FE7272] py-4 font-bold  text-[#FE7272] "
                >
                  Rechazar
                </button>
              </>
            )}
            <button
              onClick={() => props.onClose()}
              className="rounded-lg px-4 py-2 text-center text-sm font-bold hover:bg-gray-200"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function DocumentPreview({ fileRoute }: { fileRoute: string }) {
  const encodedURL = encodeURIComponent(fileRoute);
  const googleDocsViewerLink = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodedURL}`;
  return (
    <iframe src={googleDocsViewerLink} width="100%" height="100%"></iframe>
  );
}

export default ManageDocument;
