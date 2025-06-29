import React from 'react';
import { useSelector } from 'react-redux';
import DisplayMovie from './components/DisplayMovie';
import AuthForm from './components/AuthForm';
import Navbar from './components/UI/Navbar';

function App() {
  const token = useSelector(state => state.auth.token);

  return (
    <div className="bg-light min-vh-100">
      {token && <Navbar />}

      <div className="container py-5 text-center">
        {!token ? (
          <div className="d-flex justify-content-center">
            <AuthForm />
          </div>
        ) : (
          <>
            <DisplayMovie />
          </>
        )}
      </div>
    </div>
  );
}

export default App;