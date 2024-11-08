import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // const response = await fetch("http://localhost:5000/api/loginuser", {
      const response = await fetch("http://localhost:8080/api/auth/login", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log("The json value", json);

      if (json.email) {
        localStorage.setItem("email", credentials.email)
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage)
        setUserEmail(json.email);  // Update user email state
        const message = new SpeechSynthesisUtterance('Welcome');
        // message.lang = 'en-GB'; // For accent
        message.lang = 'en-ZA';
        window.speechSynthesis.speak(message);
        navigate("/display")
        console.log("login successful");
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
      <Navbar />
      {/* <div class="card" style={{width: '100%', height: "100vh",backgroundImage: 'url("https://www.vdm.ford.com/content/dam/brand_ford/en_us/brand/performance/gt/gallery/video_thumbs/video_960x570.jpg/jcr:content/renditions/cq5dam.web.1440.1440.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
      <div class="card" style={{ width: '100%', height: "100vh", marginTop: "-20px", backgroundImage: 'url("https://bugatti-storage.s3.eu-central-1.amazonaws.com/media/catalog/product/j/8/j8.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div> <h1 style={{ color: 'white', marginTop: "10px" }}><marquee>Stocker</marquee></h1>
        </div>
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card-body p-2 text-center" style={{ marginTop: "-80px" }}>
              <h1 class="fw mb-2 text-uppercase" style={{ color: "white" }}> LOGIN</h1>
              <div class="form-outline form-white mb-4">
                <form onSubmit={handleSubmit}>
                  <div class="card-body" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }}>
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
                    <div id="emailHelp" className="form-text" style={{ color: "white" }}>

                    </div>
                  </div>
                  <div class="card-body" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }}>
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
                    {/* </div> */}
                    {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            {<label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label> }
          </div> */}
                    <button type="submit" className="btn btn-dark" style={{ marginTop: "20px" }} >
                      Submit
                    </button>
                    {/* <Link to="/signup" className="m-3 btn btn-danger">
            New User ? 
          </Link> */}
                    <div className="gradient">
                      <p className="mb-0" style={{ color: 'white', marginTop: "20px" }}>
                        Don't have an account?
                        <a href="/signup" style={{ color: 'white', fontWeight: 'bold', marginLeft: '10px' }}>
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
        {userEmail && (  // Conditionally render the email div
          <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
            Logged in as: {userEmail}
          </div>
        )}
      </div>
    </>
  )
}

export default Login
