import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const { order,  loading } = useSelector((state) => state.orderDetails);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "orderId", headerName: "Order ID", minWidth: 60, flex: 0.1 },
    {
      field: "orderfrom",
      headerName: "Ordered By",
      type: "string",
      minWidth: 50,
      flex: 0.15,
    },
     {
      field: "studentId",
      headerName: "Student Id",
      type: "string",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "OrderDate",
      headerName: "Order Date",
      type: "string",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 50,
      flex: 0.1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Qty",      
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 60,  
      flex: 0.1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              {/* <EditIcon /> */}
              <span>View Order</span>
            </Link>

            {/* <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button> */}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      //console.log(item);
      rows.push({
        id: item._id,
        orderId: item.orderId,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        OrderDate: item.shippingInfo.orderDate,
        status: item.orderStatus,
        studentId: item.shippingInfo.receivingPersonName,
        orderfrom: item.shippingInfo.userName       
         
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS RECEIVED</h1>

          <DataGrid
           initialState={{
            sorting: {
              sortModel: [
                {
                  field: 'OrderDate',
                  sort: 'desc',
                },
              ],
            },
          }}
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

export default OrderList;
