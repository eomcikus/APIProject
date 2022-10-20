// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as SpotActions from '../../store/spots'


const AllSpots = () => {

    let spots = useSelector(state => state.spots.allSpots)
    let spotArray = Object.values(spots)
    console.log(spotArray)
    useEffect(() => {
        console.log('Allspots, spots', spots)

    }, [spots])

    return (
        <div className="spots-container">
            <div className="spot-cards">
            <ul>
                {spotArray.map(spot => (<li key={spot.id} className="spot-card">{spot.name}<img src={spot.previewImage}></img>)<img src={spot.previewImage}></img>)</li>))}
                {/* {spotArray.map(spot => (<img src={spot.previewImage}></img>))} */}
                </ul>
            </div>
        </div>
    )
}

export default AllSpots;