import {
	FormLabel,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { ImageContext } from "../../../context/ImageContext";

const CamSelect = () => {
	const { camSelections, cam, handleCam } = useContext(ImageContext);
	const [all, setAll] = useState(true)
	const handleAll=(e)=>{e.target.value === 'null' ? setAll(!all) : setAll(false)}
	// console.log(cam)
	return (
		<div className="form-select">
			<FormLabel className='label'>
				<Typography color="primary" variant="h6">
					Select a Camera
				</Typography>
			</FormLabel>
			<ToggleButtonGroup
				className="toggle-group"
				value={cam}
				color="primary"
                orientation='vertical'
				exclusive
				onChange={(e)=>handleCam(e)}
				aria-label="Mars Rover Camera Selection"
			>
				<ToggleButton
						value='null'
						aria-label='All cameras'
						style={{ color: "#ffa6009e" }}
						selected={all}
						onClick={(e)=>handleAll(e)}
					>
						all
					</ToggleButton>
				{camSelections?.map((option, index) => (
					<ToggleButton
						value={option}
						key={index}
						aria-label={option}
						style={{ color: "#ffa6009e" }}
						onClick={(e)=>handleAll(e)}
					>
						{option === "MAST"
							? "Mast"
							: option === "NAVCAM"
							? "navigation"
							: option === "CHEMCAM"
							? "chemistry"
							: option === "FHAZ"
							? "front hazard"
							: option === "MAHLI"
							? "mars hand lens"
							: option === "RHAZ"
							? "rear hazard"
                            : option === 'PANCAM'
                            ? 'panoramic'
                            : option === 'ENTRY'
                            ? 'entry, descent, and landing'
                            : option === 'MINITES'
                            ? 'thermal emission spectrometer'
                            : option === 'MARDI'
                            ? 'mars descent'
							: ""}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</div>
	);
};

export default CamSelect;
