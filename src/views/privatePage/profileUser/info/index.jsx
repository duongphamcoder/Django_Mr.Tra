import { useContext, useLayoutEffect, useState } from "react";

import { HandleContext } from "../../../../index";

import axios from "axios";

function InforUser() {
  const { handleLogout } = useContext(HandleContext);

  const [phoneEdit, setPhoneEdit] = useState(true);
  const [nameEdit, setNameEdit] = useState(true);
  const [emailEdit, setEmailEdit] = useState(true);
  const [addressEdit, setAddessEdit] = useState(true);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useLayoutEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL_API}user/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((res) => {
        const { name, phone, email, address } = res.data;
        setPhone(phone);
        setEmail(email);
        setAddress(address);
        setName(name);
      });
  }, []);
  return (
    <div id="infor_wrap">
      <div className="grid grid-cols-2 gap-4">
        <div className="infor_item">
          <div className="infor_title">
            <span>Phone</span>
          </div>
          <div className="infor_title--value">
            <input
              type="text"
              value={phone}
              disabled={phoneEdit}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <ion-icon
              name="create"
              onClick={() => {
                setPhoneEdit(!phoneEdit);
              }}
            ></ion-icon>
          </div>
        </div>
        <div className="infor_item">
          <div className="infor_title">
            <span>name</span>
          </div>
          <div className="infor_title--value">
            <input
              type="text"
              value={name}
              disabled={nameEdit}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <ion-icon
              name="create"
              onClick={() => {
                setNameEdit(!nameEdit);
              }}
            ></ion-icon>
          </div>
        </div>
        <div className="infor_item">
          <div className="infor_title">
            <span>email</span>
          </div>
          <div className="infor_title--value">
            <input
              type="text"
              value={email}
              disabled={emailEdit}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <ion-icon
              name="create"
              onClick={() => {
                setEmailEdit(!emailEdit);
              }}
            ></ion-icon>
          </div>
        </div>
        <div className="infor_item">
          <div className="infor_title">
            <span>address</span>
          </div>
          <div className="infor_title--value">
            <input
              type="text"
              value={address}
              disabled={addressEdit}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <ion-icon
              name="create"
              onClick={() => {
                setAddessEdit(!addressEdit);
              }}
            ></ion-icon>
          </div>
        </div>
      </div>
      <div id="btn_handle--profile">
        <div className="btn infor_update--btn">
          <span>Update</span>
        </div>
        <div className="btn infor_logout--btn" onClick={handleLogout}>
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}

export default InforUser;
