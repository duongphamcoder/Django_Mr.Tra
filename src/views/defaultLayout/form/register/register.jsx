import { useContext, useState } from "react";
import { HandleContext } from "../../../../index";

function RegisterFomr({ loginPage }) {
  const { handleSigUp } = useContext(HandleContext);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  console.log("Register re-render");
  return (
    <div id="form_list">
      <div id="form_header">
        <h1>Sign in account</h1>
      </div>
      <div id="form_item">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          name=""
          id="username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div id="form_item">
        <label htmlFor="password">password</label>
        <input
          type="password"
          name=""
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div id="form_item">
        <label htmlFor="conf_password">Confirm password</label>
        <input
          type="password"
          name=""
          id="conf_password"
          value={conf_password}
          onChange={(e) => {
            setConfPassword(e.target.value);
          }}
        />
      </div>
      <div id="form_item">
        <label htmlFor="email">email</label>
        <input
          type="text"
          name=""
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div id="form_item">
        <label htmlFor="phone_number">phone number</label>
        <input
          type="text"
          name=""
          id="phone_number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <div id="form_control">
        <div id="memorize_account"></div>
        <div
          id="redirect_signup_form"
          onClick={() => {
            loginPage(false);
          }}
        >
          <span>sign in</span>
          <ion-icon name="arrow-forward"></ion-icon>
        </div>
      </div>
      <div
        className="btn btn_submit_form"
        onClick={() => {
          const Obj = {
            username,
            password,
            conf_password,
            email,
            phone,
            role: "USER_ROLE",
            address: "459, Ton Duc Thang, Hoa Khanh Nam, Lien Chieu, Da Nang",
            name: "Nguyen Van A",
          };

          handleSigUp(Obj);
        }}
      >
        <span>Sign up</span>
      </div>
    </div>
  );
}

export default RegisterFomr;
