import ProfilePicture from "../components/ProfilePicture"
import axios from "axios";
import { useState, useRef, useEffect} from "react";

const LogoutButton = ({onClick}) => {
const [showPicture, setshowPicture] = useState("");

useEffect(() => {
    req();
  }, []);

const req = async () => {
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

    }
    catch (error) {
    console.log(error);
    }
  };


    return (
        <button  onClick={onClick} className=" hover:shadow text-black  flex text-l w-28 border rounded-xl p-1 pr-3  justify-between" >
        <div className=" h-7 w-7  truncate overflow: hidden; rounded-full" >
       <img src= {showPicture.content} className="scale-125 origin-top " />
        </div>
        <p className="flex text-l font-bold  items-center">Logout</p>
        </button>
        )}
    export default LogoutButton

