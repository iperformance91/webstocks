import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-15 d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <svg className="bi" width="30" height="24"></svg>
        </Link>
        <div className="container-fluid">
          <div className="row">
            <div className="col text-center">
              <span className="text-muted d-inline-block overflow-hidden">
                Disclaimer. Stocker is maintained by GenX and exclusively designed for GenX clients. The use of this facility is strictly subjected to the terms and conditions of Brand Agreements including confidentiality. Stocker ® 2024 All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
