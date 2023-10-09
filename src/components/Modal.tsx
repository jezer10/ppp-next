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
                <div className="w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 fixed z-50">
                    <div onClick={onClose} className="bg-[#313131]/80  w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 fixed"></div>
                    <div className="bg-white max-w-[800px] min-w-[300px] rounded-lg absolute top-[40%] left-[50%] p-6 transform translate-x-[-50%] translate-y-[-50%]">
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