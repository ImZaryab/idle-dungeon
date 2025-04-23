import { ReactNode } from "react";
import { createPortal } from "react-dom";
import InterfaceBackground from "./InterfaceBackground";
import CloseBtn from "./CloseBtn";

interface ModalProps {
  showModal: boolean;
  handleModalToggle: () => void;
  children: ReactNode;
}

function Modal({ showModal, handleModalToggle, children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return <div>loading...</div>;
  }

  return createPortal(
    <>
      {showModal && (
        <>
          <div className="overlay" />
          <div className="modal relative flex justify-center items-center bg-black bg-opacity-80">
            <div className="absolute top-7 right-8 z-20">
              <CloseBtn handleOnClick={handleModalToggle} />
            </div>
            <div className="absolute">
              <InterfaceBackground />
            </div>
            <div className="z-10 w-[767px] h-[58dvh] relative">{children}</div>
          </div>
        </>
      )}
    </>,
    modalRoot
  );
}

export default Modal;
