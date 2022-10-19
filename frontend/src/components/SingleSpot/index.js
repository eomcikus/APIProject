import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from "../../store/spots";
import EditSpot from '../EditSpot';
import DeleteSpot from '../DeleteSpot';
import CreateReviewForm from '../CreateReview'
const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(SpotActions.getSingleSpot(spotId))
    },[dispatch, spotId])
    
  
     return (
        <div>
             <ul>
                <li key={spot?.id}>
                    <h1>{spot?.name}</h1>
                    {spot?.description} 
                </li> 

            </ul>
      
            {spot.ownerId === sessionUser.id && (
                <>
                <DeleteSpot />
                <EditSpot />
                </>
            )}
            <CreateReviewForm />
        </div>
    )
}

export default SingleSpot;