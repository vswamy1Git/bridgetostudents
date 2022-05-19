import { React, useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/dicks_logo.svg";
import logo from "../../../images/lockerroomlogo.PNG";
import { logout } from "../../../actions/userAction";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { lightGreen } from "@mui/material/colors";
import HelpIcon from '@mui/icons-material/Help';
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = ({}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  // const role = user.role
  // const cartlength =0;
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [cartCount, setcartCount] = useState(0);

  async function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    history.push("/");
  }

  function account() {
    history.push("/account");
  }
  function helpuse() {
    history.push("/helpuse");
  }


  function home() {
    history.push("/");
  }

  function products() {
    history.push("/products");
  }
  function orders() {
    history.push("/orders");
  }

  function cart() {
    history.push("/cart");
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function adminorders() {
    history.push("/admin/orders");
  }

  function setProducts() {
    history.push("/admin/products");
  }

  function setProduct() {
      history.push("/admin/product");
  }

  function setUsers() {
    history.push("/admin/users");
  }

  function setUser() {
      history.push("/register");
  }

  return (
    <div className="navbar">
      {user && user.role === "user" && (
        <li>
          <HomeIcon className="icon"/>
          <Button onClick={home}>Home</Button>
        </li>
      )}

        {user && user.role === "admin" && (
          <li>
            <DashboardIcon className="icon"/>
            <Button onClick={dashboard}>Dashboard</Button>
          </li>
      )}    

      {/* <li>
        <Inventory2Icon />
        <Button onClick={products}>Products</Button>
      </li> */}
      {user && user.role === "user" && (
        <li>
          <ListAltIcon className="icon"/>
          <Button onClick={orders}>My Orders</Button>
        </li>
      )}
       {user && user.role === "admin" && (
        <li>
          <ListAltIcon className="icon"/>
          <Button onClick={adminorders}>All Orders</Button>
        </li>
      )}
      {user && user.role === "user" && (
        <li>
          <PersonIcon className="icon"/>
          <Button onClick={account}>My Account</Button>
        </li>
      )}
       {user && (user.role === "user" || user.role === "admin" || user.role === "volunteer") && (
        <li>
          <HelpIcon className="icon"/>
          <Button onClick={helpuse}>How To Use</Button>
        </li>
      )}
      {user && user.role === "user" && (
        <li>
          <ShoppingCartIcon className="icon"/>
          <Button onClick={cart}>My Cart ({cartItems.length})</Button>
        </li>
      )}
      {user && user.role === "admin" && (
        <li>
          <AddIcon className="icon"/>
          {/* <select
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              >
                <option value=''>PRODUCTS</option>
                <option value='products'>Show All Products</option>
                <option value='product'>Add Product</option>
              </select> */}

              <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  PRODUCTS
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => { handleClose(); setProducts();}}>Show All Products</MenuItem>
                  <MenuItem onClick={() => { handleClose(); setProduct();}}>Add Product</MenuItem>
                </Menu>
        </li>
      )}

      {user && user.role === "admin" && (
        <li>
          <PeopleIcon className="icon" />
          {/* <select
                onChange={(e) => {
                  setUsers(e.target.value);
                }}
              >
                <option value=''>USERS</option>
                <option value='users'>Show All Users</option>
                <option value='addUsers'>Add Users</option>
              </select> */}

              <Button
                  id="basic-button1"
                  aria-controls={open1 ? 'basic-menu1' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? 'true' : undefined}
                  onClick={handleClick1}
                >
                  USERS
                </Button>
                <Menu
                  id="basic-menu1"
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button1',
                  }}
                >
                  <MenuItem onClick={() => { handleClose1(); setUsers();}}>Show All Users</MenuItem>
                  <MenuItem onClick={() => { handleClose1(); setUser();}}>Add User</MenuItem>
                </Menu>
        </li>
      )}

      <li className="logoutli">        <ExitToAppIcon className="icon" />
        <Button onClick={logoutUser}>Logout</Button>
      </li>
    </div>
  );
};

export default Header;
