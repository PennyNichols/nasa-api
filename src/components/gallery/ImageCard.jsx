import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";

const ImageCard = (props) => {
	const { img_src, camera, earth_date, rover } = props.image;
	const { full_name } = camera;
	const { name } = rover;
	return (
		<Card className="card" style={{ backgroundColor: "transparent" }}>
			<CardMedia
				component="img"
				height="150px"
				image={img_src}
				alt={`${name}, ${earth_date}, ${full_name}`}
				className="card-img"
			/>
			<CardContent className="card-content">
				<p>{name}</p>
				<p>{earth_date}</p>
				<p>{full_name}</p>
			</CardContent>
		</Card>
	);
};

export default ImageCard;
