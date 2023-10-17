import React from 'react';
import {
    XMarkIcon
} from "@heroicons/react/20/solid";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any;
}

function Modal({ isOpen, onClose, children }: ModalProps) {

    return (
        <>
            {isOpen && (
                <>
                    <div 
                        onClick={onClose} 
                        className="bg-[#313131]/80  w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 fixed z-50"></div>
                    <div className="bg-white  md:w-[90%] lg:w-[40%] h-[60%] rounded-lg absolute p-6 z-[51] inset-0 m-auto">
                        <div className='w-full flex justify-end'>
                            <button onClick={onClose} className="hover:bg-slate-100 rounded-lg p-1">
                                <XMarkIcon className="h-4 w-4"></XMarkIcon>
                            </button>
                        </div>
                        {children}
                    </div>
                </>
            )}
        </>
    )
}

export default Modal;