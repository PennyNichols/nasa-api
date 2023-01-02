import {
	FormLabel,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { ImageContext } from "../../context/ImageContext";

const RoverSelect = () => {
	const { handleRover, roverName, roverOptions, screenSize } =
		useContext(ImageContext);

	const theme = useTheme();
	// console.log(theme)

	return (
		<div className="form-select">
			<FormLabel className="label">
				<Typography color="primary" variant="h6">
					Select a Rover
				</Typography>
			</FormLabel>
			{screenSize > 550 ? (
				<ToggleButtonGroup
					className="toggle-group"
					value={roverName}
					color="warning"
					exclusive
					orientation="horizontal"
					onChange={handleRover}
					aria-label="Mars Rover Selection"
					aria-labelledby="rover-selection"
				>
					{roverOptions?.map((item, index) => (
						<ToggleButton
							value={item}
							key={index}
							aria-label={item}
							style={{ color: "#ffa6009e" }}
						>
							{item}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			) : (
				<ToggleButtonGroup
					className="toggle-group"
					value={roverName}
					color="warning"
					exclusive
					orientation="vertical"
					onChange={handleRover}
					aria-label="Mars Rover Selection"
					aria-labelledby="rover-selection"
				>
					{roverOptions?.map((item, index) => (
						<ToggleButton
							value={item}
							key={index}
							aria-label={item}
							style={{ color: "#ffa6009e" }}
						>
							{item}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			)}
		</div>
	);
};

export default RoverSelect;
