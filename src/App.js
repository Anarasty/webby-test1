// import React from 'react';
// import AddMovie from './components/AddMovie';
// import DisplayMovie from './components/DisplayMovie';
// import ImportMovie from './components/ImportMovie';

// function App() {
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Movie Storage</h1>
//       <AddMovie />
//       <ImportMovie />
//       <DisplayMovie />
//     </div>
//   );
// }

// export default App;

//! import React from 'react';
// import { useSelector } from 'react-redux';
// import AddMovie from './components/AddMovie';
// import DisplayMovie from './components/DisplayMovie';
// import ImportMovie from './components/ImportMovie';
// import AuthForm from './components/AuthForm'; // не забудь импортнуть
// import './App.css'

// function App() {
//   const token = useSelector(state => state.auth.token);

//   if (!token) {
//     return (
//       <div style={{ padding: 20 }}>
//         <h1>Movie Storage</h1>
//         <AuthForm />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Movie Storage</h1>
//       <AddMovie />
//       <ImportMovie />
//       <DisplayMovie />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { useSelector } from 'react-redux';
import DisplayMovie from './components/DisplayMovie';
import ImportMovie from './components/ImportMovie';
import AuthForm from './components/AuthForm';
import './App.css';
import Navbar from './components/Navbar';

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