import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateSpot } from '../../store/spots'



const EditSpot = () => {
    const dispatch = useDispatch()
    const {spotId } = useParams()
    const history = useHistory()
    console.log(spotId)
    const currentSpot = useSelector(state => state.spots[spotId]);
    console.log(currentSpot)
//     const history = useHistory();
//     const sessionUser = useSelector(state => state.session.user);
    const [address, setAddress] = useState(currentSpot.address)
    const [city, setCity] = useState(currentSpot.city)
    const [state, setState] = useState(currentSpot.state)
    const [country, setCountry] = useState(currentSpot.country);
    const [lat, setLat] = useState(currentSpot.lat);
    const [lng, setLng] = useState(currentSpot.lng);
    const [name, setName] = useState(currentSpot.name);
    const [description, setDescription] = useState(currentSpot.description);
    const [price, setPrice] = useState(currentSpot.price);

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
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let updatedSpot;
        const payload = {
            // ownerId: sessionUser.id,
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
        updatedSpot = await dispatch(updateSpot(payload))

         history.push(`/spots/${updatedSpot.id}`);
        
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