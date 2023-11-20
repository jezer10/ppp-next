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
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[999]">
                    <div className="bg-[#313131]/80 w-full h-full absolute"></div>

                    <div className="bg-white md:w-[90%] lg:w-[40%] h-[60%] rounded-lg p-8 z-[51]">
                        <div className='w-full flex justify-end'>
                            <button onClick={onClose} className="hover:bg-slate-100 rounded-lg p-1">
                                <XMarkIcon className="h-4 w-4"></XMarkIcon>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;