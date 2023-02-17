import EditSpot from "./EditSpot";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
export const EditSpotModal = ({spotId}) => {
    const [showModal, setShowModal] = useState(false);
    // const history = useHistory()
    // const {spotId} = useParams()
    console.log('spot in modal', spotId)
    return (
      <>
        <button onClick={() => setShowModal(true)}>Edit Spot</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditSpot setShowModal={setShowModal} spotId={spotId}/>
          </Modal>
        )}
      </>
    );
  }
  


export default EditSpotModal;