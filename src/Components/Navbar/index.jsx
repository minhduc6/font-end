import "./navbar.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state) => state.app.user);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light">
        <div class="container flex-lg-row flex-nowrap align-items-center">
          <div class="navbar-brand w-100">
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
          <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
            <div class="navbar-other w-100 d-flex ms-auto">
              <ul class="navbar-nav flex-row align-items-center ms-auto">
                <li class="nav-item"><a class="nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-search"><i class="uil uil-search"></i></a></li>
                <li class="nav-item">
                  <a class="nav-link position-relative d-flex flex-row align-items-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-cart">
                    <i class="uil uil-shopping-cart"></i>
                    <span class="badge badge-cart bg-primary">3</span>
                  </a>
                </li>
                <li class="nav-item d-lg-none">
                  <button class="hamburger offcanvas-nav-btn"><span></span></button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
