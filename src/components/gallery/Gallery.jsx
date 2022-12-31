import { Card, CardContent, CardMedia, Container } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";
import AppPagination from "./AppPagination";
import ImageCard from "./ImageCard";

const Gallery = () => {
	const { allImages, cam, images } = useContext(ImageContext);

	// const filter = () => {}
	const filteredImages = allImages?.filter((image) => image.camera.name === cam);
	// console.log(filteredImages.length);
	return (
		<>
			<div className="gallery">
				{filteredImages.length > 0
					? filteredImages?.map((image) => (
							<ImageCard image={image} key={image.id} />
					  ))
					: images?.map((image) => <ImageCard image={image} key={image.id} />)}
			</div>
			<AppPagination />
		</>
	);
};

export default Gallery;
