import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../Nav.css"

function NavBar() {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    // check if user is logged in
    const isAuth = localStorage.getItem("isAuth") === "true";

    const handlaccount = () => {
        setActive(!active);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuth");
        navigate("/login");
    }

    return (
        <nav>
        <div className='NavBar'>
          <h1>ExpenseFlow</h1>

          <ul className='feauter'>
            <li>
              <Link to="/dashboard">
                <span className="material-symbols-rounded">home</span>
              </Link>
            </li>
            <li>
              <Link to="/expense">
                <span className="material-symbols-rounded">add_circle</span>
              </Link>
            </li>
            <li>
              <span className="material-symbols-rounded">menu</span>
            </li>
            <li>
              <span className="material-symbols-rounded">android_cell_dual_4_bar</span>
            </li>
          </ul>

          <ul className='about_account'>
            <li>
              <span className="material-symbols-rounded">notifications</span>
            </li>
            <li onClick={handlaccount}>
              <span className="material-symbols-rounded">account_circle</span>
              <label style={{ display: active ? "flex" : "none" }} htmlFor="">
                <ul className='account_prop'>
                  <li>setting</li>
                  <hr />
                  <li>
                    {isAuth
                      ? <span onClick={handleLogout} style={{ cursor: "pointer" }}>LogOut</span>
                      : <Link to="/signup">SignUp</Link>
                    }
                  </li>
                </ul>
              </label>
            </li>
          </ul>
        </div>
        </nav>
    )
}

export default NavBar