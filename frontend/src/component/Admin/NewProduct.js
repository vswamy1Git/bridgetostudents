import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HeightIcon from "@mui/icons-material/Height";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [inputList, setInputList] = useState([{size:"",stock:"" }]);
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["FootWears", "Clothing", "Sports", "Miscellaneous"];
  // const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }])
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log([...inputList]);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { size: "", stock: "" }]);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    var obj = new Object();
    obj.name = name;
    obj.category  = category;
    obj.SubCategory = SubCategory;
    obj.ProductSize = inputList;
    // obj.images = images;
    var jsonString= obj;
    debugger

    // const myForm = new FormData();
    // myForm.set("name", name);
    // myForm.set("category", category);
    // myForm.set("SubCategory", SubCategory);
    // myForm.set("ProductSize", JSON.stringify(inputList));
    // myForm.set("Stock", Stock);
    //for(const v of Object.values(JSON.stringify(inputList))){
      // inputList.forEach(x =>{
      //   myForm.append("ProductSize", JSON.stringify(x));
      // })
    //}

       

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    dispatch(createProduct(jsonString));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <MetaData title="Create Product" />
      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="newProductContainer">
        <img src={"https://i.ibb.co/6Zv0kF9/bar.png"} alt={"Bar"} />

          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create New Item</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FilterAltIcon />
              {/* <input
                type="text"
                placeholder="SubCategory"
                required
                onChange={(e) => setSubCategory(e.target.value)}
              /> */}
              <select
                name="category"
                id="category"
                onChange={(e) => {
                  setSubCategory(e.target.value);
                }}
              >
                <option value="SelectCategory">Select SubCategory</option>
                <option value="Mens sizing">Mens sizing</option>
                <option value="womens sizing">Womens sizing</option>
                <option value="Boys' sizing">Boys' sizing</option>
                <option value="Girls' sizing">Girls' sizing</option>
                <option value="Toddlers sizing">Toddlers sizing</option>
              </select>
            </div>

            {/* <div>
              <HeightIcon />
              <input
                type="text"
                placeholder="Size"
                required
                onChange={(e) => setProductSize(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div> */}
            <div className="sizestock">
              {inputList.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      name="size"
                      placeholder="size"
                      value={x.size}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <input
                      className="ml10"
                      name="stock"
                      placeholder="stock qty"
                      value={x.stock}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <div className="btn-box">
                      {inputList.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick(i)}
                        >
                          -
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button onClick={handleAddClick}>+</button>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
