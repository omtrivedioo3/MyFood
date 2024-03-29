import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar({ user, setLoginUser }) {
  const [cartView, setCartView] = useState(false)
  let data = useCart();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // setLoginUser(!user)
    navigate("/login")
  }
  console.log({ user })
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">MyFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                {/* {user} */}

              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                </li>
                : ""}
            </ul>

            {!(user) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                  My Cart{" "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>

                {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : ""}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}
