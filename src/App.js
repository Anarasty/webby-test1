import React from 'react';
import { useSelector } from 'react-redux';
import DisplayMovie from './components/DisplayMovie';
import ImportMovie from './components/ImportMovie';
import AuthForm from './components/AuthForm';
import './App.css';
import Navbar from './components/UI/Navbar';

function App() {
  const token = useSelector(state => state.auth.token);

  return (
    <div style={{ padding: 20 }}>
      {token && <Navbar />}
      <h1 className="header__main">Movie Storage</h1>
      {!token ? (
        <AuthForm />
      ) : (
        <>
          <ImportMovie />
          <DisplayMovie />
        </>
      )}
    </div>
  );
}

export default App;