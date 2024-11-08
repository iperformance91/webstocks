import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart, useDispatch } from './CartProvider';

function Card({ foodid, name, img, category,price, description, options }) {
  
  // console.log("The price is", price)
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(Object.keys(options)[0]);
  const [showIndicator, setShowIndicator] = useState(false);
  let dispatch = useDispatch();
  let data = useCart()  

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  

  price = price.replace(/\$/g, '');
  const totalPrice = quantity * Number(price);

  const costOfSingleItem = Number(price);

  console.log("cost here",costOfSingleItem);

  useEffect(() => {
    localStorage.setItem('costOfSingleItem', costOfSingleItem);
  }, [costOfSingleItem]);
  
  // console.log("The quantity is" , options[selectedOption])
  // console.log("The total price is " , totalPrice);
  // console.log("The total price is " , totalPrice);
  const handleAddCart = async () => {
    // console.log("came here")
    await dispatch({ type: "ADD", price: totalPrice, id: foodid, name: name, category: category, size: selectedOption, qty: quantity});
    // console.log(data)
     // Voice indication
  // const message = new SpeechSynthesisUtterance(`${name} placed in the cart`);
  const message = new SpeechSynthesisUtterance(`placed ${name}`);
  // message.lang = 'en-GB'; // For accent
   message.lang = 'en-ZA'; 
  window.speechSynthesis.speak(message);
// Show text indication
setShowIndicator(true);
setTimeout(() => {
  setShowIndicator(false);
}, 600);

  };

    // Update local storage
    localStorage.setItem('cart', JSON.stringify(data));
  

  const itemInCart = data.find(item => item.id === foodid && item.size === selectedOption);


  return (
    <div className="card mt-3" style={{ width: '18rem', overflow: 'hidden', marginLeft:'-30px'}}>
      <img src={img} className="card-img-top" alt={name} style={{ height: '300px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text" style={{ flex: '1', textOverflow: 'ellipsis' }}>
          {description}
        </p>
        <div className="mt-auto w-100">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <select className="form-select bg-white text-black" style={{ width: '27%' }} value={quantity} onChange={handleQuantityChange}>
              {Array.from(Array(4), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option> 
              ))}
            </select>
            {/* <select className="form-select bg-dark text-white" style={{ width: '45%' }} value={selectedOption} onChange={handleOptionChange}>
              {Object.entries(options).map(([key, value]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select> */}
          </div>
          <div className="d-flex justify-content-center fs-5">
            {/* Total Price: ${totalPrice} */}
            Total Price: ${price}
          </div>
          <div className="d-flex justify-content-center mt-3">
            {/* <button className="btn btn-primary" onClick={handleAddCart}>
            {itemInCart ? 'Add more qty of same or different Size' : 'Add to Cart'}
            </button> */}
            <button className="btn btn-dark" onClick={handleAddCart}>
            {'Add to Cart'}
            </button>
            {showIndicator && <div className="text-indicator" style={{color: "black", marginLeft: "11px"}}>Item added to cart</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
