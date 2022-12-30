import {FormLabel, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";

const RoverSelect = () => {
	const { handleRover, roverName, roverOptions } = useContext(ImageContext);

	const theme = useTheme();
	// console.log(theme)

	return (
		<div className='form-select'>
			<FormLabel id="rover-selection">
				<Typography 
					color='primary'
					variant='h6'
				>
					Select a Rover
				</Typography>
			</FormLabel>
			<ToggleButtonGroup
				className='toggle-group'
				value={roverName}
				color='warning'
				exclusive
				onChange={handleRover}
				aria-label="Mars Rover Selection"
        		aria-labelledby='rover-selection'
			>
				{roverOptions?.map((item, index)=>
					<ToggleButton value={item} key={index}aria-label={item}
					>
						{item}
					</ToggleButton>
				)}
			</ToggleButtonGroup>
		</div>
	);
};

export default RoverSelect;
