import { useRef, useState } from "react";
import axios from "axios";
import RegisterButton1 from "./RegisterButton1";

const FormReg = ({ onSubmit }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefUsername = useRef();
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();
  const inputRefConfPassword = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(inputRefUsername.current.value);
    console.log(inputRefEmail.current.value);
    console.log(inputRefPassword.current.value);
    console.log(inputRefConfPassword.current.value);
    setIsSubmitting(true);
    setIsChecked(false);
    const data = {
      username: inputRefUsername.current.value,
      email: inputRefEmail.current.value,
      password: inputRefPassword.current.value,
      confirm_password: inputRefConfPassword.current.value,
    };
    axios
      .post("/api/user/register", data)
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="formContainer">
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          onSubmit(event);
          onSubmitHandler(event);
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="input">
            Pseudo:{" "}
            <input
              type="text"
              placeholder="Enter your name"
              ref={inputRefUsername}
              className="p-1"
            />
          </label>
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
          <label htmlFor="input">
            Confirm your password:{" "}
            <input
              type="password"
              placeholder="Confirm your password"
              ref={inputRefConfPassword}
              className="p-1"
            />
          </label>
          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="input">
              The information provided on this website does not constitute legal
              advice, instead all the information and materials...
              <a className="text-blue-800 underline" href="/terms">
                learn more
              </a>
            </label>
          </div>
        </div>
        <div className="buttonDiv">
          <RegisterButton1 type="submit" disabled={!isChecked} />
        </div>
      </form>
    </div>
  );
};

export default FormReg;
