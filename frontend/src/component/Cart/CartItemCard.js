import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        {/* <Link to={`/product/${item.product}`}>{item.name}</Link> */}
        <h4>{item.name}</h4>
        {/* <span>{`Price: $${item.price}`}</span> */}
        {/* <span>{`Price: $0`}</span> */}
        <span>{`SubCategory: ${item.SubCategory}`}</span>
        <span>{`Size: ${item.ProductSize}`}</span>
        <p onClick={() => deleteCartItems(item.product,item)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
