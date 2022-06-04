import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";

// xử lý dóng mở form đăng nhập và đăng ký
const handleOpenOrCloseForm = (display) => {
  const form_overlay = document.getElementById("form_overlay");
  form_overlay.style.display = `${display}`;
};

// xử lý kiểm tra đăng nhập
const handleCheckLogin = () => {
  if (!Boolean(localStorage.getItem("isLogin"))) {
    handleOpenOrCloseForm("flex");
    return false;
  }
  return true;
};

// xử lý đăng nhập
const handleLogin = (Obj) => {
  if (!Boolean(Obj.username) || !Boolean(Obj.password)) {
    Swal.fire({
      icon: "error",
      text: "Vui lòng nhập đầy đủ....",
      timer: 1100,
    });
  } else {
    axios
      .post(`${process.env.REACT_APP_URL_API}user/signin`, Obj)
      .then((res) => {
        if (Boolean(res.data.user_id)) {
          Swal.fire({
            icon: "success",
            text: "Đăng nhập thành công...",
            timer: 1100,
          });
          localStorage.setItem("isLogin", true);
          localStorage.setItem("user_id", res.data.user_id);
          setTimeout(() => {
            window.location.replace(window.location.href);
          }, 1100);
        } else {
          Swal.fire({
            icon: "error",
            text: "Tài khoản hoặc mật khẩu không đúng....",
            timer: 1100,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: "Có lỗi trong quá trình xử lý....",
          timer: 1100,
        });
      });
  }
};

// xử lý đăng ký
const handleSigUp = (Obj) => {
  if (
    !Boolean(Obj.username) ||
    !Boolean(Obj.password) ||
    !Boolean(Obj.conf_password) ||
    !Boolean(Obj.address) ||
    !Boolean(Obj.phone) ||
    !Boolean(Obj.email)
  ) {
    Swal.fire({
      icon: "error",
      text: "Vui lòng nhập đầy đủ thông tin....",
    });
  } else if (Obj.password !== Obj.conf_password) {
    Swal.fire({
      icon: "error",
      text: "Mật khẩu xác nhận không đúng....",
    });
  } else {
    fetch(`${process.env.REACT_APP_URL_API}user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Obj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Boolean(data.user_id)) {
          Swal.fire({
            icon: "success",
            text: "Đăng ký thành công....",
            timer: 1100,
          });
          localStorage.setItem("isLogin", true);
          localStorage.setItem("user_id", data.user_id);
          setTimeout(() => {
            window.location.replace(window.location.href);
          }, 1100);
        } else {
          Swal.fire({
            icon: "error",
            text: "Đăng ký không thành công....",
            timer: 1100,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// custom giá tiền
const handleCustomPrice = (price = "3519000") => {
  let temp_price = price;
  const price_length = price.length;
  let index_dots = price_length - 3;
  while (index_dots > 0) {
    const temp1 = temp_price.substring(0, index_dots);
    const temp2 = temp_price.substring(index_dots);
    temp_price = `${temp1}.${temp2}`;
    index_dots -= 3;
  }
  return temp_price;
};

// xử lý đăng xuất
const handleLogout = () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("user_id");

  Swal.fire({
    icon: "success",
    text: "Logout success....",
    timer: 1100,
  });
  setTimeout(() => {
    window.location.replace("http://localhost:3000/");
  }, 1100);
};

// xử lý thêm vào giỏ hàng
const handleAddToCart = (Obj) => {
  if (!Boolean(Obj.quantity)) {
    Swal.fire({
      icon: "error",
      text: "Vui lòng nhập số lượng....",
      timer: 1100,
    });
  } else if (!Boolean(Obj.size)) {
    Swal.fire({
      icon: "error",
      text: "Vui lòng chọn size giày....",
      timer: 1100,
    });
  } else {
    // console.log(Obj)
    axios
      .post(`${process.env.REACT_APP_URL_API}cart/create-cart`, Obj)
      .then((res) => {
        console.log(res.data);
      });
  }
};

// xử lý thanh toán
const handlePayment = (Obj) => {
  // axios.post(`${process.env.REACT_APP_URL_API}bill/create-bill`, {
  //   user: Obj.user_id,
  //   total:Obj.total
  // }).then(res => {
  //   const data = res.data
  //   axios.post(`${process.env.REACT_APP_URL_API}bill-detail/create-bill-detail`,{
  //     bill:data.
  //   })
  // })
};

export default {
  handleOpenOrCloseForm,
  handleSigUp,
  handleCustomPrice,
  handleLogout,
  handleLogin,
  handleCheckLogin,
  handleAddToCart,
};
