import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({ credential: 'FakeUser4' , password: 'password5' }))
    return 
  }
  return (
    <form onSubmit={handleSubmit} className='login-modal'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        {/* Username or Email */}
        <input
          type="text"
          placeholder='Username or Email'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className='login-modal-inputs'
        />
      </label>
     
      <label>
        {/* Password */}
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='login-modal-inputs'
        />
      </label>
      <button type="submit" className='login-button'>Log In</button>
      <button type="submit" onClick={handleDemo} className='demo-user'>Demo User</button>
    </form>
  );
}

export default LoginForm;
