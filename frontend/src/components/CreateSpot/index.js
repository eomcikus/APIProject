import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots'

const CreateSpotForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
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
        if (createdSpot) {
            history.push(`/pokemon/${createdSpot.id}`);
            hideForm();
        }
    }
    const handleCancelClick = (e) => {
        e.preventDefault()
        hideForm()
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
                    type='text'
                    placeholder='$'
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button type="submit">Create new Spot</button>
                <button type="reset" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default CreateSpotForm;