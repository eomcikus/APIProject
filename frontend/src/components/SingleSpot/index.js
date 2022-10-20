import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from "../../store/spots";
import EditSpot from '../EditSpot';
import DeleteSpot from '../DeleteSpot';
import CreateReviewForm from '../CreateReview'
import ReviewsForSpot from '../ReviewsForSpot';
import reviewReducer from '../../store/reviews';

const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)
    console.log('singlespot', spot)
    const sessionUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(SpotActions.getSingleSpot(spotId))
    },[dispatch, spotId])
    
  console.log(spot)
     return (
        <div>
             <ul>
                <li key={spot?.id}>
                    <h1>{spot?.name}</h1>
                    <li>{spot?.description}</li> 
                    <li>{spot?.price}</li>
                    <li>{spot?.city}</li>
                    <li>{spot?.state}</li>
                    <li>{spot?.Owner?.firstName}</li>
                    <li>{spot?.Owner?.lastName}</li>
                    {spot?.SpotImages?.map(image => <img src={image.url} />)}
                </li>
            </ul>
      
            {spot.ownerId === sessionUser.id && (
                <>
                <DeleteSpot />
                <EditSpot />
                </>
            )}
            <ReviewsForSpot />
            <CreateReviewForm />
  
        </div>
    )
}

export default SingleSpot;