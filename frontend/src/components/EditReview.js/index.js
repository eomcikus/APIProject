import EditReview from "./EditReview"
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

export const EditReviewModal = ({review}) => {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <>
        <button onClick={() => setShowModal(true)}>Edit Review</button>
        {showModal && (
            <Modal onClose={() =>  setShowModal(false)}>
                <EditReview setShowModal={setShowModal} review={review}/>
            </Modal>
        )}
        </>
    )
}

export default EditReviewModal