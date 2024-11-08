import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart, useDispatch } from './../components/CartProvider';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon not showing correctly
//shhsjsjj  
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Cart() {
  const navigate = useNavigate();
  const cartItems = useCart();
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(null);
  const mapRef = useRef();

  const handleRemoveAllItem = (id) => {
    dispatch({ type: 'REMOVE', id });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_SINGLE', id });
  };

  const handleAddItem = (id) => {
    dispatch({ type: 'ADD_SINGLE', id });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const readTotalPrice = () => {
    const totalPrice = getTotalPrice();
    const message = new SpeechSynthesisUtterance(`Total price is ${totalPrice} dollars`);
    message.lang = 'en-US';
    window.speechSynthesis.speak(message);
  };

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("email");
    const response = await fetch("http://localhost:8080/api/auth/addOrderedItems", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: cartItems,
        email: userEmail,
        order_date: new Date().toDateString(),
        delivery_address: address,
        delivery_position: position,
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }

    navigate('/orders');
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        // Reverse geocoding to get the address
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=77f29fefec364897960328f9006e1270`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setAddress(data.results[0].formatted);
        } else {
          alert('Unable to retrieve address');
        }
      }, (err) => {
        console.error(err);
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  }

  useEffect(() => {
    if (position && mapRef.current) {
      mapRef.current.flyTo(position, 13);
    }
  }, [position]);

  return (
    <div className="container mt-5">
      <h2 className="text-dark">Items in Cart</h2>
      <table className="table table-bordered">
        <thead className="bg-silver text-white">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-dark">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.qty}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-white me-2"
                    onClick={() => handleRemoveAllItem(item.id)}
                  >
                    Clear
                  </button>
                  <button
                    className="btn btn-white me-2"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    -1
                  </button>
                  <button
                    className="btn btn-white me-2"
                    onClick={() => handleAddItem(item.id)}
                  >
                    +1
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Currently no items in cart
                <Link to="/display" className="btn btn-white mt-3" style={{ backgroundColor: 'silver' }}>
                  Back
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {cartItems.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4 className="text-dark">Total: ${getTotalPrice().toFixed(2)}</h4>
          <Link to="/display" className="btn btn-white" style={{ backgroundColor: 'silver' }}>
            Back
          </Link>
          <button className="btn btn-white" style={{ backgroundColor: 'silver' }} onClick={handleCheckOut}>Place Order</button>
        </div>
      )}

      <div className="mt-5">
        <h3 className="text-dark">Delivery Address</h3>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Or select your address on the map:</label>
          <button className="btn btn-white me-2" style={{ backgroundColor: 'silver' }} onClick={handleLocateMe}>Locate Me</button>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }} ref={mapRef}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Cart;