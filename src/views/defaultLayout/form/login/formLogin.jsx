import "../index.scss";
import "./formLogin.scss";

import { HandleContext } from "../../../../index";
import { useContext, useState } from "react";

function LoginForm({ registerPage }) {
  const { handleLogin } = useContext(HandleContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log("Login re-render");
  return (
    <div id="form_list">
      <div id="form_header">
        <h1>Sign in to your account</h1>
      </div>
      <div id="form_item">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          id="username"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div id="form_item">
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          id="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div id="form_control">
        <div id="memorize_account">
          <input type="checkbox" name="" id="memorize" />
          <label htmlFor="memorize">Remember me</label>
        </div>
        <div
          id="redirect_signup_form"
          onClick={() => {
            registerPage(true);
          }}
        >
          <span>sign up</span>
          <ion-icon name="arrow-forward"></ion-icon>
        </div>
      </div>
      <div
        className="btn btn_submit_form"
        onClick={() => {
          handleLogin({ username, password });
        }}
      >
        <span>Sign in</span>
      </div>
    </div>
  );
}

export default LoginForm;
