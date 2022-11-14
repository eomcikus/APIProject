import { removeSpot } from "../../store/spots";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './DeleteSpot.css'

const DeleteSpot = () => {
const { spotId } = useParams();
const dispatch = useDispatch();
const history = useHistory()
const sessionUser = useSelector(state => state.session.user);
const spot = useSelector(state => state.spots.singleSpot.id)
console.log('this is spot in delete spot', spot)
console.log(sessionUser)
//if session user id === spot.ownerid then display delete button 

const removeIt = (e) => {
    e.preventDefault()
    dispatch(removeSpot(spotId))
    history.push(`/`)
}
return (
    <div className='delete-modal'>
        <h2>Are you sure? </h2>
        Pressing this button will delete your Spot and all information connected to it. 
        This cannot be undone.
        <button type='button' onClick={removeIt}>I am sure, Delete</button>
    </div>
)
}

export default DeleteSpot;