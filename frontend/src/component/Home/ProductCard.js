import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductCard = ({ product, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated } = useSelector((state) => state.user);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [requestForm, setrequestForm] = useState(false);
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const takeToRequestForm = () => {
    setrequestForm(true);
    //console.log(requestForm);
    //history.push("/requestform");
    window.location.href = "http://localhost:3000/requestform";
  };

  const [SubCategory, setSubCategory] = useState(
    Object.keys(product.hashmap)[0] || ""
  );
  const [ProductSize, setProductSize] = useState(0);

  const increaseQuantity = () => {       
    let maxstock = product.hashmap[SubCategory][ProductSize].stock;
    // console.log("product Stock currently",maxstock);
    if (maxstock <= quantity) return;
    const qty = quantity + 1;    
    setQuantity(qty);
  };

  const decreaseQuantity = () => {    
    if (1 >= quantity) return;
    const qty = quantity - 1;
    //console.log("decrease quantity to", qty);
    setQuantity(qty);
  };

  const handlesubcatChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handlesizeChange = (e) => {
   
      //console.log(product);
      let k = product.hashmap[SubCategory][e.target.value];
      if(k.stock < 1){
        alert.error("Item Out of Stock")
      }
      // debugger
      setProductSize(e.target.value);
    
  };
  const addToCartHandler = (e) => {
    e.preventDefault();

    if(product.hashmap[SubCategory][ProductSize].stock < 1){
      alert.error("Item Not Available")
    }
    else{
      dispatch(addItemsToCart(product.id, quantity, SubCategory, product.hashmap[SubCategory][ProductSize].size));
      alert.success("Item Added To Cart");
    }
    // if (
    //   // SubCategory.trim() === "" ||
    //   ProductSize.size.trim() == ""
    //   // SubCategory.trim() === "SelectCategory" ||
    //   // ProductSize.trim() == "selectsize"
    // ) {
    //   alert.show("required Subcategory and Size field");
    // } else {
      //console.log("clicked");
      
    //}
  };

  return (
    // <Link className="productCard" to={`/product/${product._id}`}>
    // <form
    //   onSubmit={(e) => {
    //     addToCartHandler(e);
    //   }}
    // >
    <div className="productCard">
      <img src={product.url} alt={product.name} />

      <div className="productCardDesc">
        <div className="productname">
          <p>{product.name}</p>
        </div>
        <div className="productCardSpan">
          <div className="detailsBlock-3-1-1">
            <button onClick={decreaseQuantity}>-</button>
            <input readOnly type="number" value={quantity} />
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <div className="category">
          <select
            name="category"
            id="category"
            value={SubCategory}
            onChange={(e) => {
              handlesubcatChange(e);
            }}
            required
          >
            {Object.keys(product.hashmap).map((size) => (
              <option value={size}>{size}</option>
            ))}
            {/* <option value="SelectCategory">Select SubCategory</option>
            <option value="Mens sizing">Mens sizing</option>
            <option value="Womens sizing">Womens sizing</option>
            <option value="Boys' sizing">Boys' sizing</option>
            <option value="Girls' sizin">Girls' sizing</option>
            <option value="Toddlers sizing">Toddlers sizing</option> */}
          </select>
        </div>
        <div className="size">
          <select
            name="size"
            id="size"
            value={ProductSize}
            onChange={(e) => {
              handlesizeChange(e);
            }}
            required
          >
            {/* <option value="selectsize">Select Size</option> */}

            {product.hashmap[SubCategory].map((item, i) => (
              <option key={item.size} value={i}>
                {item.size}
              </option>
            ))}
          </select>
        </div>
        {
          // <div className="stock">
          //   <p>
          //     Status:
          //     <b
          //       className={
          //         product.hashmap[SubCategory][ProductSize].stock <= 0
          //           ? "redColor"
          //           : "greenColor"
          //       }
          //     >
          //       {product.hashmap[SubCategory][ProductSize].stock < 1
          //         ? " Out Of Stock"
          //         : " In Stock"}
          //     </b>
          //     <br />
          //   </p>
          // </div>
        }

        <div className="addshopcart">
          <button
            onClick={addToCartHandler}
            // disabled={
            //   product.hashmap[SubCategory][ProductSize].stock < 1
            //     ? true
            //     : false
            // }
          >
            <AddShoppingCartIcon className="shoppingCartButton"
              // disabled={
              //   product.hashmap[SubCategory][ProductSize].stock< 1
              //     ? true
              //     : false
              // }
            />
            Add
          </button>
        </div>
      </div>
    </div>
    // </form>

    // </Link>
  );
};

export default ProductCard;
