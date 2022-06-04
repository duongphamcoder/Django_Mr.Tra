import { useLayoutEffect, useState } from "react";
import axios from "axios";

import "./index.scss";

import ava from "../../defaultLayout/img/ava.jpg";
import { NavLink } from "react-router-dom";

function ProfileUser({ children }) {
  const [name, setName] = useState("");
  useLayoutEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL_API}user/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((res) => {
        const { name } = res.data;

        setName(name);
      });
  }, []);

  return (
    <div id="profile_wrap">
      <div id="profile_header">
        <div
          id="profile_header_avatar"
          style={{
            backgroundImage:
              "url('https://c4.wallpaperflare.com/wallpaper/677/79/638/kuroko-no-basket-basketball-wallpaper-preview.jpg')",
          }}
        >
          <div style={{ backgroundImage: `url('${ava}')` }}></div>
        </div>
        <div id="profile_username">
          <h1>{name}</h1>
        </div>
        <div id="profile_nav">
          <div className="navigation_item">
            <NavLink
              to="/user/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </div>
          <div className="navigation_item">
            <NavLink
              to="/user/cart"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Cart
            </NavLink>
          </div>
          <div className="navigation_item">
            <NavLink
              to="/user/setting"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              setting
            </NavLink>
          </div>
        </div>
      </div>
      <div id="profile_content--wrap">{children}</div>
    </div>
  );
}

export default ProfileUser;
