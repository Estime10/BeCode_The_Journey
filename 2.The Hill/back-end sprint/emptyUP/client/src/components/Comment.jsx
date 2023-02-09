import { NavLink } from 'react-router-dom'

const Username="Roro68"
const date=new Date().toLocaleDateString()
const Comment = (props) => {
  return(
    <li className="flex my-1 hover:bg-white w-full ">
    <div class="h-24 w-24 border overflow-hidden">
      <img src={props.info.image} alt="building picture" class="object-cover h-full w-full" />
    </div>
    <div className="flex flex-col px-3   ">
    <h5 className="text-blue-800 text-l font-bold  p-0 m-0">{props.info.username}{""} says on {props.info.date}{""}</h5>
    <p className="text-justify italic text-sm pr-6 h-16 overflow-hidden ">
    "{props.info.content}{""}"
    </p>
    </div>
    </li>

    )

}

export default Comment
