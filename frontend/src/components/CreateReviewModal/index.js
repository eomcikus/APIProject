import CreateReview from './CreateReview'
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';


function CreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='write-review-button'>Write Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview setShowModal={setShowModal}  />
        </Modal>
      )}
    </>
  );
}

export default CreateFormModal;