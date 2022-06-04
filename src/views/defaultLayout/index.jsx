import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { HandleContext } from "../../index";

import "./index.scss";
import default_img from "./img/ava.jpg";
import Form from "./form";

function DefaultLayout({ children }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  const { handleOpenOrCloseForm } = useContext(HandleContext);
  return (
    <div id="default_wrap">
      <header>
        <div id="header_wrap">
          <div id="header_navbar" className="lg:w-9/12">
            <div id="header_navigation" className="hidden md:flex">
              <div className="navigation_item">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Home
                </NavLink>
              </div>
              <div className="navigation_item">
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  About
                </NavLink>
              </div>
              <div className="navigation_item">
                <NavLink
                  to="/product"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Product
                </NavLink>
              </div>
              <div className="navigation_item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact
                </NavLink>
              </div>
            </div>
            <div id="header_navigation--mb" className="block md:hidden">
              <label htmlFor="header_navigate--mb" id="header_navigation--icon">
                <ion-icon name="menu"></ion-icon>
              </label>
              <input type="checkbox" name="" id="header_navigate--mb" hidden />
              <div id="header_list_navigation--mb">
                <div className="navigation_item--mb">
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Home
                  </NavLink>
                </div>
                <div className="navigation_item--mb">
                  <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    About
                  </NavLink>
                </div>
                <div className="navigation_item--mb">
                  <NavLink
                    to="/product"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Product
                  </NavLink>
                </div>
                <div className="navigation_item--mb">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Contact
                  </NavLink>
                </div>
              </div>
            </div>
            <div id="header_control">
              {isLogin ? (
                <div id="logged_in">
                  <Link to="/user/profile">
                    <img src={default_img} alt="" className="avatar" />
                  </Link>
                </div>
              ) : (
                <div id="not_logged_in">
                  <span
                    className="btn btn__login--access"
                    onClick={() => {
                      handleOpenOrCloseForm("flex");
                    }}
                  >
                    sign in
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="content_wrap lg:w-9/12 m-auto">{children}</div>
      <footer>
        <div id="footer_wrap" className="h-96 md:h-48">
          <div
            id="footer_content"
            className="lg:w-9/12 m-auto grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="footer_list">
              <div className="footer_item">
                <ion-icon name="pin"></ion-icon>
                <span>459, Tôn Đức Thắng, Hòa Khánh Nam, Đà Nẵng</span>
              </div>
              <div className="footer_item">
                <ion-icon name="call"></ion-icon>
                <span>+84 0399388142</span>
              </div>
              <div className="footer_item">
                <ion-icon name="mail"></ion-icon>
                <span>Nhom3.ued.udn.vn@gmail.com</span>
              </div>
            </div>
            <div className="footer_list">
              <div className="footer_item">
                <span>About the company</span>
              </div>
              <div className="footer_item">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae repellendus explicabo, voluptatibus dolorum
                  exercitationem beatae, consectetur, ab deserunt porro modi
                  numquam voluptatum expedita fugiat eaque. Deserunt autem dolor
                  odio dicta.
                </span>
              </div>
              <div className="footer_item">
                <div id="social_network">
                  <ion-icon name="logo-facebook"></ion-icon>
                  <ion-icon name="logo-twitter"></ion-icon>
                  <ion-icon name="logo-linkedin"></ion-icon>
                  <ion-icon name="logo-github"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {!isLogin && <Form />}
    </div>
  );
}

export default DefaultLayout;
