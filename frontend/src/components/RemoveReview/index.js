import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview, getUserReviews } from "../../store/reviews";

const RemoveReview = ({review}) => {
    const {spotId} = useParams()

    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const deleteIt = (e) => {
        e.preventDefault()
        dispatch(removeReview(review.id))
        dispatch(getUserReviews())
        history.push(`/`)
    }
    return (
        <div>            
            <button type="button" onClick={deleteIt}>Delete</button>
        </div>
    )
}


export default RemoveReview;