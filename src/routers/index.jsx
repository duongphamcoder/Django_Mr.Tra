import HomePage from "../views/publicPage/homePage";
import ProductPage from "../views/publicPage/productPage";
import Children from "../views/publicPage/productPage/children";
import DetailProduct from "../views/publicPage/productPage/detail";
import ConTact from "../views/publicPage/contact";
import ProfileUser from "../views/privatePage/profileUser";
import InforUser from "../views/privatePage/profileUser/info";
import Setting from "../views/privatePage/profileUser/setting";
import Cart from "../views/privatePage/profileUser/cart";

/*
  status: 0 -> đường dẫn không cần đăng nhập
  status: 1 -> đường dẫn cần phải đăng nhập
*/

export const pages = [
  {
    path: "/",
    component: HomePage,
    status: 0,
  },
  {
    path: "/product",
    component: ProductPage,
    status: 0,
  },
  {
    path: "/product/:slug",
    component: Children,
    status: 0,
    childrenOf: ProductPage,
  },
  {
    path: "/product/:slug/detail",
    component: DetailProduct,
    status: 0,
    childrenOf: ProductPage,
  },
  { path: "/contact", component: ConTact, status: 0 },
  {
    path: "/user/profile",
    component: InforUser,
    status: 1,
    childrenOf: ProfileUser,
  },
  {
    path: "/user/cart",
    component: Cart,
    status: 1,
    childrenOf: ProfileUser,
  },
  {
    path: "/user/setting",
    component: Setting,
    status: 1,
    childrenOf: ProfileUser,
  },
];
