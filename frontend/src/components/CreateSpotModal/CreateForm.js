import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { createSpot, createSpotImage, getSpots } from '../../store/spots'
import { getReviews } from '../../store/reviews';
import './CreateSpot.css'
const CreateSpotForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('');
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const [submit, setSubmit] = useState(false)
    const [photo, setPhoto] = useState('')
    //test comment

    useEffect(() => {
        let errors = []
        if (!address) errors.push("Spot must have an address")
        if (address.length < 10) errors.push("Spot must have a complete address")
        if (!city) errors.push("Spot must have a city")
        if (city.length < 4) errors.push("Spot must have a city longer than 4 characters")
        if (!state) errors.push("Spot must have a state")
        if (state.length < 2) errors.push("Spot must have a state code or state name longer than 1 character")
        if (!country) errors.push("Spot must have a country")
        if (country.length < 3) errors.push("Spot must have country code or country name longer than 3 characters")
        if (!name) errors.push("spot must have a name")
        if (name.length < 10 ) errors.push("Less than 10 characters is not enough for a spot name. Please be descriptive and use 10 or more characters.")
        if (!description) errors.push("Spot must have a description")
        if (description.length < 20) errors.push("The description should be longer than 20 characters so your future visitors know a lot about their spot.")
        if (!price) errors.push("Spot must have a price ")
        if (price < 0) errors.push("Price must be greater than 0")
        if (description.length > 5000) errors.push("Spot description must be less than 5000 characters")
        // if (lat < -90 || lat > 90) errors.push("Latitude must be between -90 and 90")
        // if (lng < -180 || lng > 180) errors.push("Longitude must be between -180 and 180")
        if (!photo.includes('.png') && !photo.includes('.jpg') && !photo.includes('.jpeg')) errors.push('Photo must be in .png, .jpeg, or .jpg format')
        if (photo.length === 0) errors.push('Must include an image URL so your future visitors know what your house looks like')
        setValidationErrors(errors)
    }, [name, price, description, address, city, state, country, photo])

    const resetClick = (e) => {
        e.preventDefault()
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        // setLat('')
        // setLng('')
        setName('')
        setDescription('')
        setPrice('')

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let createdSpot;
        const payload = {
            address,
            city,
            state,
            country,
            lat: 1,
            lng: 1,
            name,
            description,
            price,
            previewImage: photo
        }
        setSubmit(true)
        // console.log('createdSpot', createdSpot)
        if (validationErrors.length) {
            setShowModal(true)
        } else {
        createdSpot = await dispatch(createSpot(payload))
        let createdSpotImage = await dispatch(createSpotImage(photo, createdSpot.id))
        await dispatch(getReviews(createdSpot.id))
        setShowModal(false)
        history.push('/')
        }
    }
    return (
        <section>
            <form onSubmit={handleSubmit} className='create-form-modal'>
                <h1> Create a Spot</h1>
                {submit && validationErrors.length && (
                    <ul className="errors">
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>))}
                    </ul>
                )}
                <h2>Tell us about your spot.</h2>
                Where is your spot?
                <input
                    type="text"
                    placeholder='Address'
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)} />

                <input
                    type="text"
                    placeholder='City'
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)} />

                <input
                    type='text'
                    placeholder='State'
                    required
                    value={state}
                    onChange={e => setState(e.target.value)} />

                <input
                    type='text'
                    placeholder='Country'
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)} />

                {/* <input
                    type='text'
                    placeholder='Latitude'
                    required
                    value={lat}
                    onChange={e => setLat(e.target.value)} />

                <input
                    type='text'
                    placeholder='Longitude'
                    required
                    value={lng}
                    onChange={e => setLng(e.target.value)} /> */}
                Give your spot a name.
                <input
                    type='text'
                    placeholder='Spot name'
                    required
                    value={name}
                    onChange={e => setName(e.target.value)} />
                What makes your spot special? Write a description.
                <input
                    type='text'
                    placeholder='description'
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                Cost per night:
                <input
                    type='number'
                    placeholder='$'
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                Upload a photo:
                <input
                    type='text'
                    placeholder='link to photo'
                    required
                    value={photo}
                    onChange={e => setPhoto(e.target.value)}
                />
                <button type="submit"
                onSubmit={handleSubmit}
                // disabled={validationErrors.length ? true : false}
                >Create new Spot</button>
                <button type="button"
                    onClick={resetClick}
                >Cancel</button>
            </form>
        </section>
    )
}

export default CreateSpotForm;