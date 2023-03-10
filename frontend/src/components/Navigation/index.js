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
      <div className='profile-button-container'>
       <div className='search-bar-container'>
       <input type='text' placeholder="Search coming soon!" className='search-bar' disabled/>
        <i className="fa-solid fa-magnifying-glass-location" id='magnifying-glass'/></div>
       {/* <h1 id='header'>Book the Stay of Your Dreams!</h1>  */}
      <CreateSpotModal className='become-host-button' />
      <ProfileButton  user={sessionUser} />
      </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
      <div className='loggedout-header-cont'>
      {/* <h1 id='header-logout'>Book the Stay of Your Dreams!</h1>  */}
      <input>Search</input>
       <div className='loggedout-button-container'> <LoginFormModal />
        <SignupFormModal /> </div>
        </div>
      </>
    );
  }

  return (
    <div className='topnav-container'>

          <div>
            <NavLink exact to="/"><img src={logo}/></NavLink>
          </div>
          <div>
          {isLoaded && sessionLinks}
          </div>

    </div>
  );
}

export default Navigation;