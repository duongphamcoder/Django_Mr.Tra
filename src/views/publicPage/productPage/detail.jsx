import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { HandleContext } from "../../../index";

function DetailProduct() {
  const { handleCustomPrice, handleCheckLogin, handleAddToCart } =
    useContext(HandleContext);
  const [param, setParam] = useSearchParams();
  const [product, setProduct] = useState();
  const [sizeProduct, setSizeProduct] = useState();
  const [chooseSize, setChooseSize] = useState();
  const [amountSize, setAmountSize] = useState();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const product = axios.get(
      `${process.env.REACT_APP_URL_API}product/${param.get("id")}`
    );
    const sizes = axios.get(`${process.env.REACT_APP_URL_API}size/list-size`);

    Promise.all([product, sizes]).then((data) => {
      setProduct({
        ...data[0].data,
        product_price: `${handleCustomPrice("" + data[0].data.product_price)}`,
      });
      setSizeProduct(data[1].data);
    });
  }, []);

  const handleChangeQuantity = (step) => {
    setQuantity((prev) => {
      if (prev + step < 0) {
        return 0;
      }
      return prev + step;
    });
  };

  return (
    <>
      {product && (
        <div id="detail_product--wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              id="detail_product--image"
              className="h-80 rounded-lg"
              style={{ backgroundImage: `url('${product.product_image}')` }}
            ></div>
            <div className=" detail_product--content">
              <div id="detail_product--name" className="font-bold text-xl">
                <h1>{product.product_name}</h1>
              </div>
              <div id="detail_product--price" className="text-2xl pt-3">
                <h1>{product.product_price}đ</h1>
              </div>
              <div
                id="detail_product--desc"
                className="text-base pt-3 max-h-20"
              >
                <span title={product.product_description}>
                  {product.product_description}
                </span>
              </div>
              <div
                id="detail_product--size"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {sizeProduct.map((size) => {
                  return (
                    <span
                      className={`btn btn-size ${
                        chooseSize == size.size_id && "active"
                      }`}
                      key={size.size_id}
                      onClick={() => {
                        setChooseSize(size.size_id);
                      }}
                    >
                      {size.size_name}
                    </span>
                  );
                })}
              </div>
              <div className="product_quantity_btn text-center py-6 ">
                <ion-icon
                  name="remove"
                  className="p-2.5"
                  onClick={() => {
                    handleChangeQuantity(-1);
                  }}
                ></ion-icon>
                <input
                  type="text"
                  className="w-10 text-center border-black border	rounded-lg	border-solid	"
                  id=""
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(+e.target.value);
                  }}
                />
                <ion-icon
                  name="add"
                  className="p-3"
                  onClick={() => {
                    handleChangeQuantity(+1);
                  }}
                ></ion-icon>
              </div>
              <div
                className="btn add_to_cart_btn"
                onClick={() => {
                  if (handleCheckLogin()) {
                    handleAddToCart({
                      user: +localStorage.getItem("user_id"),
                      product: +param.get("id"),
                      quantity: quantity,
                      size: chooseSize,
                    });
                  }
                }}
              >
                <span>Add to cart</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailProduct;
