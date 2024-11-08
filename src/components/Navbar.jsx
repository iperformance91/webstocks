/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/icons-material/Label';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './CartProvider';


export default function Navbar(props) {


    let navigate = useNavigate();
    const userEmail = localStorage.getItem("email");
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        // const message = new SpeechSynthesisUtterance('logged out');
        // message.lang = 'en-GB'; // For accent
        //  message.lang = 'en-ZA'; 
        // window.speechSynthesis.speak(message);
        navigate("/login")
    }


    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black position-sticky"
                style={{ backgroundColor: "black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    {/* {userEmail && (  // Conditionally render the email div
                    <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
                        Logged in as: {userEmail}
                    </div>
                )} */}
                    <Link className="navbar-brand fs-1 fst-italic" to="/login">Stocker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link> 
                            </li> */}
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>

                                <div className="btn bg-white text-success mx-2">
                                    <Link to="/cart" className='text-success'>
                                        Cart
                                    </Link>
                                </div>



                                <button onClick={handleLogout} className="btn bg-white text-success" >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}