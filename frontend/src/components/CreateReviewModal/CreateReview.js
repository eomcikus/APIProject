import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import * as reviewActions from "../../store/reviews"
import './CreateReview.css';

const CreateReviewForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const { spotId } = useParams()
    

    const resetClick = (e) => {
        e.preventDefault()
        setReview('')
        setStars('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            review,
            stars
        }
        let createdReview = await dispatch(reviewActions.createReview(payload, spotId))
        //dispatch getreviews again
        console.log(createdReview)
        // history.push(`/spots/${spotId}/reviews`)
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                Stars:
                <input
                    type="number"
                    placeholder="Rate your stay"
                    min={1}
                    max={5}
                    // required
                    value={stars}
                    onChange={e => {
                        // setValidationErrors([])
                        setStars(e.target.value)
                    }}
                />
                Review:
                <input
                    type="text"
                    placeholder="Tell us about it"
                    required
                    value={review}
                    onChange={e => setReview(e.target.value)} />
                <button type="submit">Create new Review</button>
                <button type="button" onClick={resetClick}>Cancel</button>
            </form>
        </section>
    )
}

export default CreateReviewForm;