import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteBooking } from "../../store/bookings";

const DeleteTheBook = ({booking}) => {
    // console.log('booking', booking)
    const dispatch = useDispatch()
    const history = useHistory()
    const deleteIt = (e) => {
        e.preventDefault()
        dispatch(deleteBooking(booking.id))
        history.push('/')
    }
    return (
        <div>
            <button type='button' onClick={deleteIt}>Delete Booking</button>
        </div>
    )
}

export default DeleteTheBook;