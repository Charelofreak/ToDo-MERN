import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../Hooks/useLogin';
import { useUser } from '../UserContext';
import loginIcon from '../imgs/login.jpg';
import { user } from '../Reducer';
export default function Login() {
  const [data, dispatch] = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin('/login');
  const loginto = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    if (user().login !== null) {
      window.location.reload();
    }
  };

  return (
    <div className='login-container flex h-screen w-full'>
      <div className="bg order-2 h-full absolute lg:relative lg:-z-10 w-full blur-md lg:blur-none lg:w-3/5 object-cover">
        <img className='w-full h-full' src={loginIcon} alt="Login Background" />
      </div>
      <div className='h-full bg-white bg-opacity-70 lg:bg-opacity-100 border-r border-green-600 grid place-content-center w-full lg:w-2/5 p-8'>
        <form
          className='login-form p-8 rounded-lg bg-white shadow-lg lg:bg-transparent lg:p-8 z-10 w-full max-w-md mx-auto'
          onSubmit={handleSubmit}
        >
          <h2 className='font-bold text-4xl mb-10 text-center uppercase text-green-700'>Log In</h2>
          <label className='block text-lg mb-2' htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200'
          />
          <label className='block text-lg mt-4 mb-2' htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200'
            title='The password must be strong, containing uppercase characters, numbers, and special characters, with a minimum length of 8 characters.'
          />
          <p className='text-md mt-4'>Don't have an account? <Link className='font-bold text-green-600' to='/signup'>Sign up</Link>.</p>
          {isLoading && <div className='w-8 h-8 border-4 border-t-green-600 border-green-300 rounded-full animate-spin mt-4 mx-auto'></div>}
          {error && <div className='text-red-500 mt-4'>{error}</div>}
          <button
            id='submit-login'
            className='bg-green-500 hover:bg-green-600 text-white rounded-lg p-3 mt-5 w-full transition duration-200'
          >
            Login
          </button>
        </form>
      </div>
      <Link to='/' className='absolute left-4 top-4 p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200'>Back</Link>
    </div>
  );
}
