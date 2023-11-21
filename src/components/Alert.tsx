import React, { useEffect } from 'react';
import {
    XMarkIcon
} from "@heroicons/react/20/solid";

import {
    ExclamationCircleIcon, CheckCircleIcon, InformationCircleIcon
} from "@heroicons/react/24/outline";


interface AlertProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    isLoading?: boolean;
}

export function ConfirmAlert({ isOpen, onClose, message, onCancel, onConfirm, isLoading }: AlertProps) {

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[999]">
                    <div className="bg-[#313131]/80 w-full h-full absolute"></div>

                    <div className="bg-white  md:w-[90%] lg:w-[40%] h-fit rounded-lg absolute p-6 z-[51] inset-0 m-auto">

                        {
                            !isLoading && (
                                <>
                                    <div className='w-full flex justify-end'>
                                        <button onClick={onClose} className="hover:bg-slate-100 rounded-lg p-1">
                                            <XMarkIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-5 items-center w-full">
                                        <ExclamationCircleIcon className="h-14 w-14 text-[#FF9853]" />
                                        <div className="text-center text-2xl">¡Alerta!</div>
                                        <div className="text-center text-md">{message}</div>
                                        <div className="mt-4 flex justify-center">
                                            <button onClick={onCancel} className="min-h-full mr-2 flex gap-3 items-center rounded-lg bg-red-500 p-3 text-white">
                                                Cancelar
                                            </button>
                                            <button onClick={onConfirm} className="min-h-full mr-2 flex gap-3 items-center rounded-lg bg-green-500 p-3 text-white">
                                                Continuar
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            isLoading && (
                                <div className="flex flex-col gap-5 items-center w-full py-14">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#FF9853]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export function SuccessAlert({ isOpen, onClose, message }: AlertProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <>
            {isOpen && (


                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[999]">

                    <div onClick={onClose} className="bg-[#313131]/80 w-full h-full absolute"></div>
                    <div className="bg-white  md:w-[90%] lg:w-[40%] h-fit rounded-lg absolute p-6 z-[51] inset-0 m-auto">
                        <div className='w-full flex justify-end'>
                            <button onClick={onClose} className="hover:bg-slate-100 rounded-lg p-1">
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-5 items-center w-full">
                            <CheckCircleIcon className="h-14 w-14 text-[#FF9853] " />
                            <div className="text-center text-2xl">¡Éxito!</div>
                            <div className="text-center text-md">{message}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export function InfoAlert({ isOpen, onClose, message }: AlertProps) {
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[999]">
                    <div onClick={onClose} className="bg-[#313131]/80 w-full h-full absolute"></div>
                    <div className="bg-white md:w-[90%] lg:w-[40%] rounded-lg absolute p-6 z-[51]">
                        <div className="w-full flex justify-end">
                            <button onClick={onClose} className="hover:bg-slate-100 rounded-lg p-1">
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-5 items-center w-full">
                            <InformationCircleIcon className="h-14 w-14 text-[#FF9853]" />
                            <div className="text-center text-2xl">¡Alerta!</div>
                            <div className="text-center text-md">{message}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
