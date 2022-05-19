import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import lockerroomlogo from "../../images/lockerroomlogo.PNG";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  async function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    history.push("/");
  }
  return (
    <div className="sidebar">
      {/* <Link to="/admin/dashboard">
        <img src={lockerroomlogo} alt="" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      {(user.role == "volunteer" || user.role == "admin") && (
        <Link to="/admin/orders">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
      )}
      {user.role == "admin" && (
        <Link>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Items">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              <Link to="/admin/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
      )}
      {user.role == "admin" && (
        <Link to="/admin/users">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>
      )}

      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/register">
        <p>
          <PeopleIcon /> Add User
        </p>
      </Link>

       */}
     
      
    </div>
  );
};

export default Sidebar;
