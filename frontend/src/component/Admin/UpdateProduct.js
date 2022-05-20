import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HeightIcon from "@mui/icons-material/Height";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [ProductSize, setProductSize] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["FootWears", "Clothing", "Sports", "Miscellaneous"];

  const productId = match.params.id;

  useEffect(() => {
    //console.log((product.ProductSize).length);
    //for(let i =0; i< 3; i++){
    // for (const [key, value] of Object.entries(product.ProductSize[0])) {
    //   console.log(`${key}: ${value}`);
    // }
    //}
    console.log("enter");
    if (product && product._id !== productId) {
      console.log("entering getProductDetails");
      dispatch(getProductDetails(productId));
    } else {
      // console.log(
      //   "length",
      //   product.ProductSize.indexOf((x) => {
      //     x.size == product.ProductSize.size;
      //   })
      // );
      setName(product.name);
      setDescription(product.description);
      // setPrice(product.price);
      setCategory(product.category);
      setSubCategory(product.SubCategory);
      // setProductSize(product.ProductSize[0].size);
      // setProductSize(product.ProductSize[0].size);
      // setStock(product.ProductSize[0].stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("SubCategory", SubCategory);
    myForm.set("ProductSize", [ProductSize]);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const handlesizeChange = (e) => {
   
    // console.log(e.target.options.selectedIndex);    
    // //console.log("obj",e.target[e.target.selectedIndex].key );
    // console.log((product.ProductSize[(e.target.options.selectedIndex)-1]).size);
    
    //console.log("selectedIndex",selectedIndex);
    //console.log(e.target.options[selectedIndex].datasets.key);
    // for (let node of e.target.children) {
    //   if (node.value === e.target.value) {
    //     console.log(node);
    //     // this.setState({
    //     //   selected: node.getAttribute('data-id')
    //     // });
    //   }
    // }
    setProductSize((product.ProductSize[(e.target.options.selectedIndex)-1]).size);
    setStock(e.target.value);
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <center>
      <img src={"https://i.ibb.co/7g94rHL/Sweat-shirt-inventory-trajectory-with-title-0214-2.png"} alt={"Bar"} width={650}  />
      </center>
      <center>
      <img src={"https://i.ibb.co/yY06cZX/Demand-forcast.png"} alt={"Bar"} width={650}  />
      </center>
      <MetaData title="Create Product" />
      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div> */}

            <div>
              <AccountTreeIcon />
              <input
                type="text"
                placeholder="Category"
                required
                disabled
                value = {product.category}
                // onChange={(e) => setSubCategory(e.target.value)}
              />
              {/* <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select> */}
            </div>
            <div>
              <FilterAltIcon />
              <input
                type="text"
                placeholder="SubCategory"
                required
                disabled
                value = {product.SubCategory}
                // onChange={(e) => setSubCategory(e.target.value)}
              />
              {/* <select
                name="category"
                id="category"
                onChange={(e) => {
                  setSubCategory(e.target.value);
                }}
              >
                <option value="SelectCategory">Select SubCategory</option>
                <option value="Mens sizing">Mens sizing</option>
                <option value="Womens sizing">Womens sizing</option>
                <option value="Boys' sizing">Boys' sizing</option>
                <option value="Girls' sizing">Girls' sizing</option>
                <option value="Toddlers sizing">Toddlers sizing</option>
              </select> */}
            </div>

            <div>
              <HeightIcon />
              {/* <input
                type="text"
                placeholder="Size"
                required
                onChange={(e) => setSize(e.target.value)}
              /> */}
              {/* <h1>{JSON.stringify(product.ProductSize)}</h1> */}
              {product && product.ProductSize && (
                <select
                  name="size"
                  id="size"
                  onChange={(e) => {
                    handlesizeChange(e);
                  }}
                >
                  <option value="selectsize">Select Size</option>
                  {/* {Object.keys(product.ProductSize).forEach((x) => {
                    console.log(
                      product.ProductSize[x].size,
                      product.ProductSize[x].stock
                    );
                    <option
                      key={product.ProductSize[x].size}
                      value={product.ProductSize[x].stock}
                    >
                      {product.ProductSize[x].size}
                    </option>;
                  })} */}
                  {product.ProductSize.map((item, index) => (
                    <option key={item.size} value={item.stock}>
                      {item.size}
                    </option>
                  ))}

                  {/* {                    
                  [...Object.entries(product.ProductSize[0])].map((k, v) => {
                    return <option key={k[1]} value={v[1]}>{k}</option>;
                  })} */}
                </select>
              )}
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update Item
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
