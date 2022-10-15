
//types
const LOAD = '/spots/LOAD'
const VIEWONE = '/spots/VIEWONE'
//actions
const load = spots => ({
    type: LOAD,
    spots
})

const viewOne = spot => ({
    type: VIEWONE,
    spot
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
    if (response.ok) {
        const oneSpot = await response.json()
        dispatch(viewOne(oneSpot))
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
            newState = { ...action.oneSpot };
            return newState
        }
        default:
            return state;
    }
}
export default spotReducer;