import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="containerFooter">
      <div className="footerBar">
        <li>
          <a href="/">Website</a>
        </li>
        <li>
          <a href="/about_us">Users</a>
        </li>
        <li>
          <a href="/coins_page">Coins</a>
        </li>
        <li>
          <a href="/exchanges_page">Exchanges</a>
        </li>
      </div>
      <p>
        Crypto app made by: Amil Kahrović, Ahmed Vučelj, Ajsa Nicević, Esma
        Bećović;
      </p>
      <p>© 2023 Crypto App</p>
    </div>
  );
};

export default Footer;
