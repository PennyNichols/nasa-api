import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AppContext = createContext();



const AppProvider = (props) => {
  const [images, setImages] = useState([]);
  const [roverName, setRoverName] = useState("curiosity");
  const [date, setDate] = useState('')
  const [camera, setCamera] = useState('')
  const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
	const imageUrl = `${baseUrl}/${roverName}/photos?${date}${camera}&api_key=${process.env.REACT_APP_NASA_API_KEY}`;

  useEffect(() => { 
    fetchImages(imageUrl);
  }, [imageUrl])

  const fetchImages = async(url) => { 
    const res = await axios.get(url);
    setImages(res.data.results);

  }
  return (
    <AppContext.Provider value={ {images, roverName, setRoverName, date, setDate, camera, setCamera} }>
      { props.children}
    </AppContext.Provider>
  )
 }

 export default AppProvider