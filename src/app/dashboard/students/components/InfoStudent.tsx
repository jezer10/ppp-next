import Image from "next/image";
import user from "../../../../app/assets/images/user.png";
import { IModalProps } from "../interfaces/modal";

function InfoStudent(modalProps: IModalProps) {
    return (
        <>
            <section className="flex flex-col gap-5">
                <div className="w-full flex flex-row justify-center">
                    <div className="h-20 w-20 overflow-hidden rounded-full ">
                        <Image src={user} alt="user image" />
                    </div>
                </div>
                <section className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> Nombres y Apellidos</span>
                            <span className="text-sm text-[#bababa]">
                                {modalProps.fullName !== null ? modalProps.fullName : "-"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> Código</span>
                            <span className="text-sm text-[#bababa]"> {modalProps.codeStudent != null ? modalProps.codeStudent : "-"} </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> Escuela Profesional</span>
                            <span className="text-sm text-[#bababa]"> {modalProps.school != null ? modalProps.school : "-"} </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> Ciclo</span>
                            <span className="text-sm text-[#bababa]"> {modalProps.cycle != null ? modalProps.cycle: "-"} </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> DNI</span>
                            <span className="text-sm text-[#bababa]"> {modalProps.DNI != null ? modalProps.DNI: "-"} </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> Celular</span>
                            <span className="text-sm text-[#bababa]"> {modalProps.phone != null ? modalProps.phone : "-"} </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> Correo </span>
                            <span className="text-sm text-[#bababa]"> {modalProps.email != null ? modalProps.email : "-"} </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#7e7e7e]"> Modalidad de PPP</span>
                            <span className="text-sm text-[#bababa]"> {modalProps.practicesMode != null ? modalProps.practicesMode : "-"} </span>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default InfoStudent;