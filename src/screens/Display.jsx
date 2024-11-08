import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const CarSection = () => {
  const userEmail = localStorage.getItem("email");
  return (
    <section className="vh-100 gradient-custom">
      <div className="container-fluid">
        <div> <h1 style={{ color: 'black', marginTop: "0px" }}><marquee>Stocker</marquee></h1>
        </div>
        {userEmail && (  // Conditionally render the email div
          <div style={{ color: 'black', textAlign: 'center', marginTop: '20px' }}>
            Welcome, {userEmail}
          </div>
        )}
        <div className="row justify-content-center align-items-center">

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-5">
            <h1 className="text-center" style={{ color: 'white' }}>
              <Link to={{ pathname: "/microsoft", search: "?product=ACER&subProduct=NITROGAMING" }}>
                <img
                  src="https://bugatti-storage.s3.eu-central-1.amazonaws.com/media/catalog/product/j/8/j8.jpg"
                  style={{ maxWidth: '400px', maxHeight: '400px', marginBottom: '90px', marginTop: "35px" }}
                  alt="Porsche"
                />
              </Link>
              <p style={{ marginTop: '20px', color: 'black', marginTop: "-70px", fontStyle: "italic" }}>ACER</p>
            </h1>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-5">
            <h1 className="text-center" style={{ color: 'white' }}>
              <Link to={{ pathname: "/microsoft", search: "?product=DELL&subProduct=NVIDIAGAMING" }}>
                <img
                  src="https://bugatti-storage.s3.eu-central-1.amazonaws.com/media/catalog/product/j/8/j8.jpg"
                  style={{ maxWidth: '400px', maxHeight: '400px', marginBottom: '90px', marginTop: "35px" }}
                  alt="Porsche"
                />
              </Link>
              <p style={{ marginTop: '20px', color: 'black', marginTop: "-70px", fontStyle: "italic" }}>DELL</p>
            </h1>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-5">
            <h1 className="text-center" style={{ color: 'white' }}>
              <Link to={{ pathname: "/microsoft", search: "?product=ASUS&subProduct=ROGGAMING" }}>
                <img
                  src="https://bugatti-storage.s3.eu-central-1.amazonaws.com/media/catalog/product/j/8/j8.jpg"
                  style={{ maxWidth: '400px', maxHeight: '400px', marginBottom: '90px', marginTop: "35px" }}
                  alt="Porsche"
                />
              </Link>
              <p style={{ marginTop: '20px', color: 'black', marginTop: "-70px", fontStyle: "italic" }}>ASUS</p>
            </h1>
          </div>

          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-5">
                <h1 className="text-center" style={{ color: 'white' }}>
               <Link to={{ pathname: "/microsoft", search: "?product=ACER&subProduct=n" }}>
                 <img
                       src="https://bugatti-storage.s3.eu-central-1.amazonaws.com/media/catalog/product/j/8/j8.jpg"
                     style={{ maxWidth: '400px', maxHeight: '400px', marginBottom: '90px', marginTop:"35px" }}
                  alt="Porsche"
                 />
                   </Link>
                   <p style={{ marginTop: '20px', color: 'black', marginTop: "-70px", fontStyle: "italic" }}>ACER</p>
                    </h1>
              </div> */}
        </div>
      </div>
    </section>
  );
};

export default CarSection;
