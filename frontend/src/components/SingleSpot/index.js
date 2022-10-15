import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSpot } from '../../store/spots';
import * as SpotActions from "../../store/spots"
const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const stateSpotsObj = useSelector(state => state.spotId)
    // let stateSpotsArray = Object.values(stateSpotsObj)
    console.log(stateSpotsObj)
    useEffect(() => {
        dispatch(SpotActions.getSingleSpot())
    },[dispatch])
    // let theSpot = stateSpotsArray.find((spot) => console.log(spot.id) === console.log(spotId))
    // console.log(theSpot)
     return (
        <div>
            <ul>
                {/* <li key={theSpot.id}>
                    {theSpot.name}
                    {theSpot.description}
                </li> */}
            </ul>
        </div>
    )
}

export default SingleSpot;