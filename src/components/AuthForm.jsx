import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, toggleMode } from "../redux/authSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error, mode } = useSelector((state) => state.auth);
  const isLogin = mode === "login";

  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // только при регистрации
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // регистрация

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = isLogin
      ? { email, password }
      : { email, password, confirmPassword, name };

    dispatch(isLogin ? loginUser(data) : registerUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {/*! {error && <p className="error">{error}</p>} */}

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>

        <button
          type="button"
          onClick={() => dispatch(toggleMode())}
          className="switch-btn"
        >
          {isLogin ? "Need an account?" : "Already have an account?"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AuthForm;
