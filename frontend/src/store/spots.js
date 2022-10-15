
//types
const LOAD = '/spots/LOAD'
//actions
const load = spots => ({
    type: LOAD,
    spots
})

//thunks
export const getSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`)
    if (response.ok){
        const spots = await response.json()
        dispatch(load(spots))
    }
}

let initialState = {}
//reducer
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            let newState = {};
            action.spots.Spots.forEach(spot => {
            newState[spot.id] = spot
        })
        return newState;
        }
        default:
            return state;
    }
}
export default spotReducer;