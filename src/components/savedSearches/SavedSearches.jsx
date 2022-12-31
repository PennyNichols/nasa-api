import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { ImageContext } from "../../context/ImageContext";
import SavedList from "./SavedList";

const SavedSearches = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { saveSearch } = useContext(ImageContext);
	return (
		<>
			<div className="spaced">
				<Button variant="outlined" color="primary" onClick={()=>setIsOpen(!isOpen)}>
					View Saved Searches
				</Button>
				<Button variant="outlined" color="primary" onClick={saveSearch}>
					Save This Search
				</Button>
			</div>
            {isOpen && <SavedList/>}
		</>
	);
};

export default SavedSearches;
