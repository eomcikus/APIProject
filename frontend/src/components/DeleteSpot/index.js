import { removeSpot } from "../../store/spots";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


const DeleteSpot = () => {
const { spotId } = useParams();
const dispatch = useDispatch();

// useEffect(() => {
//     dispatch(removeSpot(spotId))
// }, [dispatch, spotId])

const removeIt = (e) => {
    e.preventDefault()
    dispatch(removeSpot(spotId))
}
return (
    <div>
        <button type='button' onClick={removeIt}>Delete</button>
    </div>
)
}

export default DeleteSpot