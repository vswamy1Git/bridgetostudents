import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import ReactTooltip from "react-tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    // { field: "id", headerName: "Product ID", Width: 100, flex: 0.2 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 70,
      flex: 0.1,
    },
    {
      field: "subcategory",
      headerName: "SubCategory",
      minWidth: 70,
      flex: 0.1,
    },
    // {
    //   field: "size",
    //   headerName: "Size",
    //   minWidth: 50,
    //   flex: 0.1,
    // },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 50,
      flex: 0.1,
      cellClassName: (params) => {
        //console.log("params",params);
        return params.getValue(params.id, "stock") > 0
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "stockinfo",
      headerName: "Stock Info",
      minWidth: 50,
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Fragment>
            <div
              data-tip={params.getValue(params.id, "stockinfo")}
              data-for="toolTip1"
              data-place="bottom"
              data-type="success"
              data-multiline="true"
            >
              <InfoIcon />
            </div>
            <ReactTooltip id="toolTip1" />
          </Fragment>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 50,
      flex: 0.1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              {/* <EditIcon /> */}
              <span>Edit</span>
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  //const dummy = [];
  // products.forEach((x) => {
  //   dummy.push(x);
  //console.log(products);
  // });
  //  dummy[0].ProductSize[0].map((x) => {
  //console.log(products && products[0].ProductSize && products[0].ProductSize.map((x) => x.stock));
  // for (let i = 0; i < products.length; i++) {
  //   //console.log(products && products[i].ProductSize && products[i].ProductSize.map((x) => x.stock));
  //   console.log(
  //     products &&
  //       products[i].ProductSize &&
  //       products[i].ProductSize.reduce((prev, curr) =>
  //          prev.stock < curr.stock ? prev.stock : curr.stock
  //       )
  //   );
  // }
  let hashmap = new Map();
  let mapping = new Map();
  // let obj = {};

  // let stockarray = products.map((x) => {
  //   let arr = [];
  //   x.ProductSize.map((y) => {
  //     obj.size = y.size;
  //     obj.stock = y.stock;
  //     arr.push(obj);
  //   });
  //   hashmap.set(x.SubCategory, arr);
  //   mapping.set(x.name,   hashmap);
  // });

  let stockarray = products.map((x) => {
    let arr = [];
    x.ProductSize.map((y) => {
      let obj = {};
      obj.size = y.size;
      obj.stock = y.stock;
      arr.push(obj);
    });
    hashmap.set(x.SubCategory, arr);
    mapping.set(x.name, hashmap);
  });

  //let hash1 = mapping.get("Sweat Shirts");
  //console.log(mapping);
  //  for(let i=0; i<mapping.size; i++){
  //   console.log(mapping.keys);
  //  }

  // console.log([...mapping].filter((values, keys) => {
  //   values.forEach((k,v)=>k);
  //   // if(keys === "Sweat Shirts"){
  //   //   console.log(keys);
  //   // }
  // }));
  // .map(([k]) => k)

  // mapping.forEach((k) => {
  //   if (k.get("Mens sizing")) {
  //     k.get("Mens sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else if (k.get("Womens sizing")) {
  //     k.get("Womens sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else if (k.get("Boys' sizing")) {
  //     k.get("Boys' sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else if (k.get("Girls' sizing")) {
  //     k.get("Girls' sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else {
  //     k.get("Toddler' sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   }
  // });

  //Object.entries(hash1).forEach((k,v) => console.log(v));
  // hash1.((x) => {
  //   console.log(x);
  //   if (k === "Mens sizing") {
  //     console.log(v);
  //   } else if (k === "Womens sizing") {
  //     console.log(v);
  //   } else if (k === "Boys' sizing") {
  //     console.log(v);
  //   } else if (k === "Girls' sizing") {
  //     console.log(v);
  //   } else {
  //     console.log(v);
  //   }
  // });
  // mapping.forEach((x) => {
  //   console.log(x);
  //   // if (x.name === "sweat shirts") {
  //   //   console.log( x.get("Mens sizing"));
  //   // }
  // });

  // console.log("out of stock list", map.get("Sweat Shirts").map((x) => {
  //   return x
  // }));

  //   });
  //  dummy[0].ProductSize.reduce(function(prev, curr) {
  //    console.log(prev.stock < curr.stock ? prev : curr);
  //  });
  //console.log(Object.keys(products.ProductSize[0]).sort((a,b) => (products.ProductSize[a] - products.ProductSize[b])));

  // let array1 = [];
  // products &&
  // products.forEach((item) => {
  //   console.log(item.name)
  //   item.ProductSize.map((y) => {  (y.size +":" + y.stock)  })
  // });

  products &&
    products.forEach((item) => {
      //console.log(item);
      rows.push({
        id: item._id,
        stock: item.ProductSize.map((y) => y.stock).sort((a, b) => a - b)[0],
        // price: item.price,
        stockinfo: (item.ProductSize.map((y) => {
          let str ="";
          str+=( " "+ y.size + " : " + y.stock + " " );
          return  str;
        })),
        name: item.name,
        size: item.Size,
        category: item.category,
        subcategory: item.SubCategory,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL Items Available - Admin`} />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
         <center> <img src={"https://i.ibb.co/YXdRhb2/Number-in-stock-01.png"} alt={"Bar"} /></center> 

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
