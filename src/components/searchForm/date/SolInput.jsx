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
			value={sol?.slice(4)}
			helperText={`Number between 1 & ${manifest?.max_sol}`}
			onChange={(e) => handleSolDate(e)}
		/>
	);
};

export default SolInput;
