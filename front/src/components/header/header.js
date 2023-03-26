import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import {CgUser} from "react-icons/cg";

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <div className="logo">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="image" /></Link>
                </div>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <Link to="/login" style={{textDecoration: "none"}}><span><CgUser className="cg"/></span></Link>
            </div>
        </div>
    )
}

export default Header