
import { csrfFetch } from "./csrf"
//types
const LOAD = '/spots/LOAD'
const VIEWONE = '/spots/VIEWONE'
const UPDATE = '/spots/UPDATE'
const CREATE = '/spots/CREATE'
const REMOVE = '/spots/REMOVE'
const CLEAR = '/spots/CLEAR'
const USER = '/spots/USER'
//actions
const load = spots => ({
    type: LOAD,
    spots
})

const viewOne = spot => ({
    type: VIEWONE,
    spot
})

const update = spot => ({
    type: UPDATE,
    spot
})

const create = spot => ({
    type: CREATE,
    spot
})

const remove = spotId => ({
    type: REMOVE,
    spotId
})

export const clear = ()  =>({
    type: CLEAR,
  
})
const user = spots => ({
    type: USER,
    spots
})
//thunks
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`)
    if (response.ok) {
        const spots = await response.json()
        dispatch(load(spots))
    }
}

export const getSingleSpot = (spotId) => async dispatch => {
    // console.log('spotId', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`)
    // console.log('spotid in spots', spotId)
    // console.log('response', response)
    if (response.ok) {
        const oneSpot = await response.json()
        // console.log('onespot', oneSpot)
        dispatch(viewOne(oneSpot))
    }
}
export const getUserSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`)
    if (response.ok){
        const userSpots = await response.json()
        dispatch(user(userSpots))
    }
}
export const updateSpot = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        // console.log('res', response)
        const oneSpot = await response.json()
        // console.log('---', oneSpot)
        dispatch(update(oneSpot))
        return oneSpot
    }
}

export const createSpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const newSpot = await response.json()
        dispatch(create(newSpot))
        return newSpot;
    }
}

export const createSpotImage = (url, spotId) => async dispatch => {
    let spotImage = {url: url, spotId: spotId, preview: true } 
    const response = await csrfFetch(`/api/spots/${spotId}/images`, 
    {
        method: 'POST',
        body: JSON.stringify(spotImage),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        const newSpotImage = await response.json()
        dispatch(create(newSpotImage))
        return newSpotImage;
    }
    //create
}

export const removeSpot = (spotId) => async dispatch => {
    // console.log('---spotId in delete', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    // console.log('response after fetch', response)
    if (response.ok) {
        // console.log('response', response)
        dispatch(remove(spotId))
    }
}


let initialState = {
    allSpots: {},
    singleSpot: {},
}
//reducer
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = {allSpots: {}, singleSpot: {} };
            newState.allSpots = {}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        }
        case VIEWONE: {
            newState = { allSpots: {}, singleSpot: {}  }
            newState.singleSpot = action.spot;
            return newState
        }
        case CREATE: {

            newState = { ...state, singleSpot: {}, allSpots: {...state.allSpots} }
           newState.allSpots[action.spot.id] = action.spot
            if (newState.allSpots[action.spot.id].SpotImages){
                newState.allSpots[action.spot.id].previewImage = newState.allSpots[action.spot.id].SpotImages[0].url
            } 
            newState.singleSpot = action.spot
             return newState;
        }
        case UPDATE: {
            newState = { ...state }
            newState.singleSpot = action.spot
            return newState
        }
        case REMOVE: {
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {...state.singleSpot} }
            delete newState.allSpots[action.spotId]
            // console.log('actionspotid', action.spotId)
            delete newState.singleSpot[action.spotId]
            return newState;
        }
        case CLEAR: {
            newState = {...state, allSpots: {...state.allSpots}, singleSpot: {}}
            return newState;
        }
        case USER: {
            newState = {allSpots: {}, singleSpot: {}}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        }
        default:
            return state;
    }
}
export default spotReducer;