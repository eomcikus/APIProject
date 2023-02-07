import EditBooking from "./EditBooking";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
export const EditBookingModal = ({booking}) => {
    const [showModal, setShowModal] = useState(false);
    // const history = useHistory()

    // const {spotId} = useParams()
    return (
      <>
        <button onClick={() => setShowModal(true)}>Edit Booking</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditBooking setShowModal={setShowModal} booking={booking}/>
          </Modal>
        )}
      </>
    );
  }
  


export default EditBookingModal;