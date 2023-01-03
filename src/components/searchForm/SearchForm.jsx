import React, { useContext, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { ImageContext } from "../../context/ImageContext";
import RoverSelect from "./RoverSelect";
import DateSelect from "./date/DateSelect";
import CamSelect from "./camera/CamSelect";
import SavedSearches from "../savedSearches/SavedSearches";

const SearchForm = () => {
	const [hide, setHide] = useState(false);
	const handleHide = () => {
		setHide(!hide);
	};
	return (
		<Container className="form-container" maxWidth="sm">
			<Container
				style={{width:'100%', display:'flex', justifyContent:'center',alignItems:'center', marginBottom:'20px'}}
			>
				<Button variant="outlined" onClick={handleHide}>
					{!hide ? "Hide Options" : "Show Options"}
				</Button>
			</Container>
			{!hide && (
				<>
					<RoverSelect />
					<DateSelect />
					<CamSelect />
				</>
			)}
			<SavedSearches />
		</Container>
	);
};

export default SearchForm;
