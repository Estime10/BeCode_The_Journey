import { NavLink, useNavigate } from "react-router-dom";
import Heart from "../assets/heart.svg";
import Megaphone from "../assets/Megaphone.svg";
import MessageIcon from "../assets/MessageIcon.svg";
import uploadpicto from "../assets/uploadpicto.png";
import LogoutButton from "../components/LogoutButton";
import Logo from "../components/Logo";
import UploadLogo from "../components/UploadLogo";
import { useRef, useState, useEffect } from "react";
import Modal from "../components/Modal";
import {useParams } from "react-router-dom";
import UnsubscribeButton from "../components/UnsubscribeButton"
import YesButton from "../components/YesButton"
import NoButton from "../components/NoButton"
import DownloadPicture from "../components/DownloadPicture"
import axios from "axios";
import Arrow from "../components/Arrow"


const ProfilePage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActiveYes, setModalActiveYes] = useState(false);
  const [showPicture, setshowPicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/user/profile", {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const dat = response.data.data;
        const newPicture = {
          content: dat.profilpicture_url,
          id: dat.id,
          username: dat.username,
        };
        setshowPicture(newPicture)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onClickYes = () => {
    setModalActive(false);
    setModalActiveYes(true);
  };

  const onClickNo = () => {};

  const username = showPicture.username;
  const content = showPicture.content;
  const id = showPicture.id;

  console.log(id)

  const logout = async () => {
    try {
      const response = await axios.get("api/user/logout", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(response)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen font-custom1  w-screen flex flex-col box-border ">
      <div className="flex h-1/12 w-full box-border justify-between px-5 p-3 items-center ">
        <Logo />
        
        <LogoutButton url={content} onClick={logout} />
      </div>


      <h3 className="font-custom1 border-box cursor-default uppercase text-black box-border h-1/6 font-bold text-5xl flex items-center justify-center">
         WELCOME {username}
      </h3>


      <div className="flex h-full w-full justify-between h-4/6 border-box  ">

        <div className="h-11/12 w-1/2 bg-slate-50 rounded-lg  pr-5 mx-5 flex-col flex    ">

          <div className=" flex h-full items-center">
            <DownloadPicture />
            <div className="h-60 w-86  flex bg-white border-white shadow overflow:hidden rounded-full truncate">
              <img src= {content} className=" object-cover w-96 h-96 font-Custom1" />
          </div>
        </div>


        </div>

        <div className="flex h-full w-1/2 flex-wrap p-5 px-28 justify-between">
            <NavLink to="/favorites" className="">
                <button className=" border h-48 w-48 shadow rounded-xl m-1 hover:bg-blue-800 hover:text-white font-bold cursor-pointer p-2 flex flex-col justify-around items-center">
                  <p className="text-sm  "> SEE YOUR</p>
                  <img src={Heart} alt="back" className="flex box-border" style={{ height: '30px', marginTop :'2px'}}/>
                  <h4 className="text-2xl  "> FAVORITES  </h4>
                  <p className="text-sm "> SPACES </p>
                  </button>
            </NavLink>


            <button onClick={() => navigate(`/uploaded`)} className="border h-48 w-48 shadow rounded-xl m-1 hover:bg-blue-800 hover:text-white font-bold cursor-pointer p-2 flex flex-col justify-around items-center">
                <p className="text-sm  "> SEE YOUR</p>
                <img src={uploadpicto} alt="upload" className="flex box-border" style={{ height: '30px', marginTop :'2px'}}/>
                <h4 className="text-2xl  "> UPLOADED  </h4>
                <p className="text-sm  "> SPACES </p>
            </button>


            <NavLink to="/announcements" className="">
                <button className=" border h-48 w-48 shadow rounded-xl m-1 hover:bg-blue-800 hover:text-white font-bold cursor-pointer p-2 flex flex-col justify-around items-center">
                  <p className="text-sm "> SEE THE</p>
                  <img src={Megaphone} alt="megaphone" className="flex box-border" style={{ height: '30px', marginTop :'2px'}}/>
                  <h4 className="text-2xl "> POSTS  </h4>
                  <p className="text-sm text-left  ">OF COMMUNITY </p>
                </button>
            </NavLink>

            <NavLink to="/discussions">
                <button className=" border h-48 w-48 shadow rounded-xl m-1 hover:bg-blue-800 hover:text-white font-bold cursor-pointer p-2 flex flex-col justify-around items-center">
                  <p className="text-sm"> SEE YOUR
                  </p>
                  <img src={MessageIcon} alt="message" className="flex box-border" style={{height: '30px', marginTop :'2px'}}/>
                  <h4 className="text-2xl "> DISCUSSIONS
                  </h4>
                  <p className="text-sm text-left">WITH COMMUNITY
                  </p>
                </button>
            </NavLink>
          </div>

        </div>

<div className="h-1/12 w-full p-0 m-0 box-border flex">
            <UnsubscribeButton setActive={setModalActive} />
            <Modal active={modalActive} setActive={setModalActive}>
                <p className="flex justify-center py-5 text-base">Are you sure you want to unsubscribe from EmptyUp ?
                </p>
                <div className="flex px-10 py-5 justify-around">
                  <YesButton onClick={onClickYes}/>
                  <NoButton onClick={onClickNo}/>
                </div>
            </Modal>
          </div>
        <footer className="h-1/12 pt-4 box-border flex justify-center">
          <NavLink to="/upload">
            <UploadLogo />
          </NavLink>
        </footer>
      </div>
  );
};

export default ProfilePage;
