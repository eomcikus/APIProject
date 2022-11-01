import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSpot from './DeleteSpot';
// import LoginForm from './LoginForm';

function DeleteSpotModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSpot />
        </Modal>
      )}
    </>
  );
}

export default DeleteSpotModal;