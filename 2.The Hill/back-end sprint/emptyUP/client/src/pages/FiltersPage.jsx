import UploadLogo from "../components/UploadLogo";
import { LeafletContainer } from "../maps/leaflet-container";
import { LeafletMap } from "../maps/leaflet-map";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import RegisterButton from "../components/RegisterButton";
import LoginButton from "../components/LoginButton";
import Modal from "../components/Modal";
import LoginPicto from "../components/LoginPicto";
import FormLog from "../components/FormLog";
import FormReg from "../components/FormReg";
import FormLog1 from "../components/FormLog1";
import Search from "../components/Search";
import loupe from '../assets/loupe.png';


const FiltersPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActive1, setModalActive1] = useState(false);
  const [modalActiveLog, setModalActiveLog] = useState(false);
  const [modalActiveLog1, setModalActiveLog1] = useState(false);
  const [modalActiveReg, setModalActiveReg] = useState(false);
  const [modalActiveReg1, setModalActiveReg1] = useState(false);
  const [input, setInput] = useState("Fill in the field needed for search");

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

  const inputRefCity = useRef();
  const inputRefZipcode = useRef();
  const inputRefType = useRef();

  const getAllBuildings = async () => {
    try {
      const response = await axios.get("/api/building", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const buildingsData = response.data.data;

      const buildingsAll = buildingsData.map((building) => {
        const dateofpost = building.dateofpost;
        const id = building.id;
        const adress = building.adress;
        const city = building.city;
        const type = building.type;
        const zipcode = building.zipcode;
        const admin_id = building.admin_id;
        const position = building.position;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const city = inputRefCity.current.value;
    const zipcode = inputRefZipcode.current.value;
    const type = inputRefType.current.value;

    try {
      if (city) {
        const response = await axios.get(`/api/building/city/${city}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const buildingsFilteredCity = response.data;
        setBuildings(buildingsFilteredCity);
        setInput(`Buildings in ${city}`);
        console.log(buildingsFilteredCity);
        document.getElementById("inputCity").value = "";
      }

      if (zipcode) {
        const response = await axios.get(`/api/building/zipcode/${zipcode}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const buildingsFilteredZipcode = response.data;
        setBuildings(buildingsFilteredZipcode);
        setInput(`Buildings in ${zipcode}`);
        console.log(buildingsFilteredZipcode);
        document.getElementById("inputZipcode").value = "";
      }

      if (type) {
        console.log(type);
        const response = await axios.get(`/api/building/type/${type}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const buildingsFilteredType = response.data;
        setBuildings(buildingsFilteredType);
        setInput(`${type}`);
        console.log(buildingsFilteredType);
        document.getElementById("inputType").value = "";
      }
    } catch (error) {
      console.log(error);
      setInput(`No spaces found`);
    }
  };

  return (
    <div className="font-custom1 box-border h-screen w-screen flex flex-col m-0 p-0">
      <div className="flex h-1/12 w-full box-border justify-between px-5 p-3 items-center ">
          <Logo />
          <form
            className="w-2/6  flex justify-between   mx-10 px-10 box-border items-center w-1/2"
            style={{ width: "100vw" }}
            onSubmit={handleSubmit}
          >

          <h4 className="font-bold text-sm italic ">
          City:
          </h4>
          <input
                id="inputCity"
                className="inputCity italic rounded-lg h-4 bg-slate-50 text-xs mr-10 text-blue-800 shadow-inner  text-center"
                type="text"
                placeholder="Enter your city"
                ref={inputRefCity}
          />
          <h4 className="font-bold text-sm italic ">
          Zipcode:
          </h4>
          <input
                  id="inputZipcode"
                  className="inputCity italic rounded-lg h-4 bg-slate-50 mr-11 text-xs  text-blue-800 shadow-inner  text-center"
                  type="text"
                  placeholder="Enter your zipcode"
                  ref={inputRefZipcode}
          />
          <h4 className="font-bold text-sm italic pr-2 ">
          Type:
          </h4>
          <select ref={inputRefType}
              id="inputType"
              className="  rounded-lg h-4 bg-slate-200  text-xs  text-center"
          >
                  <option value=""></option>
                  <option value="All">All</option>
                  <option value="Housing">Housing</option>
                  <option value="Gardens">Gardens</option>
                  <option value="Factories">Factories</option>
                  <option value="Offices">Offices</option>
          </select>
          <button
              type="submit"
              className="rounded-full p-1 hover:shadow "
          >
            <img src= {loupe} alt="loupe" className=" h-6  w-6" />
          </button>
        </form>

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

      <h4 className="font-bold text-xl pr-2 text-center">
          {input}
          </h4>

      <div className=" h-5/6   ">
        <LeafletContainer>
          <LeafletMap buildings={buildings} />
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

export default FiltersPage;
