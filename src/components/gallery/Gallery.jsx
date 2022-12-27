import { Card, CardContent, CardMedia, Container } from '@mui/material'
import React, { useContext } from 'react'
import { ImageContext } from '../../context/ImageContext'
import ImageCard from './ImageCard'

const Gallery = () => {
    const {images} = useContext(ImageContext)

  return (
    <div className='gallery'>
      {images?.map(image => <ImageCard image={image} key={image.id}/>)}
    </div>
  )
}

export default Gallery