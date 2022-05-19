import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { PDFDownloadLink, Document, Page, pdf } from "@react-pdf/renderer";
import ConfirmOrder from "./ConfirmOrder";
import RequestFormReplica from "./RequestFormReplica";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  // const stripe = useStripe();
  // const elements = useElements();
  const payBtn = useRef(null);

  // const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  // const upadtedcartItems = localStorage.getItem("cartItemss");

  const submitHandler = async (e) => {
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };

    e.preventDefault();
    // console.log("upadtedcartItemspay",upadtedcartItems);
    console.log("cartItems", cartItems);
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      //const client_secret = data.client_secret;

      //if (!stripe || !elements) return;

      // const result = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardNumberElement),
      //     billing_details: {
      //       name: user.name,
      //       email: user.email,
      //       address: {
      //         line1: shippingInfo.address,
      //         city: shippingInfo.city,
      //         state: shippingInfo.state,
      //         postal_code: shippingInfo.pinCode,
      //         country: shippingInfo.country,
      //       },
      //     },
      //   },
      // });
      //result.paymentIntent.status === "succeeded";

      if (data.success === true && cartItems.length > 0) {
        // order.paymentInfo = {
        //   id: result.paymentIntent.id,
        //   status: result.paymentIntent.status,
        // };
        dispatch(createOrder(order));
        history.push("/success");
      } else {
        alert.error(
          "No items available in cart. Please try adding the items again"
        );
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography className="Typography">Order Place</Typography>
          <hr></hr>
          <br />
          <br />
          <input
            type="submit"
            value={`Proceed To Place Order`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
