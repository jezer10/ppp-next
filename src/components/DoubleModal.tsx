import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

function DoubleModal({ isOpen, onClose, children }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex items-center justify-center">
          <div className="absolute h-full w-full bg-[#313131]/80"></div>
          <div className="z-[51] flex h-[90%] w-[90%] flex-row rounded-lg bg-white">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default DoubleModal;
