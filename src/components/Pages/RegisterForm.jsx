import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";

import authServices from "../../auth/authServices";
import { useAuth } from "../../auth/AuthContext";

import "../CSS/RegisterForm.css";
import RandomImg from "../Common/RandomImg";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username: username,
      email: email,
      password,
    };

    await authServices.register(user);
    checkAuthStatus();
    navigate("/");
  };

  return (
    <div
      id="main_containerReg"
      className="Auth-form-container "
    >
      <Link
        id="titleCloseBtn"
        to="/"
      >
        <i className="fa-solid fa-times"></i>
      </Link>
      {/* left side */}
      <div id="leftSideReg">
        <RandomImg></RandomImg>
      </div>

      {/* right side */}

      <div id="rightSideReg">
        {/* logo */}
        <Link
          id="BrandLogoReg"
          to="/"
        >
          <img
            src="https://drive.google.com/uc?export=view&id=14QOjF7QZE5gxW9upTRpR6bju_jIpqgPQ"
            alt="logo"
          />
        </Link>

        <div id="regForma">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center h1 fw-bold">Join us!</h3>

            <div className="d-flex flex-row align-items-center mb-2 inputs-div ">
              <MDBInput
                placeholder="Your Username"
                label="Username"
                id="form1"
                type="text"
                className="w-100"
                required // add this attribute
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-2 inputs-div">
              <MDBInput
                placeholder="Your Email"
                label="Email"
                id="form2"
                type="email"
                required // add this attribute to make the field mandatory
                // validate // add this attribute to enable email validation
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="d-flex flex-row align-items-center mb-2 inputs-div">
              <MDBInput
                placeholder="Password"
                label="Password"
                id="form3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex flex-row align-items-center mb-2 inputs-div">
              <MDBInput
                label="Confirm Password"
                placeholder="Passoword confirmation"
                id="form4"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="mb-2 btn register-btn"
              size="lg"
            >
              Register Now!
            </button>
            <h3>OR</h3>

            <Link
              className="mb-2 btn login-instead-btn inputs-div inputs-div"
              size="lg"
              to="/login"
            >
              Log-In Instead
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;
