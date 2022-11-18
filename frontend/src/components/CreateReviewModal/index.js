import CreateReview from './CreateReview'
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';


function CreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Write Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview setShowModal={setShowModal} className='write-review-button' />
        </Modal>
      )}
    </>
  );
}

export default CreateFormModal;