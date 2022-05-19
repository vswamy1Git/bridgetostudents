import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Requestform.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import WcIcon from '@mui/icons-material/Wc';
import CreateIcon from '@mui/icons-material/Create';

import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import $ from "jquery";

const Requestform = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push("/requestform");
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

  
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="RequestContainer">
            <div className="RequestBox">
              <div>
                <div className="Request_toggle">
                  <p>Request Form</p>
                </div>
              </div>
              <form className="RequestForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="fullname">
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="facultyid">
                  <CreditScoreIcon />
                  <input
                    type="text"
                    placeholder="Faculty Id"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="schoolname">
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="school Name"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="schooladdress">
                  <ImportContactsIcon />
                  <input
                    type="text"
                    placeholder="school Address"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="emailid">
                  <MailIcon />
                  <input
                    type="email"
                    placeholder="Email Id"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="phoneno">
                  <PhoneIcon />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="genderage">
                  <div className="gender">                 
                    <select name="gender" id="gender">                    
                      <option value="select">Select a Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="noanswer">Don't wish to answer</option>
                    </select>
                  </div>  
                  <div className="age">  
                    <input
                      type="text"
                      placeholder="Age"
                      value={loginPassword}
                    />
                  </div>
                </div>
                <div className="additems">
                  {inputList.map((x, i) => {
                    return (
                      <div className="box">
                      <input
                        name="item"
                        placeholder="Item Requesting"
                        value={x.firstName}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <input
                        className="ml10"
                        name="size"
                        placeholder="size"
                        value={x.lastName}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <input
                        className="ml10"
                        name="quantity"
                        placeholder="Quantity"
                        value={x.lastName}
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
                </div>
                <input
                  type="submit"
                  value="Submit Request"
                  className="RequestBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Requestform;
