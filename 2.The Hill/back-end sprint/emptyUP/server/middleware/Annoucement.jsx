import { NavLink } from 'react-router-dom'
import Picture from "../components/Picture"

const Annoucement = (props) => {
	return(
		<li className="flex  my-1 hover:bg-white w-full ">
    <button className="text-xl bg-slate-300 hover:bg-blue-800 text-white flex justify-center items-center h-24 w-4" onClick={()=>props.delete(props.info.id)} > x
    </button>
    <div class="h-24 w-24 border overflow-hidden">
 		 <img src={props.info.profilePicture} alt="profile picture" class="object-cover h-full w-full" />
		</div>

		<div className="flex flex-col h-24 pl-3  ">
		<h5 className="text-blue-800 text-lg font-bold capitalize p-0 m-0">{props.info.subject}{""}</h5>
		<h5 className="text-blue-800 p-0 m-0">{props.info.username} wrote on {props.info.date} :</h5>
		<p className="text-justify italic text-sm pr-6 h-16 overflow-hidden ">
		"{props.info.content}{""}"
		</p>
		</div>
		</li>
		)
}

export default Annoucement
