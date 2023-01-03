import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";
import AppPagination from "./AppPagination";
import ImageCard from "./ImageCard";

const Gallery = () => {
	const { images, paginatedImages, screenSize } = useContext(ImageContext);
	// const filter = () => {}
	// console.log(filteredImages.length);
	return (
		<>
			<div className="gallery">
				{screenSize < 550
					? images?.map((image) => <ImageCard image={image} key={image.id} />)
					: paginatedImages?.map((image) => (
							<ImageCard image={image} key={image.id} />
					  ))}
			</div>
			<AppPagination />
		</>
	);
};

export default Gallery;
