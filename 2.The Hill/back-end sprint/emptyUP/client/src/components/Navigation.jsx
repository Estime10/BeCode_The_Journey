import { NavLink } from "react-router-dom";
import Filters from "../assets/Filters.png";
import SearchButton from "../components/SearchButton";
import Modal from "../components/Modal";
import FormReg from "../components/FormReg";
import FormLog from "../components/FormLog";
import "../App.css";
import React, { useState } from "react";
import LoginPicto from "../components/LoginPicto"
import LoginButton from "../components/LoginButton"
import RegisterButton from "../components/RegisterButton"

const Navigation = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActive1, setModalActive1] = useState(false);
const [modalActiveLog, setModalActiveLog] = useState(false);
  const [modalActiveReg, setModalActiveReg] = useState(false);

  const onClickLog = () => {
    setModalActive(false);
    setModalActiveLog(true);
  };

  const onClickReg = () => {
    setModalActive(false);
    setModalActiveReg(true);
  };

  return (
    <div className="flex flex-row justify-between w-full p-2 box-border">
    <NavLink to="/filters">
    <img src={Filters} alt="filters bar" className="hover:scale-125" style={{ height: '30px', }} />
    </NavLink>
    <SearchButton setActive={setModalActive} />
    <Modal active={modalActive} setActive={setModalActive}>
    <input value="text" />
    </Modal>








    </div>
  );
};

export default Navigation;
