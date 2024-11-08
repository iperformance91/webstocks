import { useEffect, useState } from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  const userEmail = localStorage.getItem("email");
  const [foodItems, setFoodItems] = useState([]);
  const loadData = async () => {
    // let resp = await fetch("http://localhost:5000/api/displayFood", {
    let resp = await fetch("http://localhost:8080/api/auth/displayProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    resp = await resp.json();
    await setFoodItems(resp["products"]);
    console.log(resp);
  };

  useEffect(() => {
    loadData();
  }, []);

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

export default Home;
