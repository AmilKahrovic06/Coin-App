import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { AiOutlineHeart } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
  return (
    <div className="container">
      <div className="logo">
        <NavLink
          style={{ textDecoration: "none", color: "#5762D5", cursor: 'context-menu' }}
        >
            <div className="logo1">
          <img src="https://i.postimg.cc/8P0LjnXR/logo-removebg-preview.png" style={{width:'45px', height:'45px', marginTop:'-20px', marginLeft:'20px', padding:'20px 0'}}></img>
          <p>CRYPTO-APP</p>
            </div>
        </NavLink>
      </div>
      <div className="navBar">
        <li className="navList">
          <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
            to={"/"}
            style={{ textDecoration: "none", color: "#D4D4D8" }}
          >
            Home
          </NavLink>
        </li>
        <li className="navList">
          <NavLink
            to={"/coins_page"}
            style={{ textDecoration: "none", color: "#D4D4D8"  }}
          >
            Coins
          </NavLink>
        </li>
        <li className="navList">
          <NavLink
            to={"/exchanges_page"}
            style={{ textDecoration: "none", color: "#D4D4D8" }}
          >
            Exchanges
          </NavLink>
        </li>
        <li className="navList">
          <NavLink
            to={"/about_us"}
            style={{ textDecoration: "none", color: "#D4D4D8"  }}
          >
            About Us
          </NavLink>
        </li>
        <li className="navList">
          <NavLink
            to={"/favorites_page"}
            style={{ textDecoration: "none", color: "#B60226" }}
          >
            <AiOutlineHeart className="favIcon"/>
          </NavLink>
        </li>
      </div>
      <div className="account">
      <NavLink
            to={"/account_page"}
            style={{ textDecoration: "none", color: "#D4D4D8"  }}
          >
            <MdAccountCircle className="accountIcon"/>
          </NavLink>
      </div>
    </div>
  );
};

export default Header;
