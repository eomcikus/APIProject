import CreateSpotForm from "./CreateForm";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './CreateSpot.css'

export const CreateSpotModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button className='become-host-button' onClick={() => setShowModal(true)}>Become a Host</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <CreateSpotForm setShowModal={setShowModal}/>
            </Modal>
        )}
        </>
    )
}

export default CreateSpotModal;