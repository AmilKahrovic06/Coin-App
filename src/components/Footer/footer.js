import React from "react";
import './footer.css'


const Footer = () =>{
    return(
        <div className="containerFooter">
            <div className="footerBar">
                <li><a href="">Website</a></li>
                <li><a href="">Users</a></li>
                <li><a href="">Coins</a></li>
                <li><a href="">Exchanges</a></li>
            </div>
            <p>Crypto app made by: Amil Kahrović, Ahmed Vučelj, Ajsa Nicević, Esma Bećović;</p>
            <p>© 2023 Crypto App</p>
        </div>
    )
}

export default Footer