import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Donate.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import donateimg from "../../images/sports5.jpg";
import blog3 from "../../images/blog3.jpg";
import Payment from "../Cart/Payment";


const Donate = () => { 

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const donatepay =() =>{
    console.log("Entered donatepay");
    window.location.href = "http://localhost:3000/process/payment";
    // return <Payment/>;
  }

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
     
        <div className="bg-image"></div>
        <div className="bg-text">
          <h2>Item Requested</h2>
          <br />
          <div className="info">
            <label>Name of Item :</label> <span>BasketBall</span>
            <br />
            <label>Size :</label> <span>International</span> <br />
            <label>Quantity :</label> <span>15</span> <br />
            <label>Requested from :</label>{" "}
            <span>St.Patrick's Community School</span><br/>
            <label>Amount :</label><span>$1200</span>
          </div>
          <br />
          <button type="submit" onClick={donatepay}>❤️ Donate</button>
        </div> 
      <div className="div2">
        <img src={blog3}></img>
      </div>
    </Carousel>
  );
};

export default Donate;
