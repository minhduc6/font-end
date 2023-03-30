import "./navbar.scss";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser, setIsLoggin } from "../../Store/index";

import { Button, Dropdown, Avatar } from 'antd';


function Navbar() {
  const user = useSelector((state) => state.profile.user);
  const isLoggin = useSelector((state) => state.profile.isLoggin)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setCurrentUser({}))
    dispatch(setIsLoggin(false))
    localStorage.removeItem("ACCESS_TOKEN")
    navigate("/")
  }

  const loggin = () => {
    navigate("/login")
  }


  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/profile">
          Profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Xem Đơn Hàng
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a  target="_blank" rel="noopener noreferrer" onClick={logout}>
          Đăng Xuất
        </a>
      ),
    },
  ];



  return (
    <>
      <nav class="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light">
        <div class="container flex-nowrap align-items-center">
          <div class="navbar-brand ">
            <ul class="navbar-nav">
              <li class="nav-item ">

              </li>
              <li class="nav-item ">
                <a class="nav-link" href="#">Home <span class="sr-only">Home</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
            </ul>
          </div>
          {isLoggin == true ? (<Dropdown menu={{ items }} placement="bottomLeft">
            <Avatar src={<img src={user.imgUrl} alt="avatar" />} />
          </Dropdown>) : (<>  <Button onClick={loggin} >
            Đăng Nhập
          </Button></>)}

        </div>
      </nav>
    </>
  );
}

export default Navbar;
