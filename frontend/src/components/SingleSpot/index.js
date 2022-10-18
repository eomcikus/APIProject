import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from "../../store/spots";
import EditSpot from '../EditSpot';
const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(SpotActions.getSingleSpot(spotId))
    },[dispatch, spotId])
    const spot = useSelector(state => state.spots.singleSpot)
    
  
     return (
        <div>
             <ul>
                <li key={spot?.id}>
                    <h1>{spot?.name}</h1>
                    {spot?.description} 
                </li> 

            </ul>
            <EditSpot />
        </div>
    )
}

export default SingleSpot;