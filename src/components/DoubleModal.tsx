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
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[999]">
                    <div className="bg-[#313131]/80 w-full h-full absolute"></div>
                    <div
                        className="z-[51] flex flex-row bg-white w-[90%] h-[90%] rounded-lg">
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default DoubleModal;