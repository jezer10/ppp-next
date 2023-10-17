import React from 'react';
import {
    XMarkIcon
} from "@heroicons/react/20/solid";
import ManageDocument from '@/app/dashboard/students/components/ManageDocument';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any
}

function DoubleModal({ isOpen, onClose, children }: ModalProps) {

    return (
        <>
            {isOpen && (
                <>
                    <div
                        onClick={onClose}
                        className="bg-[#313131]/80 w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 fixed z-50">
                    </div>
                    <div
                        className="z-[51] flex flex-row bg-white w-[90%] h-[90%] rounded-lg absolute inset-0 m-auto">
                        {children}
                    </div>
                </>
            )}
        </>
    )
}

export default DoubleModal;