import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import UploadLogo from "../components/UploadLogo";
import Building from "../components/Building"
import LogoutButton from "../components/LogoutButton"
import Logo from "../components/Logo"
import Heart from "../assets/heart.svg"

const FavoritesPage =() => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getBuildingsLoved();
  }, []);

  const getBuildingsLoved = async () => {
    try {
      const response = await axios.get('/api/user/mybuildings/2', {
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      });

      const data = response.data.data;

      const BuildingsLoved = data.map(building => {
        const dateofpost = building.dateofpost;
        const id = building.id;
        const adress = building.adress;
        const city = building.city;
        const type = building.type;
        const zipcode = building.zipcode;
        const admin_id = building.admin_id;
        return { id, adress, zipcode, city, type, dateofpost, admin_id};
      });
      setBuildings(BuildingsLoved);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBuilding= (id) => {
    axios.delete('/api/buildingLoved/delete/'+id)
    .then(response => {
console.log("building deleted")
})
.catch(error => {
console.log(error);
});
  setBuildings(buildings.filter((building) => building.id !== id))

  }


	return(
		<div className="h-screen font-custom1  w-screen flex flex-col box-border ">
        <div className="flex h-1/12 w-full box-border justify-between px-5 pt-5 ">
          <Logo/>
          <LogoutButton/>
        </div>

		<h3 className="h-1/6 uppercase text-black font-bold text-5xl flex items-center justify-center">
			My Favorites
      <img src={Heart} alt="back" className="flex box-border" style={{ height: '40px', marginLeft :'10px'}}/>
      </h3>


      <div className="h-4/6 mx-2 flex flex-col box-border items-center rounded-[25px]">
        <ul className=" shadow-inner h-full box-border bg-slate-50  w-11/12  rounded-[25px] p-3 flex overflow-scroll  flex-col  items-start ">
            {
              buildings.map((building) => {
                return <Building info={building} delete={deleteBuilding} key={building.id}/>
              })
            }
        </ul>
      </div>


		 <footer className="h-1/12  pt-4 flex justify-center">
          <NavLink to="/upload" className=" ">
            <UploadLogo />
          </NavLink>
        </footer>

		</div>
	)
}

export default FavoritesPage
