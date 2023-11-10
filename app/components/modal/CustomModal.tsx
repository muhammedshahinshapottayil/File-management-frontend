"use client";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import React, { useState } from "react";
const CustomModal = ({
  children,
  Button,
}: {
  children: React.ReactNode;
  Button: React.ComponentType<{ children?: string }>;
}) => {
  const [state, setState] = useState<boolean>(false);
  const openModal = () => {
    setState(true);
  };
  const closeModal = () => {
    setState(false);
  };
  return (
    <div>
      <div onClick={openModal}>
        <Button />
      </div>
      <Modal isOpen={state} onRequestClose={closeModal} ariaHideApp={false}>
        <div className="modal-nav p-6 relative">
          <span className="float-right top-0 right-0 mt-[-15px] ">
            <AiFillCloseCircle
              style={{ cursor: "pointer" }}
              size={30}
              color="#ffffff"
              onClick={closeModal}
            />
          </span>
        </div>
        <div className="flex items-center justify-center h-full">
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
