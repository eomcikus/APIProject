import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from "../../store/bookings";
import DeleteTheBook from "../DeleteBooking/DeleteBooking";

const UserBookings = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    let bookings = useSelector(state => state.bookings)
    // console.log('bookings', bookings)
    let bookingsArr = Object.values(bookings)
    // console.log('bookingsarr', bookingsArr)
    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])
    // console.log('bookings', bookingsArr)
    if (!bookings) return null; 
    return (
        <>
        <div className='bookings-layout'>
            {bookingsArr.map(booking => ( 

               <div key={booking.id}>{booking.spotId}{booking.Spot.name} <DeleteTheBook booking={booking} /></div>
            ))}
            

        </div>
    </>
    )
}


export default UserBookings