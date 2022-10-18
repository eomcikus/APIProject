import { csrfFetch } from "./csrf";
//types
const LOAD = '/reviews/LOAD'
const VIEWONE = '/reviews/VIEWONE'
const CREATE = '/reviews/NEW'
const REMOVE = '/reviews/REMOVE'

//actions
const load = reviews => ({
    type: LOAD,
    reviews
})

const viewUserRevs = review => ({
    type: VIEWONE,
    review
})

const create = review => ({
    type: CREATE,
    review
})

const remove = reviewId => ({
    type: REMOVE,
    reviewId
})

//thunks 

export const getReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        // console.log('--reviews in thunk', reviews)
        dispatch(load(reviews))
        // console.log('...after dispatch', reviews)
        return reviews;
    }
}

export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)
    if (response.ok) {
        const userReviews = await response.json()
        dispatch(viewUserRevs(userReviews))
    }
}

export const createReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const review = await response.json()
        console.log('in response')
        dispatch(create(review))
        console.log('---review after dispatch', review)
        return review;
    }
}

export const removeReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(remove(reviewId))
    }
}

let initialState = {

        spot: {},
        user: {}
    
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = { ...state }
            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            return newState;
        }
        case CREATE: {
            newState = { ...state }
            newState.reviews.spot[action.review.id] = action.review
            return newState;
        }
        default:
            return state;
    }
}
export default reviewReducer;