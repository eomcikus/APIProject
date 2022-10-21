// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
// import * as SpotActions from '../../store/spots'
import SpotCard from '../SpotCard';
import './AllSpots.css'

const AllSpots = () => {
    let {spotId} = useParams()
    const dispatch =useDispatch()
    let spots = useSelector(state => state.spots.allSpots)
    let reviews = useSelector(state => state.reviews.spot)
    let spotArray = Object.values(spots)
    console.log(spotArray)
    useEffect(() => {
        dispatch(getSpots)
    },[spots, reviews])

    return (
<div className="spotcard-layout">
    {spotArray.map(spot => (
        <SpotCard key={spot.id} spot={spot}/>))}
</div>
    )
}

export default AllSpots;