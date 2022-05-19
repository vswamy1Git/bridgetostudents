import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./userSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const UserSuccess = () => {

  
  const history = useHistory();

  async function displayUsers() {

    

    //console.log(data.orders[data.orders.length-1]._id);
    history.push('/admin/users');       
  }

  return (

    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>The User has been added successfully </Typography>
      <Button onClick={displayUsers}>Display All Users</Button>
    </div>
  );
};

export default UserSuccess;
