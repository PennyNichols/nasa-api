import {  TextField } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../../context/ImageContext";

const EarthInput = () => {
	const { handleEarthDate, date, manifest } = useContext(ImageContext);

	return (
		<TextField
			id="date-input"
			aria-label="Earth Date"
			variant="outlined"
			color="warning"
			value={date?.slice(11)}
			placeholder="YYYY-MM-DD"
			helperText={`Date between ${manifest?.landing_date} & ${manifest?.max_date}`}
			onChange={(event) => handleEarthDate(event)}
		/>
	);
};

export default EarthInput;
