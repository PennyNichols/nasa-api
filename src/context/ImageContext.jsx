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
    if (num.slice(0,4) < manifest.landing_date.slice(0,4) || num.slice(0,4) > manifest.max_date.slice(0,4) ){
      alert(`Please enter a valid year between ${manifest.landing_date.slice(0,4)} and ${manifest.max_date.slice(0,4)}`)
    }
    if (numLength < 7) {
      return `${num.slice(0, 4)}-${num.slice(4)}`;
    }
    if (num.slice(4,6) < 1 || num.slice(4,6) > 12 ){
      alert(`Please enter a valid month between 1 and 12`)
    }
    if (num.slice(4,6) == '01' || num.slice(4,6) == '03' || num.slice(4,6) == '05' || num.slice(4,6) == '07' || num.slice(4,6) == '08' || num.slice(4,6) == '10' || num.slice(4,6) == '12') {
      if (num.slice(6,8) < 1 || num.slice(6,8) > 31) {
        alert(`Please enter a valid date for month ${num.slice(4,6)} (1-31)`)
      }
    } else if (num.slice(4,6) == '02') {
      if (num.slice(0,4)%4 != 0){
        if (num.slice(6,8) < 1 || num.slice(6,8) > 28){
          alert(`Please enter a valid date for a non-leap February (1-28)`)
        }
      } else {
        if (num.slice(6,8) < 1 || num.slice(6,8) > 29){
          alert(`Please enter a valid date for a leap February (1-29)`)
        }
      }
    } else {
      if (num.slice(6,8) < 1 || num.slice(6,8) > 30) {
        alert(`Please enter a valid date for month ${num.slice(4,6)} (1-30)`)
      }
    }
    return `${num.slice(0, 4)}-${num.slice(4, 6)}-${num.slice(6, 8)}`;
  }

  const handleEarthDate = (e) => {
    const formattedDate = formatEarthDate(e.target.value);
    setDate(`earth_date=${formattedDate}`)
  }

  function formatSolDate(value) {
    if (!value) return value;
    const num = value.replace(/[^\d]/g, "");
    if (num < 1 || num > manifest.max_sol ){
      alert(`Please enter a valid Sol date between 1 and ${manifest.max_sol}`)
    }
    return num;
  }

  const handleSolDate = (e) => {
    const formattedDate = formatSolDate(e.target.value);
    setDate(`sol=${formattedDate}`)
  }

  console.log(date)
  return (
    <ImageContext.Provider value={ {imageUrl, images, manifest, roverName, setRoverName, dateType, handleDate, date, setDate, camera, setCamera, handleRover, handleEarthDate, handleSolDate} }>
      { props.children}
    </ImageContext.Provider>
  )
 }

 export default ImageProvider