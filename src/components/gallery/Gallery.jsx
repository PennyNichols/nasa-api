import { Box } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";
import AppPagination from "./AppPagination";
import ImageCard from "./ImageCard";

const Gallery = () => {
	const { images, paginatedImages, screenSize } = useContext(ImageContext);
	return (
		<>
			<Box className="gallery">
				{screenSize < 550
					? images?.map((image) => <ImageCard image={image} key={image.id} />)
					: paginatedImages?.map((image) => (
							<ImageCard image={image} key={image.id} />
					  ))}
			</Box>
			<AppPagination />
		</>
	);
};

export default Gallery;
