import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as SpotActions from "./store/spots"
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SingleSpot from "./components/SingleSpot";
import CreateSpotForm from "./components/CreateSpot";
import DeleteSpot from "./components/DeleteSpot";
import EditSpot from "./components/EditSpot";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  useEffect(() => {
    dispatch(SpotActions.getSpots())
  }, [dispatch])
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/spots">
            <AllSpots />
            <CreateSpotForm />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SingleSpot />
            <DeleteSpot />
            {/* <EditSpot /> */}
          </Route>
          {/* <Route path='/spots/:spotId/edit'>
            <EditSpot />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;