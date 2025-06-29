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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-light"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <div className="d-grid gap-2 mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>

          <button
            type="button"
            onClick={() => dispatch(toggleMode())}
            className="btn btn-outline-secondary"
          >
            {isLogin ? "Need an account?" : "Already have an account?"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AuthForm;
