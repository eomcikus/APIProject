// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as SpotActions from '../../store/spots'
import './AllSpots.css'

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
                {spotArray.map(spot => (<>
                <img className="img-card" src={spot.previewImage}></img>
                <p></p>
                <div key={spot.id} 
                className='spot-info'>{spot.name}{spot.avgRating}</div></>))}
                {/* {spotArray.map(spot => (<img src={spot.previewImage}></img>))} */}

            </div>
        </div>
    )
}

export default AllSpots;