import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots'

const CreateSpotForm = ({  }) => {
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
        //passwords match
        //lat mustb e between -90 and 90
        //lng must be between -180 and 180
        //price must be a number 

    })
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
         history.push(`/spots`);
        
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                Address:
                <input
                    type="text"
                    placeholder='Address'
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)} />
                City:
                <input
                    type="text"
                    placeholder='City'
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)} />
                State:
                <input
                    type='text'
                    placeholder='state'
                    required
                    value={state}
                    onChange={e => setState(e.target.value)} />
                Country:
                <input
                    type='text'
                    placeholder='Country'
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)} />
                Latitude:
                <input
                    type='text'
                    placeholder='Latitude'
                    required
                    value={lat}
                    onChange={e => setLat(e.target.value)} />
                Longitute:
                <input
                    type='text'
                    placeholder='Longitude'
                    required
                    value={lng}
                    onChange={e => setLng(e.target.value)} />
                Name:
                <input
                    type='text'
                    placeholder='Spot name'
                    required
                    value={name}
                    onChange={e => setName(e.target.value)} />
                Description:
                <input
                    type='text'
                    placeholder='description'
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                Price:
                <input
                    type='number'
                    placeholder='$'
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button type="submit"
               >Create new Spot</button>
                <button type="button" 
                onClick={resetClick}>Cancel</button>
            </form>
        </section>
    )
}

export default CreateSpotForm;