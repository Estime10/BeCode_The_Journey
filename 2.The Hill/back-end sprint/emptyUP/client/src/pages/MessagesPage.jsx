import LogoutButton from "../components/LogoutButton"
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import PostButton from"../components/PostButton"
import Annoucement from "../components/Annoucement"
import UploadLogo from "../components/UploadLogo";
import { v4 as uuidv4 } from 'uuid';
import Logo from "../components/Logo"

const UserName2="Red Bull Forever"
const Username="Roro68"
//change with backend
const MessagesPage =() => {
const [msgs, setMsgs] = useState([]);
const [newMsg, setNewMsg] = useState("")
const apiUrl = '/api/annonces';

useEffect(() => {
req();
}, [])

const req = async () => {
try {
const response = await axios.get(apiUrl, {
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      });
console.log (response)
const dat = response.data.data
const newMsgs = dat.map(msg => {
const content = msg.content;
const subject = msg.subject;
const date = msg.date;
const id = msg.id;
const user_id=msg.user_id
return { id, content, subject, date, user_id};
});
setMsgs(newMsgs)
}
catch (error) {
console.log(error);
}
}


const deleteMsg= (id) => {
axios.delete(apiUrl+'/'+id)
.then(response => {
console.log("message deleted")
})
.catch(error => {
console.log(error);
});
setMsgs(prevPosts => prevPosts.filter((msg) => msg.id !== id))
}

const handleSubmit = (event) => {
event.preventDefault()
const id = uuidv4();
const content = newMsg
const msgToAdd={ id, content}
setMsgs(prevMsgs => [...prevMsgs, msgToAdd])
setNewMsg("")
axios.post(apiUrl+'/add', msgToAdd)
   .then(response => {
      console.log("message added")
   })
   .catch(error => {
      console.log(error);
   });

}

  return(
    <div className="h-screen font-custom1  w-screen flex flex-col box-border ">

      <div className="flex h-1/12 w-full box-border justify-between px-5 pt-5 ">
        <Logo/>
        <LogoutButton/>
      </div>
<div className="flex w-full flex-col h-1/6 justify-center">
     	<h3 className=" h-1/2 text-black box-border font-bold text-5xl flex items-center w-full justify-center">
			MESSAGES TO :
      </h3>
     		
      <h3 className=" w-full h-1/2 text-blue-800 box-border font-bold text-3xl flex items-center justify-center">
      {UserName2}
      </h3>
      </div>
     		<div className="h-4/6 flex flex-col box-border items-center rounded-[25px] ">
          <ul className=" shadow-inner h-4/6 box-border bg-slate-50  w-11/12  rounded-[25px] p-3 flex overflow-scroll flex-col items-start ">
              {msgs.map((post) => (<Annoucement info={post} delete={deleteMsg} key={post.id}/>
              ))}
            </ul>
          <form className="p-3 mt-4 h-2/6 flex justify-between box-border flex-col items-center border-dotted border-3 border border-black rounded-[25px] w-11/12" action="submit" onSubmit={handleSubmit}>
            <div className=" w-full box-border flex pb-2">
              <h4 className="font-bold text-sm italic ">
              WRITE A MESSAGE TO:
              </h4>
              <input className=" italic h-4 bg-slate-50 text-xs mx-3 text-blue-800 shadow-inner p-3 text-center"
                    type="text"
                    value={UserName2}
                    placeholder="Enter the subject"
              />
            </div>

            <div className="box-border shadow-inner w-11/12 h-3/5     ">
              <input className="  h-full w-full bg-slate-50 "
              type="text"
              value={newMsg}
              placeholder="You can wrote a message here!"
              onChange={e => setNewMsg(e.target.value)}
            />
          </div>

          <PostButton type="submit"/>
        </form>
      </div>

      <footer className="h-1/12 flex pt-4 items-end justify-center">
          <NavLink to="/upload">
            <UploadLogo />
          </NavLink>
        </footer>

		</div>
	)
}


export default MessagesPage
