import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spots';
import EditSpotModal from '../EditSpotModal';
import DeleteSpotModal from '../DeleteSpotModal'
import './currentuserspots.css'
export const CurrentUsersSpots = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots.Spots)
    console.log(spots)
    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])
    if (!spots) return null;
    return (
        <div className='owner-spots-container'>
        <h1>Your Spots</h1>
        {spots.map(spot => (<div key={spot.id} className='spotcard-owner'>{spot.name}
        <img className='owner-spot-img' src={spot.previewImage}/>
        <div className='owner-desc'>{spot.description}</div>
        <div className='owner-buttons-container'><EditSpotModal spot={spot}/> <DeleteSpotModal /></div>
        </div>))}
    </div>
    )
}

export default CurrentUsersSpots;