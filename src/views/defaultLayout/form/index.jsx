import "./index.scss";
import image_shop from "./image_shop.jpg";
import LoginForm from "./login/formLogin";
import RegisterFomr from "./register/register";
import { useContext, useState, memo } from "react";

import { HandleContext } from "../../../index";
function Form() {
  const [form, setForm] = useState(false);
  const { handleOpenOrCloseForm } = useContext(HandleContext);
  console.log("Form re-render");
  return (
    <div
      id="form_overlay"
      onClick={(e) => {
        handleOpenOrCloseForm("none");
      }}
    >
      <div
        id="form_overlay--layout"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          id="image_shop"
          style={{ backgroundImage: `url('${image_shop}')` }}
        ></div>
        <div id="form_submit">
          <div id="form_icon_close">
            <ion-icon
              name="close"
              onClick={() => {
                handleOpenOrCloseForm("none");
              }}
            ></ion-icon>
          </div>
          {!form ? (
            <LoginForm registerPage={setForm} />
          ) : (
            <RegisterFomr loginPage={setForm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Form);
