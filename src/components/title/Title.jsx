import React from "react";
import { Box, Typography } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
const Title = () => {
	return (
		<Box sx={{ bgColor: "#00000075" }}>
			<Typography
				variant="h4"
				color="primary"
				textAlign={"center"}
			>
				<p className="title">
					DISCOVER{" "}
					<span style={{ fontFamily: "inherit", color: "#f8c0579e" }}>
						MARS
						<PrecisionManufacturingIcon
							color="primary"
							sx={{
								margin: "0",
								padding: "0",
								transform: "translateY(8px)",
								fontSize: "50px",
							}}
						/>
					</span>{" "}
				</p>
			</Typography>
		</Box>
	);
};

export default Title;
