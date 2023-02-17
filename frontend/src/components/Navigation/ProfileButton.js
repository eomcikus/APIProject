import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect, useHistory, NavLink } from 'react-router-dom'
import './Navigation.css'
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  // console.log('user', sessionUser)
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/')
    // return <Redirect to="/spots" />
  };

  return (
    <>
      <button onClick={openMenu} className='profile-button'>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && sessionUser && (
        <div className="profile-dropdown">
          <h3 className='prof-greeting'>   Hello, {user.firstName}</h3>
          <div className='userName'>   {user.username}</div>
          <div className='prof-email'>   {user.email}</div>
          <div className='your-bookings'><NavLink className='your-bookings' to={'/bookings/current'}>My Bookings</NavLink> </div>
          <div className='your-reviews'><NavLink className='your-reviews' to={'/reviews/current'}> My Reviews</NavLink></div>
          <div className='your-spots'><NavLink className='your-spots' to={'/spots/current'}> My Spots</NavLink></div>
          <div>
            <button onClick={logout} className='logout-button'>Log Out</button>
          </div>
        </div>
      )}
      {/* {showMenu && !sessionUser && (
        <div className='profile-dropdown'>
          <SignupFormModal />
          <LoginFormModal />
        </div> */}
      {/* )} */}
    </>
  );
}

export default ProfileButton;