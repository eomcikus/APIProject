import { removeSpot } from "../../store/spots";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


const DeleteSpot = () => {
const { spotId } = useParams();
const dispatch = useDispatch();
const history = useHistory()
const sessionUser = useSelector(state => state.session.user);
console.log(sessionUser)
//if session user id === spot.ownerid then display delete button 


// useEffect(() => {
//     dispatch(removeSpot(spotId))
// }, [dispatch, spotId])

const removeIt = (e) => {
    e.preventDefault()
    dispatch(removeSpot(spotId))
    history.push(`/api/spots`)
}
return (
    <div>
        <button type='button' onClick={removeIt}>Delete</button>
    </div>
)
}

export default DeleteSpot