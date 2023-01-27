import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

const CreateBooking = () => {

return (
    <div className='booking-object'>
        <input type='date'>Start</input>
        <input type='date'>End</input>
    </div>
    )
}

export default CreateBooking