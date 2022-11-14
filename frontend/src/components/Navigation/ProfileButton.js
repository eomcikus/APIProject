import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect, useHistory } from 'react-router-dom'
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
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
    return history.push('/spots')
    // return <Redirect to="/spots" />
  };

  return (
    <>
      <button onClick={openMenu} className='profile-button'>
     <i class="fa-solid fa-user"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <h3>Hello, {user.firstName}</h3>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button onClick={logout} className='logout-button'>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;