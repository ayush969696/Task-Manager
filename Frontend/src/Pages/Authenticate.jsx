import React from 'react'
import { useState } from 'react';
import Login from '../component/Auth/Login';
import Register from '../component/Auth/Register';

function Authenticate() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-center mb-4">
            <button
              className={`btn btn-lg btn-block rounded-0 border-2 border-success ${showLogin ? 'bg-success text-white' : 'btn-outline-success text-success'}`}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className={`btn btn-lg btn-block rounded-0 border-2 border-success ${!showLogin ? 'bg-success text-white' : 'btn-outline-success text-success'}`}
              onClick={() => setShowLogin(false)}
            >
              Sign Up
            </button>
          </div>
          <div className="px-4">
            {showLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticate
