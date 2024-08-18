import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css"

export default function Header() {


    return (
        <header className="bg-dark text-white p-3">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}