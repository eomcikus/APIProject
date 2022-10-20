import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview } from "../../store/reviews";

const RemoveReview = () => {
    const {reviewId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    console.log('reviewId', reviewId)
    const deleteIt = (e) => {
        e.preventDefault()
        dispatch(removeReview(reviewId))
//where to send user back to? main page?
    }
    return (
        <div>            
            <button type="button" onClick={deleteIt}>Delete Review</button>
        </div>
    )
}


export default RemoveReview;