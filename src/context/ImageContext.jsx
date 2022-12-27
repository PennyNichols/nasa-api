import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ImageContext = createContext();



const ImageProvider = (props) => {
  const [manifest, setManifest] = useState({})
  const [images, setImages] = useState([]);
  const [roverName, setRoverName] = useState("curiosity");
  const [dateType, setDateType] = useState('earth_date')
  const [date, setDate] = useState('')
  const [sol, setSol] = useState('')
  const [camera, setCamera] = useState('')
  const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
	const imageUrl = `${baseUrl}/${roverName}/photos?${date || sol}${camera}&api_key=${process.env.REACT_APP_NASA_API_KEY}`;
  const manifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=${process.env.REACT_APP_NASA_API_KEY}`

  useEffect(() => { 
    axios.get(manifestUrl).then((response) => {
      setManifest(response?.data.photo_manifest)
      setDate(`earth_date=${manifest?.max_date}`)
      setSol(`sol=${manifest?.max_sol}`)
    })
  }, [roverName])

  useEffect(() => { 
    axios.get(imageUrl).then((response) => {
      setImages(response?.data.photos);
    })
  }, [roverName])

  const handleRover = (event, newRoverName) =>{
    setRoverName(newRoverName)
  }

  const handleDate = (event, newDateType) => {
    setDateType(newDateType)
  }

  console.log(images)
  return (
    <ImageContext.Provider value={ {imageUrl, images, roverName, setRoverName, dateType, handleDate, date, setDate, camera, setCamera, handleRover} }>
      { props.children}
    </ImageContext.Provider>
  )
 }

 export default ImageProvider