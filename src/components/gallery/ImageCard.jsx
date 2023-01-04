import { Button, Card, CardContent, CardMedia } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";

const ImageCard = (props) => {
	const { handleImageClick } = useContext(ImageContext);

	const { img_src, camera, earth_date, rover, id } = props.image;
	const { full_name } = camera;
	const { name } = rover;

	const clickedId = id;

	return (
		<Card
			className="card"
			style={{ backgroundColor: "rgba(0, 0, 0, 0.627)", paddingBottom: "0" }}
		>
			<CardMedia
				component="img"
				height="150px"
				image={img_src}
				alt={`${name}, ${earth_date}, ${full_name}`}
				className="card-img"
			/>
			<CardContent className="card-content" style={{ position: "relative" }}>
				<p>{name}</p>
				<p>{earth_date}</p>
				<p style={{ marginBottom: "20px" }}>{full_name}</p>
				<Button
					variant="outlined"
					clickedid={clickedId}
					onClick={(event) => handleImageClick(event)}
					style={{
						position: "absolute",
						bottom: "0",
						right: "0",
						padding: "3px",
						margin: "5px",
						fontSize: "10px",
					}}
				>
					Full Screen
				</Button>
			</CardContent>
		</Card>
	);
};

export default ImageCard;
