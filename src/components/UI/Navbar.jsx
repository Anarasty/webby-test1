// import React from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../redux/authSlice";
// // import "./Navbar.css";

// const Navbar = () => {
//   const dispatch = useDispatch();
// //   const userName = useSelector((state) => state.auth.name) || "Anonymous";

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">🎬 Movie Storage</div>

//       <div className="user-info">
//         {/* <span className="username">👤 {userName}</span> */}
//         <button className="logout-btn" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand">🎬 Movie Storage</span>
      <div className="ms-auto">
        <button className="btn btn-outline-light" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;