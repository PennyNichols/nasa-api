import { FormLabel, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../../context/ImageContext";
import EarthInput from "./EarthInput";
import SolInput from "./SolInput";

const DateSelect = () => {
	const { handleDate, dateType, dateTypeOptions, date, sol } = useContext(ImageContext);

    const theme = useTheme();
	return (
		<div className="form-select">
			<FormLabel id="date-selection">
                <Typography
					color='primary'
					variant='h6'
				>
					Select a Date
				</Typography>
            </FormLabel>
			<div className="date-options">
				<ToggleButtonGroup
                    className='toggle-group'
					value={dateType}
                    color='primary'
					exclusive
					onChange={handleDate}
					aria-label="Mars Rover Date Type Selection"
				>
					{dateTypeOptions?.map((option,index)=>(
						<ToggleButton value={option} key={index} aria-label={option}>
							{(option=='earth_date') ? 'earth date' : 'sol'}
						</ToggleButton>

					))
					}
				</ToggleButtonGroup>
				{dateType === "earth_date" ? <EarthInput /> : <SolInput />}
			</div>
		</div>
	);
};

export default DateSelect;
