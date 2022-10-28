import CreateSpotForm from "./CreateForm";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';


export const CreateSpotModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Create a Spot</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <CreateSpotForm />
            </Modal>
        )}
        </>
    )
}

export default CreateSpotModal;