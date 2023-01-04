import React, { useContext } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { ImageContext } from '../../context/ImageContext';
import SliderCard from './SliderCard';

const Slider = () => {
  const {handleImageClick, images,clickedIndex, screenHeight} = useContext(ImageContext);
  
  return (
    <Carousel onClickItem={(event)=>handleImageClick()} selectedItem={clickedIndex} showIndicators={false} showThumbs={false} style={{position:'absolute', top:'0', left: '0', height:'100vh'}}>
      {images?.map((image) => <SliderCard  image={image} key={image.id} />)}
    </Carousel>
  )
}

export default Slider