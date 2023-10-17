import { IManageDocument } from "../interfaces/modal";

function ManageDocument(props: IManageDocument) {
  return (
    <>
      <div className="flex h-full flex-col justify-between gap-3 px-10 py-8">
        <div className="flex flex-col gap-5">
          <div className="flex w-full flex-col">
            <span className="text-sm font-semibold text-[#7e7e7e]">
              {" "}
              Alumno
            </span>
            <span className="text-sm text-[#bababa]">
              {props.studentName != null ? props.studentName : "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#7e7e7e]">
              {" "}
              Nombre del archivo
            </span>
            <span className="text-sm text-[#bababa]">
              {props.documentName != null ? props.documentName : "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#7e7e7e]">
              {" "}
              Observaciones:
            </span>
            <textarea
              // type="text"
              // value={searchTerm}
              // onChange={(e) => handleSearchTermChange(e.target.value)}
              className="resize-none rounded-lg border border-[#757575]/30 px-4 py-2 placeholder:text-sm placeholder:font-light placeholder:text-[#C4C4C4] focus:outline-none"
              placeholder="Anote sus observaciones..."
              rows={5}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="h-full rounded-lg bg-[#FF9853] p-3 text-white ">
            Validar
          </button>
          <button className="h-full rounded-lg border border-[#FE7272] p-3 text-[#FE7272] ">
            Rechazar
          </button>
          <span
            onClick={props.onClose}
            className="cursor-pointer p-3 text-center"
          >
            {" "}
            Volver{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default ManageDocument;
