import { NavLink } from 'react-router-dom'
import Picture from "../components/Picture"


const Building = (props) => {
  return(
    <li className="flex  my-1 hover:bg-white w-full ">
    <button className="text-xl bg-slate-300 hover:bg-blue-800 text-white flex justify-center items-center h-24 w-4" onClick={()=>props.delete(props.info.id)} > x
    </button>
    <div class="h-24 w-24 border overflow-hidden">
      <img src={props.info.image} alt="building picture" class="object-cover h-full w-full" />
    </div>

    <div className="flex flex-col justify-between pl-2 h-24  ">


    <h5 className="text-blue-800 text-lg font-bold pl-2 capitalize"> SPACE # {props.info.id}{""} </h5>
    <p className="text-justify  text-xs pl-2   ">
    Adress :{props.info.adress}{""}
    </p>
    <p className="text-justify  text-xs pl-2   ">
    {props.info.zipcode}{""}{props.info.city}{""}
    </p>

    <p className="text-justify text-xs pl-2">
    Type: {props.info.type}{""}
    </p>
    <p className="text-justify text-xs pl-2  ">
    Created on {props.info.dateofpost}{""}
    </p>

    </div>

    </li>
    )
}

export default Building
