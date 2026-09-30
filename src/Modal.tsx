import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const elRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (!modalRoot || !elRef.current) {
      return;
    }

    modalRoot.appendChild(elRef.current);

    return () => {
      if (modalRoot && elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  if (!elRef.current) {
    return null;
  }

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;