import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Donate from "../donate/Donate";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";

const Home = ({ history }) => {
  const categories = [
    "All",
    "FootWears",
    "Clothing",
    "Sports",
    "Miscellaneous",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();
  // const { loading, error, products } = useSelector((state) => state.products);
  // let hashmap = {}
  // let mapping = {}
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rows, setRows] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [keyword, setKeyword] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => {
    const mapping = state.products.products.reduce((acc, x) => {
      let subcategoryData = x.ProductSize.map((y) => {
        let obj = {};
        obj.size = y.size;
        obj.url = x.images[0].url;
        obj.stock = y.stock;
        obj._id = x._id;
        return obj;
      });
      if (acc[x.name]) {
        return {
          ...acc,
          [x.name]: {
            ...acc[x.name],
            hashmap: {
              ...acc[x.name].hashmap,
              [x.SubCategory]: subcategoryData,
            },
          },
        };
      } else {
        return {
          ...acc,
          [x.name]: {
            id: x._id,
            name: x.name,
            url: x.images[0].url,
            hashmap: {
              [x.SubCategory]: subcategoryData,
            },
          },
        };
      }
    }, {});
    return { ...state.products, products: mapping };
  });
  // const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, currentPage, category, error, alert]);

  const searchSubmitHandler = (e) => {
    console.log(products);
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Donate & help" />
          <div className="banner">
            <p>Welcome to<br></br>Bridge To Students </p>
            <div className="teachercredit">
            <p>Credits Left: <span>7</span></p>
            </div>
          </div>
          
           
          <div className="searchbar">
            <form className="searchBoxbar" onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
          <div className="filterBoxhome">
            <div className="filCategorieshome">
              <fieldset>
                <Typography component="legend">Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </fieldset>
            </div>
          </div>
          <h2 className="homeHeading">All Products</h2>
          <div className="container" id="container">
            {[...Object.entries(products)]
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([key, value]) => {
                return <ProductCard key={value.id} product={value} />;
              })}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                // nextPageText="Next"
                // prevPageText="Prev"
                // firstPageText="1st"
                // lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

          {/* <h2 className="homeHeading">Donation Requests</h2>
          <Donate /> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
