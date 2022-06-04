import { useLayoutEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import SpinLayout from "../../defaultLayout/spin_layout";

import "./index.scss";

function ProductPage({ children }) {
  const { slug } = useParams();

  useLayoutEffect(() => {
    if (!Boolean(slug)) {
      window.location.replace(`${process.env.REACT_APP_URL_INDEX}product/nike`);
    }
  });
  return (
    <>
      <div id="product_wrap">
        <div id="product_navigate" className="hidden md:block">
          <div id="product_navigate--head">
            <h1>Danh sách thương hiệu</h1>
          </div>
          <div className="product_navigate--item">
            <NavLink
              to="/product/nike"
              className={({ isActive }) =>
                isActive
                  ? "product_navigate--item active"
                  : "product_navigate--item"
              }
            >
              nike
            </NavLink>
          </div>
          <div className="product_navigate--item">
            <NavLink
              to="/product/puma"
              className={({ isActive }) =>
                isActive
                  ? "product_navigate--item active"
                  : "product_navigate--item"
              }
            >
              puma
            </NavLink>
          </div>
          <div className="product_navigate--item">
            <NavLink
              to="/product/adidas"
              className={({ isActive }) =>
                isActive
                  ? "product_navigate--item active"
                  : "product_navigate--item"
              }
            >
              adidas
            </NavLink>
          </div>
        </div>
        <div id="children_wrap"> {slug && children}</div>
      </div>
    </>
  );
}

export default ProductPage;
