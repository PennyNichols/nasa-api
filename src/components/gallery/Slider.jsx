import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import { ImageContext } from "../../context/ImageContext";
import SliderCard from "./SliderCard";

const Slider = () => {
	const { handleSliderClick, images, clickedIndex } =
		useContext(ImageContext);

	return (
		<Carousel
			onClickItem={(event) => handleSliderClick(event)}
			selectedItem={clickedIndex}
			showIndicators={false}
			showThumbs={false}
		>
			{images?.map((image) => (
				<SliderCard image={image} key={image.id} />
			))}
		</Carousel>
	);
};

export default Slider;
