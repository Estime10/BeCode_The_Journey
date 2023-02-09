import UserLogo from "../assets/user.svg";

const LoginPicto = ({ setActive }) => {
  return (
    <div className="w-2/6 flex justify-end  " onClick={() => setActive(true)}>
    <img className=" cursor-pointer  " src={UserLogo} alt="User picto"  alt="filters bar" style={{ height: '30px', width:"30px"}}/>
    </div>

    );
};

export default LoginPicto;



