// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as SpotActions from '../../store/spots'


const AllSpots = () => {

    let spots = useSelector(state => state.spots.allSpots)
    let spotArray = Object.values(spots)
    // console.log('spotArray', spotArray)
    useEffect(() => {
        console.log('Allspots, spots', spots)

    }, [spots])

    return (
        <div className="spots-container">
            <ul>
                {spotArray.map(spot => (<li key={spot.id}>{spot.name}</li>))}
            </ul>
        </div>
    )
}

export default AllSpots;