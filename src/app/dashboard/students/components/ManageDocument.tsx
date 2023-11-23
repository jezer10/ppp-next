import { IManageDocument } from "../interfaces/modal";

function ManageDocument(props: IManageDocument) {
  const validateDocument = () => {};

  const rejectDocument = () => {};

  return (
    <>
      <div className="flex w-full md:w-[70%] h-full md:h-auto justify-center rounded-l-lg bg-[#404040]">
        <DocumentPreview
          fileRoute={
            "https://firebasestorage.googleapis.com/v0/b/ppp-8eefe.appspot.com/o/uploads%2F1697527519046-tarea.pdf?alt=media&token=8ac69077-5964-404a-ae31-38ef735d156b"
          }
        />
      </div>
      <div className="relative flex w-full md:w-[30%] justify-center rounded-l-lg">
        <div className="flex h-full w-full flex-col justify-between gap-3 px-8 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col ">
              <span className="font-thin text-[#7e7e7e]">Alumno</span>
              <span className="text-xl font-bold text-[#757575]">
                {props?.studentName ?? "-"}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="font-thin text-[#7e7e7e]">
                Nombre del archivo
              </span>
              <span className="text-xl font-bold text-[#757575]">
                {props?.documentName ?? "-"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-thin text-[#7e7e7e]">Observaciones:</span>
              <textarea
                className="resize-none rounded-lg border border-[#757575]/30 px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
                placeholder="Describa sus Observaciones"
                rows={5}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button className="w-full rounded-lg bg-[#FF9853] py-4 font-bold text-white ">
              Validar
            </button>
            <button className="w-full rounded-lg border border-[#FE7272] py-4 font-bold  text-[#FE7272] ">
              Rechazar
            </button>
            <button
              onClick={props.onClose}
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
  console.log(googleDocsViewerLink);
  return (
    <iframe src={googleDocsViewerLink} width="100%" height="100%"></iframe>
  );
}

export default ManageDocument;
