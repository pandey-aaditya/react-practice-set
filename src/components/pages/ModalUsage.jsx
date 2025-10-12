import { useState } from "react";
import { Modal } from "../common";

const ModalUsage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const modalTitle = <span>Modal Title</span>;
  const modalFooter = <span>Modal Footer</span>;
  const modalBody = <span>Modal Body</span>;

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="dashboard-container">
      <Modal
        title={modalTitle}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        body={modalBody}
        footer={modalFooter}
        requireLaunchButton={false}
        requireCloseButton={true}
      />
      <button className="modal-launch-btn" onClick={handleOpenModal}>
        Open Modal
      </button>
    </div>
  );
};

export default ModalUsage;
