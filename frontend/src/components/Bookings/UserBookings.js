import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from "../../store/bookings";


const UserBookings = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    let bookings = useSelector(state => state.bookings)
    console.log('bookings', bookings)
    let bookingsArr = Object.values(bookings)
    let finalArr = bookingsArr[0]
    console.log('bookingsarr', finalArr)
    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])
    // console.log('bookings', bookingsArr)

    return (
        <div className='bookings-layout'>
            {finalArr.map(booking => (

               <div>{booking.Spot.name}{booking.startDate.slice(1,10)} {booking.endDate.slice(1,10)}</div>
            ))}
            

        </div>
    )
}


export default UserBookings