// import React from 'react';
// import { useSelector } from 'react-redux';
// import DisplayMovie from './components/DisplayMovie';
// import ImportMovie from './components/ImportMovie';
// import AuthForm from './components/AuthForm';
// // import './App.css';
// import Navbar from './components/UI/Navbar';

// function App() {
//   const token = useSelector(state => state.auth.token);

//   return (
//     <div>
//       {token && <Navbar />}
//       <h1 className="header__main">Movie Storage</h1>
//       {!token ? (
//         <AuthForm />
//       ) : (
//         <>
//           <ImportMovie />
//           <DisplayMovie />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { useSelector } from 'react-redux';
import DisplayMovie from './components/DisplayMovie';
import ImportMovie from './components/ImportMovie';
import AuthForm from './components/AuthForm';
import Navbar from './components/UI/Navbar';

function App() {
  const token = useSelector(state => state.auth.token);

  return (
    <div className="bg-light min-vh-100">
      {token && <Navbar />}

      <div className="container py-5 text-center">
        {/* <h1 className="mb-5">Movie DB</h1> */}

        {!token ? (
          <div className="d-flex justify-content-center">
            <AuthForm />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <ImportMovie />
            </div>
            <DisplayMovie />
          </>
        )}
      </div>
    </div>
  );
}

export default App;