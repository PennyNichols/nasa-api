import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

const SliderCard = (props) => {
	const { img_src, camera, earth_date, rover } = props.image;
	const { full_name } = camera;
	const { name } = rover;

	const [message, setMessage] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setMessage(false);
		}, 1500);
	}, [message]);

	return (
		<Card style={{ position: "relative", backgroundColor: "transparent" }}>
			{message && (
				<Box
					style={{
						position: "absolute",
						height: "100vh",
						width: "100vw",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography
						color="primary"
						variant="h3"
						style={{ backgroundColor: "rgba(0, 0, 0, 0.627", padding: "10px" }}
					>
						Click or tap image to close
					</Typography>
				</Box>
			)}
			<CardMedia
				component="img"
				image={img_src}
				style={{ height: "100vh" }}
				alt={`${name}, ${earth_date}, ${full_name}`}
				className="card-img"
			/>
			<CardContent
				className="card-content"
				style={{
					zIndex: "10000",
					width: "100%",
					position: "absolute",
					bottom: "0",
					backgroundColor: "rgba(0, 0, 0, 0.627)",
				}}
			>
				<p>{name}</p>
				<p>{earth_date}</p>
				<p>{full_name}</p>
			</CardContent>
		</Card>
	);
};

export default SliderCard;
