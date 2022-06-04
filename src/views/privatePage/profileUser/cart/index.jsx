import { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { HandleContext } from "../../../../index";
function Cart() {
  const { handleCustomPrice } = useContext(HandleContext);

  // số lượng cần mua của 1 sản phẩm
  const [quatity, setQuatity] = useState("0");

  // số lượng sản phẩm cần thanh toán
  const [order_quantity, setOrderQuatity] = useState([]);
  const [test, setTest] = useState([
    {
      product_name: "hehehe",
      product_price: 100000,
      size: "42",
      quantity: 2,
    },
    {
      product_name: "hehehe",
      product_price: 100000,
      size: "42",
      quantity: 1,
    },
  ]);
  const [allProduct, setAllProduct] = useState([]);
  const [total, setTotal] = useState(0);

  useLayoutEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL_API}cart/${localStorage.getItem(
          "user_id"
        )}/cart-owner`
      )
      .then((res) => {
        setAllProduct(res.data);
      });
  }, []);

  return (
    <div id="cart_wrap">
      <div id="cart_header">
        <h1 className="text-4xl font-bold">Shopping cart</h1>
      </div>
      <div className="cart_content grid grid-cols-3 gap-4">
        <div className="cart--list-product col-span-2">
          {allProduct.map((item, index) => {
            if (!item.status) {
              return (
                <div
                  className={`cart_list-item flex justify-center border-t-2 py-7 ${
                    order_quantity.includes(index) && "active"
                  }`}
                  key={index}
                  onClick={() => {
                    setOrderQuatity((prev) => {
                      if (order_quantity.includes(index)) {
                        setTotal(
                          total -
                            parseInt(item.product.product_price) * item.quantity
                        );
                        return order_quantity.filter((item) => item != index);
                      }
                      setTotal(
                        parseInt(item.product.product_price) * item.quantity +
                          total
                      );
                      return [...prev, index];
                    });
                  }}
                >
                  <div
                    className="cart_list-item--image h-60 w-52 bg-center bg-origin-padding bg-cover bg-no-repeat rounded-lg"
                    style={{
                      backgroundImage: `url('${item.product.product_image}')`,
                    }}
                  ></div>
                  <div className="cart_list-product-content px-5 flex justify-between	">
                    <div className="cart_list-product-infor flex justify-between">
                      <div>
                        <div className="cart_list-product-infor--name">
                          <span>{item.product.product_name}</span>
                        </div>
                        <div className="cart_list-product-infor--size">
                          <span>size: {item.size.size_name}</span>
                        </div>
                        <div className="cart_list-product-infor--price">
                          <span>
                            {handleCustomPrice(
                              "" + parseInt(item.product.product_price)
                            )}
                            đ
                          </span>
                        </div>
                      </div>
                      <div className="cart_list-product--amount w-80 h-14 flex justify-center items-center ">
                        <div className="icon-handle-amount h-8">
                          <ion-icon name="remove"></ion-icon>
                        </div>
                        <input
                          type="text"
                          className="w-8	h-8"
                          value={item.quantity}
                          disabled={true}
                        />
                        <div className="icon-handle-amount h-8">
                          <ion-icon name="add"></ion-icon>
                        </div>
                      </div>
                    </div>
                    <div className="cart_list-product--delete-icon text-xl cursor-pointer	h-8">
                      <ion-icon name="close"></ion-icon>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="order_summary h-72">
          <div className="order_summary-header">
            <h2>Order summary</h2>
          </div>
          <div className="order_summary-item-detail">
            <span className="order-total-title">total</span>
            <span className="order-total-value">
              {handleCustomPrice(`${total}`)}đ
            </span>
          </div>
          <div className="order_summary-item-detail">
            <span className="order-total-title">quantity</span>
            <span className="order-total-value">{order_quantity.length}</span>
          </div>
          <div className="btn order_btn">
            <span>Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
