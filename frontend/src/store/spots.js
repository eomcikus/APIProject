import { csrfFetch } from "./csrf"
//types
const LOAD = '/spots/LOAD'
const VIEWONE = '/spots/VIEWONE'
const UPDATE = '/spots/UPDATE'
const CREATE = '/spots/CREATE'
const REMOVE = '/spots/REMOVE'
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
//thunks
export const getSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`)
    if (response.ok) {
        const spots = await response.json()
        dispatch(load(spots))
    }
}

export const getSingleSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    console.log('spotid in spots', spotId)
    if (response.ok) {
        const oneSpot = await response.json()
        // console.log(oneSpot)
        dispatch(viewOne(oneSpot))
    }
}

export const updateSpot = (spot, spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const oneSpot = await response.json()
        dispatch(update(oneSpot))
    }
}

export const createSpot = (spot, spotId) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        const spot = await response.json()
        dispatch(create(spot))
    }
}

export const removeSpot = (spotId) => async dispatch => {
    console.log('---spotId', spotId)
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        })
        if (response.ok){
             const spot = await response.json()
             dispatch(remove(spotId))
        }
}

let initialState = {}
//reducer
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = {};
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState;
        }
        case VIEWONE: {
            newState = { ...state }
            newState['singleSpot'] = action.spot;
            return newState
        }
        case CREATE: {
          if (!state[action.spot.id]) {
            const newState = {
                ...state,
                [action.spot.id]: action.spot
            }
            return newState;
        }
        return {
            ...state,
            [action.spot.id]: {
                ...state[action.spot.id],
                ...action.spot
            }
        }
        }
        case REMOVE: {
            const deletedState = {...state}
            delete deletedState[action.spotId]
            return deletedState;
        }
        default:
            return state;
    }
}
export default spotReducer;