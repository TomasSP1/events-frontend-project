import React, { useState } from "react";
import { NavLink, Link, Route, Routes, useNavigate } from "react-router-dom";

import RegisterForm from "./RegisterForm";

import authServices from "../../auth/authServices";
import { useAuth } from "../../auth/AuthContext";
import RandomImg from "../Common/RandomImg";
import "../CSS/LoginForm.css";

function RLModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (email === "" || password === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // Submit form
    const user = {
      email: email,
      password: password,
    };

    try {
    await authServices.login(user);
    checkAuthStatus();
    navigate("/");
    }catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div
        id="main_containerLogin"
        className="Auth-form-container"
      >
        {/* left side */}
        <div className="login-left">
          <RandomImg></RandomImg>
        </div>

        {/* right side */}
        <div className="login-right">
          {/* logo */}
          <Link
            id="BrandLogoLogin"
            to="/"
          >
            <img
              src="https://drive.google.com/uc?export=view&id=14QOjF7QZE5gxW9upTRpR6bju_jIpqgPQ"
              alt=""
              width="100%"
              height="100%"
            />
          </Link>

          <Link
            id="titleCloseBtn"
            to="/"
          >
            <i className="fa-solid fa-times"></i>
          </Link>

          <form
            className="RLform Auth-form"
            onSubmit={handleSubmit}
          >
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Hello Again!</h3>
              <div className="form-group mt-3">
                <input
                  // type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  id="loginBtn"
                  type="submit"
                  className="btn btn-dark"
                >
                  Login!
                </button>
              </div>

              <div>
                <h3>OR</h3>
                <NavLink to="/register">
                  <button
                    id="registerBtn"
                    className="btn btn-dark"
                  >
                    Register Instead
                  </button>
                </NavLink>
                <Routes>
                  <Route
                    path="/register"
                    element={<RegisterForm />}
                  />
                </Routes>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RLModal;
