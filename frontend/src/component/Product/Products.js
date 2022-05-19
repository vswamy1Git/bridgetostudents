import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "FootWears",
  "Clothing",
  "Sports",
  "Miscellaneous"
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  // const {
  //   products,
  //   loading,
  //   error,
  //   productsCount,
  //   resultPerPage,
  //   filteredProductsCount,
  // } = useSelector((state) => state.products);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => {
    const mapping = state.products.products.reduce((acc,x) => {
      let subcategoryData = x.ProductSize.map((y) => {
        let obj = {};        
        obj.size = y.size;
        obj.url = x.images[0].url;
        obj.stock = y.stock;
        obj._id = x._id;
        return obj;
    })
      if(acc[x.name]){
        return {...acc,
        [x.name] : {
            ...acc[x.name], 
            hashmap:{
              ...acc[x.name].hashmap, 
               [x.SubCategory]:subcategoryData,
            }
          }
        }
        }else{
          return {...acc, 
            [x.name]:{
              id : x._id, 
              name : x.name,
              url : x.images[0].url,  
              hashmap:{
                [x.SubCategory]:subcategoryData,
              }
            }
          }
        }
    },{});
     return {...state.products, products:mapping}
  });
  const keyword = match.params.keyword;

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
  }, [dispatch, keyword, currentPage, category, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS" />
          <h2 className="productsHeading">Products</h2>

          <div className="filterBox">
            {/* <div className="filSize">
            <fieldset>
              <Typography component="legend">Size</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={4}
                max={12}
              />
              </fieldset>
            </div> */}

            <div className="filCategories">
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

          <div className="products">
            {/* {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))} */}
              {
              [...Object.entries(products)]
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([key, value]) => {
                  return <ProductCard key={value.id} product={value} />
                })}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
