import { useEffect, useState } from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { BorderLeft } from "@mui/icons-material";

function Microsoft() {
  // const userEmail = localStorage.getItem("email");
  // const product = "ACER";
  // const subProduct = "k";
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product = queryParams.get("product") || "defaultProduct";
  const subProduct = queryParams.get("subProduct") || "defaultSubProduct";
  const userEmail = localStorage.getItem("email");

  console.log(" the Product", product)
  console.log("the subProduct", subProduct)

  const [foodItems, setFoodItems] = useState([]);
  const loadData = async () => {
    // let resp = await fetch("http://localhost:5000/api/displayFood", {
    // let resp = await fetch("http://localhost:8080/api/auth/displayProducts", {
    // let resp = await fetch(`http://localhost:8080/api/auth/displayProductsByProductAndSubProduct?product=${product, subProduct}`, {
    // let resp = await fetch(`http://localhost:8080/api/auth/displayProductsByProductAndSubProduct?product=${product}&subProduct=${subProduct}`, {
    let resp = await fetch(`http://localhost:8080/api/auth/displayProductsByProduct?product=${product}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });


      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    resp = await resp.json();
    await setFoodItems(resp["products"]);
    console.log(resp);
  };

  //   resp = await resp.json();
  //   setFoodItems(resp.products);  
  //   console.log(resp);
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  useEffect(() => {
    loadData();
  }, [product, subProduct]);

  return (
    <div>
      <div>
        {/* <div> */}
        <div>
          <Navbar />
        </div>
        {/* <h1 style={{ color: 'white', backgroundColor: 'black', height: '50vh',border: "5px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <marquee>I'm Stocker from Miami, Florida</marquee>
    </h1> */}
        <div style={{ backgroundColor: "black" }}>
          <Carousel />
          {/* </div> */}
          <div >
            <div className="container" style={{ backgroundColor: "black", width: "100%" }}>
              {userEmail && (  // Conditionally render the email div
                <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
                  Welcome, {userEmail}

                  <Link to="/display" className="btn btn-white mt-3" style={{ backgroundColor: 'black', marginLeft: "70px", marginTop: '20px' }}>
                    {/* Back */}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8f9-FvHhuyfVOPI43M4iDRv8dOdLjTBEcgmWi9o24SAcgtM1UsABBifJEFSPAYKK-fz0&usqp=CAU" alt="Back" style={{ width: '50px', marginRight: '7px' }} />
                  </Link>
                </div>


              )}

              <div className="row" style={{ backgroundColor: "black", width: "100%" }}>

                {foodItems
                  ? foodItems.map((data) => (
                    <div className="col-12 col-md-6 col-lg-3" key={data.id}>
                      {
                        // console.log(data.price)
                      }
                      <Card
                        foodid={data.id}
                        name={data.name}
                        img={data.img}
                        category={data.CategoryName}
                        price={data.price}
                        description={data.description}
                        options={data.options[0]}

                      />
                    </div>
                  ))
                  : ""}
              </div>

              <div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Microsoft;