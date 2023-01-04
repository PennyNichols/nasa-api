import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";

const SliderCard = (props) => {
	const { img_src, camera, earth_date, rover } = props.image;
	const { full_name } = camera;
	const { name } = rover;
	return (
		<Card style={{ backgroundColor: "transparent" }}>
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
