import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Arrow from "../components/Arrow"
import fleche from '../assets/fleche.png';
const DownloadPicture = ({ submit}) => {

  const [image, setImage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault()


    const formData = new FormData();
    formData.append("image", image);

    axios
      .post("/api/user/profilepicture", formData)
      .then((response) => {
        console.log("photo uploaded");
        setImage(formData)
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (

      <Form
        onSubmit={onSubmit}
        className="h-full w-full flex flex-col items-center justify-center"
      >
         <h2 className="text-2xl font-bold text-blue-800 p-2 ">DOWNLOAD </h2>
         <h2 className="text-2xl font-bold text-blue-800 p-2 ">PROFILE PICTURE </h2>
       <Form.Group className="flex w-60 items-center justify-between " controlId="image">
           <img src={fleche} className="bg-slate-50"  alt="back" style={{ height: '20px', marginTop :'2px',marginRight:'3px'}}/>
           <Form.Control
          className="text-center h-7 flex text-xs justify-center "
            type="file"
           onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setImage(event.target.files[0]);
                console.log(event.target.files[0]);
                //URL.createObjectURL(event.target.files[0])
              }
            }}
            />
            </Form.Group>
        <Button className="text-7xl  hover:drop-shadow h-18 " type="submit">+</Button>
      </Form>

  );
};
export default DownloadPicture;

