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
  }, [roverName, date])

  useEffect(() => { 
    axios.get(imageUrl).then((response) => {
      setImages(response?.data.photos);
    })
  }, [roverName, date])

  const handleRover = (event, newRoverName) =>{
    setRoverName(newRoverName)
    setDate(manifest?.max_date);
  }

  const handleDate = (event, newDateType) => {
    setDateType(newDateType)
  }

  function formatEarthDate(value) {
    if (!value) return value;
    const num = value.replace(/[^\d]/g, "");
    const numLength = num.length;
    if (numLength < 5) return num;
    if (numLength < 7) {
      return `${num.slice(0, 4)}-${num.slice(4)}`;
    }
    return `${num.slice(0, 4)}-${num.slice(4, 6)}-${num.slice(6, 8)}`;
  }

  const handleEarthDate = (e) => {
    const formattedDate = formatEarthDate(e.target.value);
    setDate(`earth_date=${formattedDate}`)
  }

  console.log(date)
  return (
    <ImageContext.Provider value={ {imageUrl, images, manifest, roverName, setRoverName, dateType, handleDate, date, setDate, camera, setCamera, handleRover, handleEarthDate} }>
      { props.children}
    </ImageContext.Provider>
  )
 }

 export default ImageProvider