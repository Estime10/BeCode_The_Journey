import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import LoginButton from "../components/LoginButton";

const FormLog1 = () => {
  const navigate = useNavigate();
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();
  const [isSubmitting1, setIsSubmitting1] = useState(false);
  const [user_id, setuser_id] = useState(false);

  const onSubmitHandler1= (event) => {
    event.preventDefault();


    const data = {
      email: inputRefEmail.current.value,
      password: inputRefPassword.current.value,
    };

    axios
      .post("/api/user/login", data)
      .then((response) => {
        const userId = response.data.id;
        setuser_id (userId)
        console.log(userId);

        localStorage.setItem("user_id", userId);
        setIsSubmitting1(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting1(false);
      });

    console.log(inputRefEmail.current.value);
    console.log(inputRefPassword.current.value);
    navigate("/profile");
    setIsSubmitting1(true);
    navigate("/profile");
  };

  return (
    <div className="formContainer">
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          onSubmitHandler1(event);
        }}
      >
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Enter the email"
            ref={inputRefEmail}
          />
          <input
            type="password"
            placeholder="Enter the password"
            ref={inputRefPassword}
          />
        </div>
        <div className="buttonDiv">
          <LoginButton type="submit" />
        </div>
      </form>
    </div>
  );
};

export default FormLog1;
