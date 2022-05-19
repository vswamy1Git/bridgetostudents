import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:lockerroom345@gmail.com?Subject=Locker Room 345 Email">
        <Button>Contact: lockerroom345@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
