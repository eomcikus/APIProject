import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from "../../store/spots";

const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    console.log('spotId', spotId)
    useEffect(() => {
        dispatch(SpotActions.getSingleSpot(spotId))
    },[dispatch, spotId])
    const spot = useSelector(state => state.spots.singleSpot)
    console.log('spot in singlespot', spot)
  
     return (
        <div>
             <ul>
                <li key={spot?.id}>
                    {spot?.name}
                    {spot?.description} 
                </li> 

            </ul>
        </div>
    )
}

export default SingleSpot;