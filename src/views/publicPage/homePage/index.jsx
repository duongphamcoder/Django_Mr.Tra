import { useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpinLayout from "../../defaultLayout/spin_layout";

import { HandleContext } from "../../../index";
import axios from "axios";

import "./index.scss";

function HomePage() {
  const { handleCustomPrice } = useContext(HandleContext);
  const [listProduct, setListProduct] = useState();
  const [listCategory, setListCategory] = useState();
  useLayoutEffect(() => {
    const getListProduct = axios.get(
      `${process.env.REACT_APP_URL_API}product/outstanding-product`
    );
    const getCategory = axios.get(
      `${process.env.REACT_APP_URL_API}category/list-categories`
    );
    Promise.all([getCategory, getListProduct]).then((data) => {
      setListCategory(data[0].data);
      setListProduct(data[1].data);
    });
  }, []);

  console.log("Home re-render");
  return (
    <>
      {listProduct ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12" id="homePage">
          {listProduct.map((product, index) => {
            return (
              <Link
                to={`/product/${
                  product.category == 1 ? "nike" : "puma"
                }/detail?id=${product.product_id}`}
                className="block shadow-lg shadow-indigo-500/50 rounded-lg"
                key={product.product_id}
              >
                <div
                  className="product_image"
                  style={{
                    backgroundImage: `url('${product.product_image}')`,
                  }}
                ></div>
                <div className="product_info">
                  <div className="product_name h-8">
                    <span>{product.product_name}</span>
                  </div>
                  <div className="product_price">
                    <span>
                      {handleCustomPrice("" + product.product_price)}đ
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <SpinLayout />
      )}
    </>
  );
}

export default HomePage;
