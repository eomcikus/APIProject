import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotModal from '../CreateSpotModal'
import './Navigation.css';
import logo from '../../images/erbnb.png'
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <CreateSpotModal className='become-host-button' />
      <ProfileButton className='profile-button' user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='topnav-container'>

          <div>
            <NavLink exact to="/spots"><img src={logo}/></NavLink>
          </div>
          <div>
          {isLoaded && sessionLinks}
          </div>

    </div>
  );
}

export default Navigation;