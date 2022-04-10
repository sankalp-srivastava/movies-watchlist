import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (

      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
          <Link to='/' className="navbar-brand"style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
              Movies Watchlist
              </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className=" nav-item">
                  <Link to='/' className="nav-link active" style={{ textDecoration: 'none' , color: 'white'}} >
                    Home
                  </Link>
                </li>
                <li className=" nav-item">
                  <Link to='/favourites' className="nav-link active" style={{ textDecoration: 'none' , color: 'white'}}>
                    My Favourites
                  </Link>
                </li>
                <li className="nav-item">
                <Link to='/about' className="nav-link active" style={{ textDecoration: 'none' , color: 'white'}}>
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
  }
}
