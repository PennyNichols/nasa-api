import {
	FormLabel,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../../context/ImageContext";

const CamSelect = () => {
	const { camSelections, cam, handleCam } = useContext(ImageContext);
	const theme = useTheme();

	return (
		<div className="form-select">
			<FormLabel>
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
				onChange={handleCam}
				aria-label="Mars Rover Camera Selection"
			>
				{camSelections?.map((option, index) => (
					<ToggleButton
						value={option}
						key={index}
						aria-label={option}
						style={{ color: "#ffa6009e" }}
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
