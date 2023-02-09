import "../App.css";
import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { LeafletContainer } from "../maps/formMap/leaflet-container";
import { LeafletMap } from "../maps/formMap/leaflet-map";
import { LeafletContainer1 } from "../maps/formMap/formUserLoc/leaflet-container";
import { LeafletMap1 } from "../maps/formMap/formUserLoc/leaflet-map";
import { Popup } from "react-leaflet";
import UploadLogo from "../components/UploadLogo";
import SearchButton from "../components/SearchButton";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import LogoutButton from "../components/LogoutButton";
import Logonotext from "../assets/logonotext.png";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const inputRefCity = useRef();
  const inputRefZipcode = useRef();
  const inputRefAddress = useRef();
  const inputRefType = useRef();
  const [image, setImage] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  //const [marker, setMarker] = useState([]);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const address =
      inputRefZipcode.current.value +
      " " +
      inputRefAddress.current.value +
      ", " +
      inputRefCity.current.value;

    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
      )
      .then((response) => {
        if (response.data[0]) {
          console.log(response.data[0]);
          const { lat, lon } = response.data[0];
          setCoordinates({ lat, lon });
          //console.log(coordinates);

          const formData = new FormData();
          formData.append("image", image);
          formData.append("city", inputRefCity.current.value);
          formData.append("zipcode", inputRefZipcode.current.value);
          formData.append("adress", inputRefAddress.current.value);
          formData.append("lat", response.data[0].lat);
          formData.append("lon", response.data[0].lon);
          formData.append("type", inputRefType.current.value);

          axios
            .post("/api/addbuilding", formData)
            .then((response) => {
              console.log(response);
              // setIsSubmitting(false);
            })
            .catch((error) => {
              console.log(error);
              // setIsSubmitting(false);
            });
        } else {
          console.error("No data returned from API request");
        }
      });
  };

  const logout = async () => {
    try {
      const response = await axios.get("api/user/logout", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="font-custom1  h-screen w-screen flex flex-col m-0 p-0">
      <div className="flex h-1/12 w-full box-border justify-between px-5 p-3 items-center ">
        <Logo />
        <LogoutButton onClick={logout} />
      </div>

      <h3 className="h-1/6 m-1 uppercase text-black font-bold text-5xl flex items-center justify-center">
        UPLOAD A SPACE
      </h3>

      <div className="h-4/6 w-full flex box-border items-center justify-around  ">
        <Form
          onSubmit={onSubmit}
          className="w-1/4  flex flex-col justify-center  items-center font-bold text-xl"
        >
          <div className="flex w-full flex-col items-center">
            <Form.Group
              className="flex w-52 p-1 justify-start"
              controlId="image"
            >
              <Form.Label>Image: </Form.Label>
              <Form.Control
                type="file"
                className="text-xs font-normal  h-6 "
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    setImage(event.target.files[0]);
                    console.log(event.target.files[0]);
                    //URL.createObjectURL(event.target.files[0])
                  }
                }}
              />
            </Form.Group>
            <Form.Group
              className="flex p-1 w-52 justify-between"
              controlId="city"
            >
              <Form.Label>City:</Form.Label>
              <Form.Control
                className="text-xs font-normal w-32 h-6 border rounded-xl p-1 px-3"
                type="text"
                ref={inputRefCity}
                placeholder="Enter your city"
              />
            </Form.Group>

            <Form.Group
              className="flex p-1 w-52 justify-between"
              controlId="zipcode"
            >
              <Form.Label>Zipcode: </Form.Label>
              <Form.Control
                className="text-xs font-normal w-32 h-6 border rounded-xl p-1 px-3 "
                type="text"
                ref={inputRefZipcode}
                placeholder="Enter your zipcode"
              />
            </Form.Group>

            <Form.Group
              className="flex p-1  w-52 justify-between"
              controlId="address"
            >
              <Form.Label>Address: </Form.Label>
              <Form.Control
                className="text-xs font-normal w-32 h-6 border rounded-xl p-1 px-3 "
                type="text"
                ref={inputRefAddress}
                placeholder="Enter your address"
              />
            </Form.Group>

            <Form.Group
              className="flex w-52 p-1 justify-between"
              controlId="typeSelect"
            >
              <Form.Label>Type: </Form.Label>
              <select
                className="text-xs w-24 h-5  font-normal"
                ref={inputRefType}
              >
                <option className="text-xs font-normal" value="All"></option>
                <option className="text-xs font-normal" value="Housing">
                  Housing
                </option>
                <option className="text-xs font-normal" value="Gardens">
                  Gardens
                </option>
                <option className="text-xs font-normal" value="Factories">
                  Factories
                </option>
                <option className="text-xs font-normal" value="Offices">
                  Offices
                </option>
                <option className="text-xs font-normal" value="Multiple">
                  Multiple
                </option>
              </select>
            </Form.Group>
          </div>

          <Button
            className="text-xl rounded-2xl p-3 mt-28 border "
            type="submit"
          >
            Add a building
          </Button>
        </Form>

        <div className="w-2/3 h-5/6 mr-10 flex box-border overflow:hidden truncate ">

        {coordinates.lat === 0 && coordinates.lon === 0 && (
        <LeafletContainer1 className="object-cover h-full w-full font-Custom1">
          <LeafletMap1>
            <Popup className="popup">
              Your position is here
            </Popup>
        </LeafletMap1>
      </LeafletContainer1>
          )}               

          {coordinates.lat !== 0 && coordinates.lon !== 0 && (
        <LeafletContainer className="object-cover h-full w-full font-Custom1" center={[coordinates.lat, coordinates.lon]} zoom={13}>
          <LeafletMap coordinates={coordinates} onClick={() => setPopup(true)}>
            <Popup className="popup">
              {image && (
                <img
                  src={image}
                  alt="selected photo"
                  style={{ width: "150px", height: "150px" }}
                />
              )}
              <p>City: {inputRefCity.current.value}</p>
              <p>Zipcode: {inputRefZipcode.current.value}</p>
              <p>Address: {inputRefAddress.current.value}</p>
              <p>Type: {inputRefType.current.value}</p>
            </Popup>
        </LeafletMap>
      </LeafletContainer>
          )}
        </div>
      </div>

      <footer className="h-1/12  pt-4 flex justify-center">
        <div className=" rounded-3xl p-1 px-3 flex items-center justify-start text-center text-black font-bold text-lg w-30 mb-4 ">
          <img
            src={Logonotext}
            alt="Logo"
            className=" p-1 w-7 flex  justify-center font-bold item-center   "
          />
        </div>
      </footer>
    </div>
  );
};

export default UploadPage;
