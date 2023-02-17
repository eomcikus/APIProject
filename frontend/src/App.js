import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as SpotActions from "./store/spots"
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SingleSpot from "./components/SingleSpot";
// import CreateSpotForm from "./components/CreateSpot";
// import DeleteSpot from "./components/DeleteSpot";
import EditSpot from "./components/EditSpotModal/EditSpot";
import ReviewsForSpot from "./components/ReviewsForSpot";
import CreateReviewForm from "./components/CreateReviewModal";
import RemoveReview from "./components/RemoveReview";
import CurrentUsersReviews from "./components/CurrentUsersReviews";
import UserBookings from "./components/Bookings/UserBookings"
import CreateBooking from "./components/CreateBooking/CreateBooking";
import BookingsForSpot from "./components/SpotBookings/BookingsBySpotId";
import { getSpotBookings } from "./store/bookings";
import EditBooking from "./components/EditBooking/EditBooking";
import EditBookingModal from "./components/EditBooking";
import { getUserReviews } from "./store/reviews";
import CurrentUsersSpots from "./components/CurrentUsersSpots";
import { getUserSpots } from "./store/spots";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);
  useEffect(() => {
    dispatch(SpotActions.getSpots())
      // dispatch(getSpotBookings())
      dispatch(getUserReviews())
      dispatch(getUserSpots())
  }, [dispatch])
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllSpots />
            {/* <CreateSpotForm /> */}
          </Route>
          <Route exact path='/spots/current'>
            <CurrentUsersSpots />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SingleSpot />
            
            {/* <EditSpot /> */}
          </Route>
          {/* <Route exact path='/spots/:spotId/edit'>
            <EditSpot />
          </Route> */}
          {/* <Route exact path='/spots/:spotId/reviews'>
            <ReviewsForSpot />
            <CreateReviewForm />
          
          </Route> */}
          {/* <Route exact path='/reviews/current'>
            <CurrentUsersReviews />
          </Route> */}
          <Route exact path='/reviews/current'>
            <CurrentUsersReviews />
          </Route>
          <Route exact path='/reviews/:reviewId'>
          
          <RemoveReview />
          </Route>
          <Route exact path='/bookings/current'>
            <UserBookings />
            
          </Route>
          {/* <Route exact path='/bookings/:bookingId'>
            <EditBookingModal />
          </Route> */}
          <Route exact path='/:spotId/bookings'>
            <CreateBooking />
          </Route>
          <Route exact path='/spots/:spotId/bookings'>
          <BookingsForSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;