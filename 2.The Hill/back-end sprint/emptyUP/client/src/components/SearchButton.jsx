import Loupe from '../assets/loupe.png';

const SearchButton = ({setActive}) => {
	return (
		<div className="h-1/12 flex box-border rounded-l items-start justify-center">
		<input
		className=" border w-48 text-center text-sm shadow-inner rounded-2xl m-2 p-1"
		type="text"
		name="searchBar"
		placeholder="Please enter City"/>
		</div>	
		)
}

export default SearchButton
