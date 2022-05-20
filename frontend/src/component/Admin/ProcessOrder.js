import React, { Fragment, useEffect, useState, useRef } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

import { submitHandler } from "../Cart/Payment"

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [status, setStatus] = useState("null");
  const componentRef = useRef();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);
    //console.log("select status",status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    ////console.log(order);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    //console.log("before dispatch");
    //console.log("select status",status)
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "grid" : "grid" ,
              }}
            >
              <div ref={componentRef}>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Order Placed by:</p>
                      <span>{order.user && order.user.name}</span>
                      {/* <hr></hr> */}
                      <span>&nbsp;</span>
                      <p>Designation:</p>
                      <span>
                        {order.user &&
                          order.shippingInfo.userLoggedInDesignation}
                      </span>
                    </div>
                    <div>
                      <p>Deliver To Student Id:</p>
                      <span>
                        {order.user && order.shippingInfo.receivingPersonName}
                      </span>
                    </div>
                    <div>
                      <p>Order Date:</p>
                      <span>{order.user && order.shippingInfo.orderDate}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.userAddress }
                      </span>
                    </div>
                    <div>
                      <p>Additional Comments:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.additionalComments}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div className="cartitemholder" key={item.product}>
                          <div className="cartitemholderimage">
                            <img src={item.image} alt="Product" />
                          </div>
                          <div className="cartitemholdername">
                            <span>{item.name}</span>
                          </div>
                          <div className="cartitemholdercat">
                            <span>Subcategory({item.SubCategory})</span>
                          </div>
                          <div className="cartitemholdersize">
                            <span>Size({item.ProductSize.split(",", 1)})</span>
                          </div>
                          <div className="cartitemholderquantity">
                            <span>Quantity({item.quantity})</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="printComponent">
                  <ReactToPrint
                    trigger={() => <PrintIcon className="PrintIcon" />}
                    content={() => componentRef.current}
                  />{" "}
                  <p>
                    <span>Print</span>
                  </p>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                    <hr></hr>
                  {/* <h1>Order Risk Estimation</h1> */}
                  <img src={"https://i.ibb.co/qdVNr6f/LOCKERROOM345-2.png"} alt={"Risk"} />
                  <br></br>
                  <hr></hr>
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="null">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="picked">Pick Completed</option>
                      )}

                      {order.orderStatus === "picked" && (
                        <option value="Delivered">Delivered</option>
                      )}

                      {order.orderStatus === "Processing" && (
                        <option value="PickedDelivered">Picked and Delivered</option>
                      )}  

                      {order.orderStatus === "Delivered" && (
                        <option value="revertpicked">Revert to Picked</option>
                      )}  

                      {order.orderStatus === "Delivered" && (
                        <option value="Processing">Revert to Processing</option>
                      )}  

                      {order.orderStatus === "picked" && (
                        <option value="Processing">Revert to Processing</option>
                      )}  
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                       loading ? true : false ||  status == "null" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
