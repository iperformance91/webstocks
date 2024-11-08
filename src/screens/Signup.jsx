import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("http://localhost:5000/api/createuser", {
        const response = await fetch("http://localhost:8080/api/auth/register", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log(json);

      if(!json.email){
        alert("Enter valid credentials")
      }else{
        navigate("/login")

        const message = new SpeechSynthesisUtterance('registered successfully');
  // message.lang = 'en-GB'; // For accent
   message.lang = 'en-ZA'; 
  window.speechSynthesis.speak(message);
      }
    } catch (error) {
      console.error("Error:", error);
      
      // Handle network or other errors
    }
  };

  const changeHandler = (e) => {
    console.log("State changed");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
  };

  return (
    <>
    <Navbar/>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={changeHandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              value={credentials.name}
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
            Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              name="address"
              value={credentials.address}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-3">
        <label htmlFor="exampleInputPhone" className="form-label">
          Phone Number
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPhone"
          name="phone"
          value={credentials.phone}
          onChange={changeHandler}
        />
      </div>


          <div className="mb-3">
            <label htmlFor="exampleInputLocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLocation"
              name="location"
              value={credentials.location}
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
