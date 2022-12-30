import { Button } from "@mui/material";
import React, { useState } from "react";
import SavedList from "./SavedList";

const SavedSearches = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div className="spaced">
				<Button variant="outlined" color="primary" onClick={()=>setIsOpen(!isOpen)}>
					View Saved Searches
				</Button>
				<Button variant="outlined" color="primary">
					Save This Search
				</Button>
			</div>
            {isOpen && <SavedList/>}
		</>
	);
};

export default SavedSearches;
