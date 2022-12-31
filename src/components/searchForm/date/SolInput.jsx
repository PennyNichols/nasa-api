import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../../context/ImageContext";

const SolInput = () => {
	const { handleSolDate, sol, manifest } = useContext(ImageContext);
	return (
		<TextField
			id="date-input"
			aria-label="Earth Date"
			variant="outlined"
      		color='warning'
			value={sol}
			helperText={`Number between 0 & ${manifest?.max_sol}`}
			onChange={(e) => handleSolDate(e)}
		/>
	);
};

export default SolInput;
