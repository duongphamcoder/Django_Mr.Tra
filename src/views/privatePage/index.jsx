import { useLayoutEffect, useState } from "react";

function PrivatePage({ children }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  useLayoutEffect(() => {
    if (!isLogin) {
      console.log("Can phai login");
    } else {
      console.log("Da dang nhap");
    }
  }, []);
  return <>{children}</>;
}

export default PrivatePage;
