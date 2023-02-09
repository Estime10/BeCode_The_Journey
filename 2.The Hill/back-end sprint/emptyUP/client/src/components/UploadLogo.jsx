import Logonotext from "../assets/logonotext.png";

const UploadLogo = ({ setActive }) => {
  return (
    <div  className=" hover:shadow border rounded-3xl mt-3 p-1 px-3 flex items-center cursor-pointer justify-start text-center text-black font-bold text-lg w-30 mb-4 " onClick={() => setActive(true)}>
 <p className=" text-l pr-1 cursor-pointer">Upload</p>
    <img src={Logonotext} alt="Upload a building" className=" cursor-pointer p-1 w-7 flex hover:bg-white justify-center font-bold item-center   "/>
 <p className=" text-l pl-1">Spaces</p>
</div>
    );
};

export default UploadLogo;

