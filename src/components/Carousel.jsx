function Carousel() {
    return (
<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"container !important"}}>
  <div className="carousel-inner" id="carousel">
    {/* <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/600x600/?burger" className="d-block w-100" alt="..."/>
    </div>   */}
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/600x600/?pizza" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/600x600/?cake" className="d-block w-100" alt="..."/>
    </div>
  </div>
  {/* <div className="carousel-caption d-none d-md-block"> */}
  {/* <form className="d-flex">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form> */}
  {/* </div> */}
  {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button> */}
  {/* <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button> */}
</div>
    )
}

export default Carousel
