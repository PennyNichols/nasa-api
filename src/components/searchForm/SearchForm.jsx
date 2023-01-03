import React, { useContext, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { ImageContext } from "../../context/ImageContext";
import RoverSelect from "./RoverSelect";
import DateSelect from "./date/DateSelect";
import CamSelect from "./camera/CamSelect";
import SavedSearches from "../savedSearches/SavedSearches";

const SearchForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleIsOpen = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Container
			sx={{ bgcolor: "#00000075" }}
			className="form-container"
			maxWidth="sm"
		>
			<Container
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: "20px",
				}}
			>
				<Button variant="outlined" onClick={handleIsOpen}>
					{!isOpen ? "Hide Options" : "Show Options"}
				</Button>
			</Container>
			{!isOpen && (
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
