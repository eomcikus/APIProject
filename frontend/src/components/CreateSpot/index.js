import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots'

const CreateSpotForm = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const [submit, setSubmit] = useState(false)
    //test comment

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
    }, [name, price, lat, lng, description, address, city, state, country])

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

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let createdSpot;
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
        createdSpot = await dispatch(createSpot(payload))
        // console.log('createdSpot', createdSpot)
        if (validationErrors.length){
            setSubmit(true)
            window.alert('Cannot submit form')
        } else {
            history.push(`/spots`);
            setSubmit(false)
        }
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
               <h1> Create a Spot</h1>
                <ul className="errors">
                    {validationErrors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>

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

                <input
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
                    onChange={e => setLng(e.target.value)} />

                <input
                    type='text'
                    placeholder='Spot name'
                    required
                    value={name}
                    onChange={e => setName(e.target.value)} />

                <input
                    type='text'
                    placeholder='description'
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <input
                    type='number'
                    placeholder='$'
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button type="submit"
                disabled={validationErrors.length ? true : false}
                >Create new Spot</button>
                <button type="button"
                    onClick={resetClick}
                    >Cancel</button>
            </form>
        </section>
    )
}

export default CreateSpotForm;