import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const theSpots = useSelector(state => state.spot)
    let stateSpotsArray = Object.values(theSpots)
    console.log(stateSpotsArray)    
     return (
        <div>hi bitch🫡</div>
    )
}

export default SingleSpot;