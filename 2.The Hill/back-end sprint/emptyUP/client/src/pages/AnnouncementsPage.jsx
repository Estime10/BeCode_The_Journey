import LogoutButton from "../components/LogoutButton"
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PostButton from"../components/PostButton"
import Annoucement from "../components/Annoucement"
import UploadLogo from "../components/UploadLogo";
import { v4 as uuidv4 } from 'uuid';
import Megaphone from "../assets/Megaphone.svg"
import Logo from "../components/Logo"
import SearchButton from "../components/SearchButton"


const AnnoucementsPage =() => {
const [posts, setPosts] = useState([]);
const [newPost, setNewPost] = useState("")
const [newSubject, setNewSubject] = useState("")
const [newCity, setNewCity] = useState("")
const [showPicture, setshowPicture] = useState("");
const navigate = useNavigate();



useEffect(() => {
getPicture();
}, [])


const getPicture = async () => {
try {
    const response = await axios.get("api/user/profile" , {
            headers: {
            "ngrok-skip-browser-warning": "69420"
            }
          });
    console.log (response)
    const dat = response.data.data
    const newPicture =  {
     content : dat.profilpicture_url,
     id : dat.id,
      username : dat.username,
      };
   setshowPicture(newPicture)
    }

catch (error) {
console.log(error);
}
}

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
const newPosts = dat.map(post => {
const content = post.content;
const subject = post.subject;
const dateofpost= new Date(post.date);
const options = { year: "numeric", month: "2-digit", day: "2-digit" };
const date = dateofpost
.toLocaleDateString("en-GB", options)
.replace(/\//g, "/");
const id = post.id;
const user_id=post.user_id
const city= post.city
const username=post.username
const profilePicture=post.profilpicture_url
return { id, content, subject, date, user_id, city, username,profilePicture};
});
setPosts(newPosts)
}
catch (error) {
console.log(error);
}
}


const deletePost= (id) => {
axios.delete(apiUrl+'/'+id)

.then(response => {
console.log("post deleted")
})
.catch(error => {
console.log(error);
});
setPosts(prevPosts => prevPosts.filter((post) => post.id !== id))
}

const handleSubmit = (event) => {
event.preventDefault()
const id = uuidv4();
const content = newPost
const subject = newSubject
const city = newCity
const postToAdd={ id, content, subject, city}
setPosts(prevPosts => [...prevPosts, postToAdd])
setNewPost("")
setNewSubject("")
axios.post(apiUrl+'/add', postToAdd)
   .then(response => {
      console.log("post added")
   })
   .catch(error => {
      console.log(error);
   });
}

const content=showPicture.content
  console.log(content)

const logout = async () => {
    try {
      const response = await axios.get("api/user/logout", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(response)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

return (
      <div className="h-screen font-custom1  w-screen flex flex-col box-border ">
      <div className="flex h-1/12 w-full box-border justify-between px-5 p-3 items-center ">
          <Logo/>
          <LogoutButton url={content} onClick={logout} />
                 </div>

     	<h3 className="h-1/6 m-1 uppercase text-black font-bold text-5xl flex items-center justify-center">
			Posts
      <img src={Megaphone} alt="megaphone" className="flex box-border" style={{ height: '40px', marginLeft :'20px'}}/>

      </h3>

      <div className="h-4/6 flex flex-col box-border justify-between items-center rounded-[25px] ">
				<ul className=" shadow-inner h-4/6 box-border bg-slate-50  w-11/12  rounded-[25px] p-3 flex overflow-scroll flex-col items-start ">
        			{posts.map((post) => (<Annoucement info={post} delete={deletePost} key={post.id}/>
        			))}
      			</ul>
  			<form className="p-3 h-2/6 flex justify-between box-border flex-col items-center  h-2/6 w-11/12" action="submit" onSubmit={handleSubmit}>
          <div className=" w-full box-border flex pb-2">
        		<h4 className="font-bold text-sm italic ">
            SUBJECT:
            </h4>
          	<input  className=" italic h-4 bg-slate-50 text-xs mx-3 text-blue-800 shadow-inner p-3 text-center"
            		    type="text"
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
            		   placeholder="Enter the subject"
            />
            <h4 className="font-bold text-sm italic ">
            CITY:
            </h4>
            <input className=" italic h-4 bg-slate-50 text-xs mx-3 text-blue-800 shadow-inner p-3 text-center"
                   type="text"
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                   placeholder="Enter your city"
            />
          </div>

          <div className="box-border   w-full h-3/5     ">
            <input className=" text-center rounded-[25px] h-full shadow-inner w-full bg-slate-50 "
            type="text"
            value={newPost}
            placeholder="You can wrote a message here!"
            onChange={e => setNewPost(e.target.value)}
            />
          </div>

          <PostButton type="submit"/>
      	</form>
      </div>

       <footer className="h-1/12  pt-4 flex justify-center">
          <NavLink to="/upload" className=" ">
            <UploadLogo />
          </NavLink>
        </footer>

		</div>
	)
}

export default AnnoucementsPage
