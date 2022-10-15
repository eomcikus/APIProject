// import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as SpotActions from '../../store/spots'


const AllSpots = () => {

    let spots = useSelector(state => state.spots)
    let spotArray = Object.values(spots)


    return (
        <div>
            <ul>
                {spotArray.map(spot => (<li key={spot.id}>{spot.name}</li>))}
            </ul>
        </div>
    )
}

export default AllSpots;