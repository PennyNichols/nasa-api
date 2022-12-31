import { createContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";

export const ImageContext = createContext();

const key = process.env.REACT_APP_NASA_API_KEY

const ImageProvider = (props) => {
	const [manifest, setManifest] = useState({});
	const [images, setImages] = useState([]);
	const [allImages, setAllImages] = useState([]);
	const [roverName, setRoverName] = useState("curiosity");
	const [dateType, setDateType] = useState("earth_date");
	const [maxDate, setMaxDate] = useState();
	const [maxSol, setMaxSol] = useState();
	const [date, setDate] = useState();
	const [earthDate, setEarthDate] = useState();
	const [sol, setSol] = useState();
	const [cam, setCam] = useState(null);
	const [camSelections, setCamSelections] = useState([]);
	const [page, setPage] = useState("&page=1");
	const [pageCount, setPageCount] = useState("");
	const [currentDate, setCurrentDate] = useState();
	const [savedSearches, setSavedSearches] = useState([]);
	const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
	const imageUrl = `${baseUrl}/${roverName}/photos?${date}${cam}${page}&api_key=${key}`;
	const allImagesUrl = `${baseUrl}/${roverName}/photos?${date}${cam}&api_key=${key}`;
	const manifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=${key}`;

	const roverOptions = ["curiosity", "opportunity", "spirit"];

	const dateTypeOptions = ["earth_date", "sol"];

	const fetchManifest = async () => {
		const { data } = await axios.get(manifestUrl);
		const photos = data.photo_manifest.photos;
		const maxEarth = data.photo_manifest.max_date;
		const maxMars = data.photo_manifest.max_sol;
		const day = photos.find((item) => item.earth_date === maxEarth);
		const cams = day.cameras;
		setManifest(data.photo_manifest);
		setMaxDate(maxEarth)
		setMaxSol(maxMars)
		setEarthDate(maxEarth);
		setSol(maxMars);
		setCamSelections(cams);
	};

	useEffect(() => {
		fetchManifest();
	}, [roverName]);
	console.log(manifest)


	useEffect(()=>{
		if (dateType === 'earth_date'){
			setDate(`earth_date=${earthDate}`)
		} else {
			setDate(`sol=${sol}`)
		}
	},[earthDate, sol, date])

	const fetchCameras = async () => {
		const photos = manifest.photos;
		
		const setDay = (dateType) => {
			if (dateType === "sol") {
				return photos?.find((item) => item.sol === sol);
			} else {
				return photos?.find((item) => item.earth_date === earthDate);
			}
		};
		const day = setDay(dateType);

		// console.log(day)
		// console.log(cams)
		console.log(day.cameras)
		setCamSelections(day.cameras);
	};

	useEffect(()=>{
		fetchCameras()
	},[date])


	const fetchImages = async () => {
		const { data } = await axios.get(imageUrl);
		setImages(data.photos);
	};

	const fetchAllImages = async () => {
		const { data } = await axios.get(allImagesUrl);
		setAllImages(data?.photos);
		setPageCount(Math.ceil(data?.photos.length / 25))
	};

	useEffect(()=>{
		fetchImages();
		fetchAllImages();
	},[roverName, date,cam,page])

	

	const fetchSearches = () => {
		const searchData = JSON.parse(localStorage.getItem("allSaves")) || [];
		setSavedSearches(searchData);
	};
	// console.log(savedSearches)

	useEffect(() => {
		fetchSearches();
	}, []);

	const handleRover = (event, newRoverName) => {
		setRoverName(newRoverName);
		setDate(maxDate);
	};

	const handleDate = (event) => {
		if (event.target.value === "sol") {
			setDateType("sol");
			setDate(`sol=${sol}`);
		} else if (event.target.value === "earth_date") {
			setDateType("earth_date");
			setDate(`date=${earthDate}`);
		}
	};
	// console.log(dateType)

	function formatEarthDate(value) {
		if (!value) return value;
		const num = value.replace(/[^\d]/g, "");
		const numLength = num.length;
		if (numLength < 5) return num;
		if (
			num.slice(0, 4) < manifest.landing_date.slice(0, 4) ||
			num.slice(0, 4) > maxDate.slice(0,4)
		) {
			alert(
				`Please enter a valid year between ${manifest.landing_date.slice(0,4)} and ${maxDate.slice(0, 4)}`
			);
		}
		if (numLength < 7) {
			return `${num.slice(0, 4)}-${num.slice(4)}`;
		}
		if (num.slice(4, 6) < 1 || num.slice(4, 6) > 12) {
			alert(`Please enter a valid month between 1 and 12`);
		}
		if (
			num.slice(4, 6) === "01" ||
			num.slice(4, 6) === "03" ||
			num.slice(4, 6) === "05" ||
			num.slice(4, 6) === "07" ||
			num.slice(4, 6) === "08" ||
			num.slice(4, 6) === "10" ||
			num.slice(4, 6) === "12"
		) {
			if (num.slice(6, 8) > 31) {
				alert(`Please enter a valid date for month ${num.slice(4, 6)} (1-31)`);
			}
		} else if (num.slice(4, 6) == "02") {
			if (num.slice(0, 4) % 4 != 0) {
				if (num.slice(6, 8) < 1 || num.slice(6, 8) > 28) {
					alert(`Please enter a valid date for a non-leap February (1-28)`);
				}
			} else {
				if (num.slice(6, 8) < 1 || num.slice(6, 8) > 29) {
					alert(`Please enter a valid date for a leap February (1-29)`);
				}
			}
		} else {
			if (num.slice(6, 8) < 1 || num.slice(6, 8) > 30) {
				alert(`Please enter a valid date for month ${num.slice(4, 6)} (1-30)`);
			}
		}
		return `${num.slice(0, 4)}-${num.slice(4, 6)}-${num.slice(6, 8)}`;
	}

	const handleEarthDate = (e) => {
		const formattedDate = formatEarthDate(e.target.value);
		setEarthDate(formattedDate);
		setDate(`earth_date=${formattedDate}`);
	};

	function formatSolDate(value) {
		if (!value) return value;
		const num = value.replace(/[^\d]/g, "");
		if (num < 0 || num > manifest.max_sol) {
			alert(`Please enter a valid Sol date between 0 and ${manifest.max_sol}`);
		}
		return num;
	}

	const handleSolDate = (e) => {
		const formattedDate = formatSolDate(e.target.value);
		setSol(formattedDate)
		setDate(`sol=${formattedDate}`);
	};

	const handleCam = (e) => {
		setCam(e.target.value);
		fetchImages();
		fetchAllImages();
	};

	const handlePage = (e) => {
		setPage(`&page=${e.target.textContent}`);
		window.scroll(0, 0);
	};

	const saveSearch = () => {
		let entry = {
			id: v4(),
			rover: roverName,
			dateType: dateType,
			date: date,
			camera: cam,
		};
		console.log(entry)
		let updatedSaves = [...savedSearches]
		updatedSaves.unshift(entry)
		setSavedSearches(updatedSaves);
		localStorage.setItem("allSaves", JSON.stringify(updatedSaves));
	};
	// console.log(savedSearches)
	// console.log(JSON.parse(localStorage.getItem('allSaves')))
	const handleDelete = (e, id) => {
		console.log(e.target.parentElement.parentElement.parentElement.parentElement.id);
		console.log(savedSearches);
		const itemToRemove = savedSearches.splice(e.target.parentElement.parentElement.parentElement.parentElement.id, 1);
		const currentId = itemToRemove[0].id;
		// console.log(currentId);
		const newSavedSearches = savedSearches.filter(
			(savedSearch) => savedSearch.id !== currentId
		);
		// console.log(newSavedSearches);
		localStorage.setItem("allSaves", JSON.stringify(newSavedSearches));
		// localStorage.allSaves.removeItem(itemToRemove)
		fetchSearches();
	};

	const handleSavedClick = (e) => {
		const currentItem = savedSearches.splice(
			e.target.parentElement.parentElement.id,
			1
		);
		setCam(currentItem[0].camera);
		setDateType(currentItem[0].dateType);
		setDate(currentItem[0].date);
		setRoverName(currentItem[0].rover);
	};

	return (
		<ImageContext.Provider
			value={{
				imageUrl,
				images,
				manifest,
				roverOptions,
				dateTypeOptions,
				roverName,
				setRoverName,
				dateType,
				handleDate,
				date,
				setDate,
				camSelections,
				cam,
				setCam,
				handleRover,
				handleEarthDate,
				handleSolDate,
				handleCam,
				setPage,
				pageCount,
				handlePage,
				allImages,
				saveSearch,
				savedSearches,
				handleDelete,
				handleSavedClick,
				fetchCameras
			}}
		>
			{props.children}
		</ImageContext.Provider>
	);
};

export default ImageProvider;
