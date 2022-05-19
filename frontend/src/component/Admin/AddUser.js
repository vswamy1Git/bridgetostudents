import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import HomeIcon from "@material-ui/icons/Home";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ImageIcon from '@mui/icons-material/Image';
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { useHistory } from "react-router-dom";
import {
  register,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const AddUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);


  const [userinfo, setUserinfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.set("role", role);
    console.log(role);
    myForm.set("address", address);
    dispatch(register(myForm));
    history.push('/registersuccess');
    
  };

  return (
    <Fragment>
      <MetaData title="Add User" />
      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Add User</h1>

              <div >
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="School Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div >
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="Login ID"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

              <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

              <div>
                <HomeIcon />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                  < ImageIcon />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
              >
                Add User
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AddUser;
