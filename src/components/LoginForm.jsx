import "./LoginForm.css";
import { NavLink, Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import React, { useState } from "react";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if required fields are filled
    if (email === "" || password === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Submit form
    // ...
  };

  return (
    <div className="Auth-form-container" style={{ fontFamily: "Alkatra, cursive" }}>
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
          <div>
            <p>Don't have an account yet?</p>
            <NavLink to="/register">
              <button className="btn btn-dark" type="button">Register</button>
            </NavLink>
            <Routes>
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
