import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../Hooks/useLogin';
import loginIcon from '../imgs/login.jpg';
import { user } from '../Reducer';

export default function Signup() {
  const [name, setName] = useState('');
  const [association, setAssociation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
  const { login, isLoading, error } = useLogin('/signup');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ name, password, association, email });
    if (user().login !== null) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full font-sans overflow-hidden bg-gray-100">
      <div className="lg:w-1/2 relative">
        <img src={loginIcon} alt="Signup Background" className="w-full h-full object-cover absolute top-0 left-0" />
      </div>
      <div className="flex items-center  justify-center lg:w-1/2 w-full p-8 lg:p-16 bg-white">
        <form
          className="bg-white  lg:p-12 rounded-lg shadow-xl w-full max-w-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-extrabold mb-6 text-center text-green-600">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-lg mb-2 text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-1 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2 text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-1 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2 text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full p-1 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
              title="The password must be strong, containing uppercase characters, numbers, and special characters, with a minimum length of 8 characters."
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2 text-gray-700" htmlFor="Cpassword">Confirm Password</label>
            <input
              type="password"
              id="Cpassword"
              onChange={(e) => setCPassword(e.target.value)}
              value={Cpassword}
              className="w-full p-1 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
              title="The password must be strong, containing uppercase characters, numbers, and special characters, with a minimum length of 8 characters."
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2 text-gray-700" htmlFor="association">Association</label>
            <input
              type="text"
              id="association"
              onChange={(e) => setAssociation(e.target.value)}
              value={association}
              className="w-full p-1 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
            />
          </div>
          <p className="text-md mt-4 text-gray-700">
            Already have an account? <Link className="font-bold text-green-600 hover:underline" to="/login">Log in</Link>.
          </p>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {isLoading && <div className="w-8 h-8 border-4 border-t-green-600 border-green-300 rounded-full animate-spin mt-4 mx-auto"></div>}
          <button
            id="submit-signup"
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-1 px-2 mt-5 w-full transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
      <Link to="/" className="absolute left-4 top-4 p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200">Back</Link>
    </div>
  );
}
