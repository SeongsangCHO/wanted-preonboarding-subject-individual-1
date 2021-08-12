import React, { useState, useEffect } from "react";

const useModalToggle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const modalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  return {
    modalToggle,
    setModalType,
    setIsModalOpen,
    modalType,
    isModalOpen,
  };
};

export default useModalToggle;
