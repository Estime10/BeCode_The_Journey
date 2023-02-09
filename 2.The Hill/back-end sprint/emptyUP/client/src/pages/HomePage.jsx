import { NavLink } from "react-router-dom";
import axios from "axios";
import UploadLogo from "../components/UploadLogo";
import { LeafletContainer } from "../maps/leaflet-container";
import { LeafletMap } from "../maps/leaflet-map";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import FormReg from "../components/FormReg";
import FormLog from "../components/FormLog";
import FormLog1 from "../components/FormLog1";
import LoginButton from "../components/LoginButton";
import RegisterButton from "../components/RegisterButton";
import LoginPicto from "../components/LoginPicto";
import loupe from '../assets/loupe.png';

 import logonotext from '../assets/logonotext.png';

const HomePage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActive1, setModalActive1] = useState(false);
  const [modalActiveLog, setModalActiveLog] = useState(false);
  const [modalActiveLog1, setModalActiveLog1] = useState(false);
  const [modalActiveReg, setModalActiveReg] = useState(false);
  const [modalActiveReg1, setModalActiveReg1] = useState(false);

  const onClickLog = () => {
    setModalActive(false);
    setModalActiveLog(true);
  };

  const onClickReg = () => {
    setModalActive(false);
    setModalActiveReg(true);
  };

  const onClickLog1 = () => {
    setModalActive1(false);
    setModalActiveLog1(true);
  };

  const onClickReg1 = () => {
    setModalActive1(false);
    setModalActiveReg1(true);
  };

  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getAllBuildings();
  }, []);

  useEffect(() => {
    console.log(buildings);
  }, [buildings]);

  const getAllBuildings = async () => {
    try {
      const response = await axios.get("/api/building", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const buildingsData = response.data.data;

      const buildingsAll = buildingsData.map((building) => {
        const date = new Date(building.dateofpost);
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const dateofpost = date
          .toLocaleDateString("en-GB", options)
          .replace(/\//g, "/");
        const id = building.id;
        const adress = building.adress;
        const city = building.city;
        const type = building.type;
        const zipcode = building.zipcode;
        const admin_id = building.admin_id;
        const lat = building.lat;
        const lon = building.lon;
        const initial_image = building.initial_image;
        return {
          id,
          adress,
          zipcode,
          city,
          type,
          dateofpost,
          admin_id,
          lat,
          lon,
          initial_image,
        };
      });
      setBuildings(buildingsAll);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-custom1  h-screen w-screen flex flex-col box-border m-0 p-0 ">
      <div className="flex h-1/12 w-full box-border justify-between px-5 p-3 items-center ">
        <NavLink className=" w-2/6 " to="/filters" >
          <button
              className="rounded-full p-1 hover:shadow "
          >
            <img src= {loupe} alt="loupe" className=" h-6  w-6" />
          </button>
        </NavLink>
         <div  className=" w-2/6 flex justify-center items-center h-full box-border font-bold">
          <p className="font-bold font-custom2 cursor-default text-3xl text-left " alt="back to map">
            Empty.up
          </p>
          <img src= {logonotext} alt="logo" className=" ml-3 h-6 " />
        </div>
        <LoginPicto setActive={setModalActive1} />
        <Modal
          className="z-1"
          active={modalActive1}
          setActive={setModalActive1}
        >
          <p className="z-1 flex justify-center text-base">
            You need to register and login{" "}
          </p>
          <div className=" z-1 flex justify-around">
            <LoginButton onClick={onClickLog1} />
            <RegisterButton onClick={onClickReg1} />
          </div>
        </Modal>

        <Modal
          className=" z-1 "
          active={modalActiveLog1}
          setActive={setModalActiveLog1}
        >
          <FormLog1 />
        </Modal>
        <Modal
          className=" z-1 "
          active={modalActiveReg1}
          setActive={setModalActiveReg1}
        >
          <FormReg
            onSubmit={(event) => {
              event.preventDefault();
              setModalActiveReg1(false);
              setModalActiveLog1(true);
            }}
          />
        </Modal>
      </div>
      <div className=" h-5/6  ">
        <LeafletContainer>
          <LeafletMap 
          buildings={buildings} 
          />
        </LeafletContainer>
      </div>

      <footer className="h-1/12 flex justify-center">
        <UploadLogo setActive={setModalActive} className="cursor-pointer" />
        <Modal active={modalActive} setActive={setModalActive}>
          <p className="flex justify-center text-base">
            First, You need to register and login{" "}
          </p>
          <div className="flex justify-around">
            <LoginButton onClick={onClickLog} />
            <RegisterButton onClick={onClickReg} />
          </div>
        </Modal>

        <Modal active={modalActiveLog} setActive={setModalActiveLog}>
          <FormLog />
        </Modal>
        <Modal active={modalActiveReg} setActive={setModalActiveReg}>
          <FormReg
            onSubmit={(event) => {
              event.preventDefault();
              setModalActiveReg(false);
              setModalActiveLog(true);
            }}
          />
        </Modal>
      </footer>
    </div>
  );
};

export default HomePage;
