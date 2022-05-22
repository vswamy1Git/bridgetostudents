import {React,useState} from "react";
import "./Helpuse.css";
import { Button } from "@material-ui/core";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

const Helpuse = () => {

const { user } = useSelector((state) => state.user);
  return (
    // <div className="helpuseContainer">
    //  <ReactPlayer url='https://youtu.be/2LFjBufoBz8' />
    // </div>
    <div className="aboutSectionContainer">
          {/* <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url= {user && user.role=="user" ? "https://www.youtube.com/watch?v=V7Zy23qiQOk" : "https://www.youtube.com/watch?v=E5QQME6si1Q"}
            playing= "false"
            playIcon     
            controls="true"  
            config={{
                youtube: {
                  playerVars: { showinfo: 1 }
                }          
              }}
          />
          
              </div> */}
              <img src={"https://i.ibb.co/715HJtb/logo.png"} alt={"logo"}/>

        <h1>About Us</h1>
        <div className="header">
        <p>This mobile application aims to provide an infrastructure for retailers and donors to provide items to high schoolers on-demand.
          <br/><br/>Retailers will be able to partner with high schools to tackle specific issues they face and reward their students or teachers for whatever sensible metric they choose
        <ul>
          <li>absenteeism</li>
          <li>student performance</li>
          <li>student-teacher relationship development</li>
        </ul>          
        <br></br>Third-party donors will also be able to contribute to the retailer’s donation program to provide students and teachers with various elements that might be out of reach for the retailer.
        </p>
        {/* <h2 className="homeHeading">Our Impact</h2> */}
          {/* <Donate /> */}
          {/* <image src={dicksmission} alt="" /> */}
        </div>
        <div>
          {/* <image src={dicksmission} alt="" /> */}
        </div>
        {/* <div className="devby"> */}

          <h1>Developed By</h1>
          <ul className="devby">
            <li>Taima El Frieh</li>
            <li>Nieqing Cao</li>
            <li>Vignesh Swamy</li>
            <li>Srimadhaven Thirumurthy</li>
          </ul>
        {/* </div> */}

    </div>
   
  );
};

export default Helpuse;
