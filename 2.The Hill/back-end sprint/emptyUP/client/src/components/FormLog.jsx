import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import LoginButton from "../components/LoginButton";
import jwt from "jsonwebtoken"

const FormLog = () => {
  const navigate = useNavigate();
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    navigate("/upload");
    const data = {
      email: inputRefEmail.current.value,
      password: inputRefPassword.current.value,
    };


    axios
      .post("/api/user/login", data)
      .then((response) => {
        const userId = response.data.id;
        //console.log(userId);
        localStorage.setItem("user_id", userId);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
      
  };

  return (
    <div className="formContainer flex flex-col">
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          onSubmitHandler(event);
        }}
      >
        <div className="flex flex-col">
        <label htmlFor="input">
            Email:{" "}
            <input
              type="text"
              placeholder="Enter your email"
              ref={inputRefEmail}
              className="p-1"
            />
          </label>
          <label htmlFor="input">
            Password:{" "}
            <input
              type="password"
              placeholder="Enter your password"
              ref={inputRefPassword}
              className="p-1"
            />
          </label>
        </div>
        <div className="buttonDiv">
          <LoginButton type="submit" />
        </div>
      </form>
    </div>
  );
};

export default FormLog;
