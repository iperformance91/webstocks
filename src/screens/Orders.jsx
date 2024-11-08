import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrdersData] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  // const fetchMyOrder = async () => {
    // await fetch("http://localhost:5000/api/getOrderedItems", {
  //   await fetch("http://localhost:8080/api/auth/getOrderedItems", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: localStorage.getItem('email')
  //     })
  //   }).then(async (res) => {
  //     let response = await res.json();
  //     setOrdersData(response.orders[0].order_data);
  //     calculateTotal(response.orders[0].order_data);
  //   });
  // };

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      console.error('User email not found in localStorage');
      return;
    }

    console.log(userEmail, "emaill getting")
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/getOrderedItems", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
  
      const responseData = await response.json();
      if (responseData && responseData.length > 0) {
        setOrdersData(responseData[0].order_data); // Assuming responseData structure matches your backend response
        calculateTotal(responseData[0].order_data);
      } else {
        console.log('No orders found for the user');
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      // Handle error state or display an error message to the user
    }
  };
  

  const calculateTotal = (orderData) => {
    let total = 0;
    orderData.forEach(order => {
      order.forEach((item, index) => {
        if (index !== 0) {
          total += item.price;
        }
      });
    });
    console.log("orderr dataa"+orderData);
    setTotalSpent(total);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
   <Navbar/>
    <div className="container mt-4">
      <h2 className="mb-4">Your Order Details</h2>
      <table className="table">
        <thead>
          <tr >
            <th className="text-success">Order Date</th>
            <th className="text-success">Item Name</th>
            <th className="text-success">Quantity</th>
            <th className="text-success">Size</th>
            <th className="text-success">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order, orderIndex) => (
            <React.Fragment key={orderIndex}>
              {order.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td className="text-warning">{itemIndex === 0 ? item.Order_date : ''}</td>
                  {itemIndex !== 0 && (
                    <>
                      <td className="text-primary">{item.name}</td>
                      <td className="text-primary">{item.qty}</td>
                      <td className="text-primary">{item.size}</td>
                      <td className="text-primary">{item.price}</td>
                    </>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="alert alert-info d-flex align-items-center justify-content-around">
        <h4>Total Amount Spent: ₹{totalSpent}</h4>
        <Link to="/cart" className="btn btn-success">Back to Cart</Link>
      </div>
    </div>
    </>
  );
}

export default Orders;
