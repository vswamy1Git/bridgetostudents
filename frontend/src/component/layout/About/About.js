import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import dicksmission from "../../../images/dicks_mission.PNG";
const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
     
      <div className="aboutSectionContainer">
      <Typography component="h1">About Us</Typography>
        <div className="header">
          {/* <image src={dicksmission} alt="" /> */}
        </div>
        <div>
          {/* <image src={dicksmission} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
