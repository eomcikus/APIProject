

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage({setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({firstName, lastName, email, username, userPhoto, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };
  const cancel =  async (e) => {
    setShowModal(false)
}
  return (
    <form onSubmit={handleSubmit} className="signup-modal">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="text"
          value={firstName}
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        <input 
        type='text'
        placeholder='URL for user picture'
        value={userPhoto}
        onChange={(e) => setUserPhoto(e.target.value)}
        required />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className='signup-submit'>Sign Up</button>
      <button type="button"
                    onClick={cancel}
                    className='signup-cancel'>Cancel</button>
    </form>
  );
}

export default SignupFormPage;