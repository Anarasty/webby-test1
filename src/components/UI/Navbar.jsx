import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
// import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
//   const userName = useSelector((state) => state.auth.name) || "Anonymous";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="logo">🎬 Movie Storage</div>

      <div className="user-info">
        {/* <span className="username">👤 {userName}</span> */}
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;