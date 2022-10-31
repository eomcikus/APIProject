import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { getSingleSpot, updateSpot } from '../../store/spots'
import { clear } from '../../store/spots'
import './EditSpot.css'

const EditSpot = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const history = useHistory()
    // console.log(spotId)
    const currentSpot = useSelector(state => state.spots.singleSpot);
    // console.log('current spot in edit', currentSpot)
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        return(() => {
            dispatch(clear())
        })
    }, [dispatch, spotId])
    useEffect(() => {
        setAddress(currentSpot?.address)
        setCity(currentSpot?.city)
        setState(currentSpot?.state)
        setCountry(currentSpot?.country)
        setLat(currentSpot?.lat)
        setLng(currentSpot?.lng)
        setName(currentSpot?.name)
        setDescription(currentSpot?.description)
        setPrice(currentSpot?.price)

    }, [currentSpot])
    //     const sessionUser = useSelector(state => state.session.user);
    const [address, setAddress] = useState(currentSpot?.address)
    const [city, setCity] = useState(currentSpot?.city)
    const [state, setState] = useState(currentSpot?.state)
    const [country, setCountry] = useState(currentSpot?.country);
    const [lat, setLat] = useState(currentSpot?.lat);
    const [lng, setLng] = useState(currentSpot?.lng);
    const [name, setName] = useState(currentSpot?.name);
    const [description, setDescription] = useState(currentSpot?.description);
    const [price, setPrice] = useState(currentSpot?.price);

    const [validationErrors, setValidationErrors] = useState([])
    
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateLng = (e) => setLng(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)

    const resetClick = (e) => {
        e.preventDefault()
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setLat('')
        setLng('')
        setName('')
        setDescription('')
        setPrice('')
        // dispatch()
    }


    useEffect(() => {
        let errors = []
        if (!address) errors.push("Spot must have an address")
        if (!city) errors.push("Spot must have a city")
        if (!state) errors.push("Spot must have a state")
        if (!country) errors.push("Spot must have a country")
        if (!name) errors.push("spot must have a name")
        if (!description) errors.push("Spot must have a description")
        if (!price) errors.push("Spot must have a price ")
        if (price < 0) errors.push("Price must be greater than 0")
        if (description.length > 5000) errors.push("Spot description must be less than 5000 characters")
        if (lat < -90 || lat > 90) errors.push("Latitude must be between -90 and 90")
        if (lng < -180 || lng > 180) errors.push("Longitude must be between -180 and 180")
        setValidationErrors(errors)
    },[name, price, lat, lng, description, address, city, state, country])
    const handleSubmit = async (e) => {
        e.preventDefault()
        let updatedSpot;
        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        updatedSpot = await dispatch(updateSpot(payload, spotId))
        console.log('made it to if statement with history.push')
        if (updatedSpot) {
            dispatch(getSingleSpot(spotId))
            history.push(`/spots/${spotId}`)
        }
    }
    return (
        <section>
            <form onSubmit={handleSubmit} className='edit-spot-form'>
                <ul className="errors">
                    {validationErrors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}</ul>
                    Address:
                    <input
                        type="text"
                        placeholder='Address'
                        required
                        value={address}
                        onChange={updateAddress} />
                    City:
                    <input
                        type="text"
                        placeholder='City'
                        required
                        value={city}
                        onChange={updateCity} />
                    State:
                    <input
                        type='text'
                        placeholder='state'
                        required
                        value={state}
                        onChange={updateState} />
                    Country:
                    <input
                        type='text'
                        placeholder='Country'
                        required
                        value={country}
                        onChange={updateCountry} />
                    Latitude:
                    <input
                        type='text'
                        placeholder='Latitude'
                        required
                        value={lat}
                        onChange={updateLat} />
                    Longitute:
                    <input
                        type='text'
                        placeholder='Longitude'
                        required
                        value={lng}
                        onChange={updateLng} />
                    Name:
                    <input
                        type='text'
                        placeholder='Spot name'
                        required
                        value={name}
                        onChange={updateName} />
                    Description:
                    <input
                        type='text'
                        placeholder='description'
                        required
                        value={description}
                        onChange={updateDescription}
                    />
                    Price:
                    <input
                        type='text'
                        placeholder='$'
                        required
                        value={price}
                        onChange={updatePrice}
                    />
                    <button type="submit"
                    >Update Spot</button>
                    <button type="button"
                        onClick={resetClick}>Cancel</button>
            </form>
        </section>
    )
}

export default EditSpot;