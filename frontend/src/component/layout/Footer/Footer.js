import React from "react";
import logo from "../../../images/dicks_logo.svg";
import lockerroomlogo from "../../../images/lockerroomlogo.PNG";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
      <a href="mailto:lockerroom345@gmail.com?Subject=Locker Room 345 Email">Contact Us</a>
       <a href="">Terms of Use</a>
       <a href="">Privacy Policy</a>       
       <a href="">Accessibility Policy</a>
      </div>

      <div className="midFooter">        
        <img src={lockerroomlogo} alt="" />
        <p><span>Presents From Us Not Only On Christmas </span><br /><span>But Everyday !!!</span></p>
        <p>&copy; 2022 Locker Room 345 </p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="">Instagram</a>
        <a href="">Youtube</a>
        <a href="">Facebook</a>
        <a href="">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
