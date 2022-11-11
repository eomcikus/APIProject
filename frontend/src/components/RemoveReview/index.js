import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview } from "../../store/reviews";

const RemoveReview = ({review}) => {
    const {reviewId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    console.log('reviewId', reviewId)
    const deleteIt = (e) => {
        e.preventDefault()
        dispatch(removeReview(reviewId))
        history.push(`/spots`)
    }
    return (
        <div>            
            <button type="button" onClick={deleteIt}>Delete Review</button>
        </div>
    )
}


export default RemoveReview;