import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { HandleContext } from "../../../index";

import SpinLayout from "../../defaultLayout/spin_layout";

function Children() {
  const { handleCustomPrice } = useContext(HandleContext);
  const { slug } = useParams();
  const [listProduct, setListProduct] = useState();
  const [pagination, setPagination] = useState([]);
  const [unActive, setUnActive] = useState(
    "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
  );
  const [active, setActive] = useState(
    "bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
  );
  const [indexPageActive, setIndexPageActive] = useState(1);

  // lấy tất cả sản phẩm của dữ liệu
  useEffect(() => {
    setIndexPageActive(1);
    axios
      .get(
        `${process.env.REACT_APP_URL_API}category/${
          slug == "nike" ? 1 : slug == "adidas" ? 2 : 3
        }/product`
      )
      .then((res) => {
        console.log(res.data);
        const pagination =
          res.data.length % 4 == 0
            ? res.data.length / 4
            : parseInt(res.data.length / 4) + 1;
        let listIndexPages = [];
        for (let index = 0; index < pagination; index++) {
          listIndexPages = [...listIndexPages, index + 1];
        }
        setPagination(listIndexPages);
        setListProduct(res.data);
      });
  }, [slug]);
  console.log(slug);
  return (
    <>
      {listProduct ? (
        <div>
          <div
            id="product_list"
            className="grid grid-cols-1 md:grid-cols-2 gap-16"
          >
            {listProduct.map((product, index) => {
              if (
                index >= indexPageActive * 4 - 4 &&
                index < indexPageActive * 4
              ) {
                return (
                  <Link
                    to={`/product/${slug}/detail?id=${product.product_id}`}
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
              }
            })}
          </div>
          <div className="flex justify-center pt-10 pb-10">
            <nav aria-label="Page navigation example">
              <ul className="flex list-style-none">
                <li className="page-item disabled cursor-pointer">
                  <span
                    className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Previous
                  </span>
                </li>
                {pagination.map((item, index) => {
                  // active -> thay đổi class
                  return (
                    <li
                      className="page-item active"
                      onClick={() => {
                        setIndexPageActive(+index + 1);
                      }}
                    >
                      <span
                        className={`${
                          +index + 1 === indexPageActive ? active : unActive
                        } page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 rounded cursor-pointer `}
                      >
                        {item}
                      </span>
                    </li>
                  );
                })}
                <li className="page-item cursor-pointer">
                  <span className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                    Next
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <SpinLayout />
      )}
    </>
  );
}

export default Children;
