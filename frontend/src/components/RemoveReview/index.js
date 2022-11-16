import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview } from "../../store/reviews";

const RemoveReview = () => {
    const {spotId} = useParams()
    // console.log(spotId)
    const dispatch = useDispatch()
    const history = useHistory()
    const review = useSelector(state => state.reviews.spot)
    // console.log('review', review)
    const sessionUser = useSelector(state => state.session.user)
    // console.log('sessionuser', sessionUser)
    const reviewArr = Object.values(review)
    const myReview = reviewArr.find(review => review.User.id === sessionUser.id)
    // console.log('my review', myReview)
    // let userReview = reviewArr.filter(review => {
    //    return review.User.id === sessionUser.id && review.spotId === spotId
    // })
    // let userReviewArr= Object.values(userReview)
    // console.log('usereviewarr', userReviewArr)
    // console.log('userReview', userReview)
    const deleteIt = (e) => {
        e.preventDefault()
        dispatch(removeReview(myReview.id))
        history.push(`/`)
    }
    return (
        <div>            
            <button type="button" onClick={deleteIt}>Delete</button>
        </div>
    )
}


export default RemoveReview;