import { createContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";

export const ImageContext = createContext();

const key = process.env.REACT_APP_NASA_API_KEY;

const ImageProvider = (props) => {

	const [manifest, setManifest] = useState({});
	const [images, setImages] = useState([]);
	const [allImages, setAllImages] = useState([]);
	const [pageSize, setPageSize] = useState(25);
	const [pagination, setPagination] = useState({
		count: 0,
		from: 0,
		to: pageSize,
	});
	const [paginatedImages, setPaginatedImages] = useState([]);
	const [roverName, setRoverName] = useState("curiosity");
	const [dateType, setDateType] = useState("earth_date");
	const [maxDate, setMaxDate] = useState('');
	const [maxSol, setMaxSol] = useState('');
	const [date, setDate] = useState('');
	const [earthDate, setEarthDate] = useState('');
	const [sol, setSol] = useState('');
	const [cam, setCam] = useState('');
	const [camSelections, setCamSelections] = useState([]);
	const [screenSize, setScreenSize] = useState(window.innerWidth);
	const [savedSearches, setSavedSearches] = useState([]);


	const baseUrl = "https://api.nasa.gov/mars-photos/api/v1";
	const allImagesUrl = `${baseUrl}/rovers/${roverName}/photos?${date}${cam}&api_key=${key}`;
	const manifestUrl = `${baseUrl}/manifests/${roverName}/?api_key=${key}`;
	const roverOptions = ["curiosity", "opportunity", "spirit"];
	const dateTypeOptions = ["earth_date", "sol"];

	useEffect(() => {
		const handleResize = () => {
			setScreenSize(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
	}, []);

	const fetchManifest = async () => {
		const { data } = await axios.get(manifestUrl);
		const photos = data.photo_manifest.photos;
		const maxEarth = data.photo_manifest.max_date;
		const maxMars = data.photo_manifest.max_sol;
		const day = photos.find((item) => item.earth_date === maxEarth);
		const cams = day.cameras;
		setManifest(data.photo_manifest);
		setMaxDate(maxEarth);
		setMaxSol(maxMars);
		setEarthDate(maxEarth);
		setSol(maxMars);
		setCamSelections(cams);
	};

	useEffect(() => {
		fetchManifest();
	}, [roverName]);

	useEffect(() => {
		if (dateType === "earth_date") {
			setDate(`earth_date=${earthDate}`);
		} else {
			setDate(`sol=${sol}`);
		}
	}, [earthDate, sol, dateType]);

	const fetchCameras = async () => {
		const photos = manifest.photos;
		const setDay = (dateType) => {
			if (dateType === "sol") {
				return photos?.find((item) => item.sol === +sol);
			} else {
				return photos?.find((item) => item.earth_date === earthDate);
			}
		};
		const day = setDay(dateType);
		setCamSelections(day?.cameras);
	};

	useEffect(() => {
		fetchCameras();
	}, [date, earthDate, sol]);

	const fetchAllImages = async () => {
		const { data } = await axios.get(allImagesUrl);
		setAllImages(data.photos);
		setImages(data.photos);
	};





// possible cause of issue with saved search recall


	useEffect(() => {
		fetchAllImages();
	}, [roverName, date]);











	useEffect(() => {
		const filtered = allImages?.filter((image) => image.camera.name === cam);
		if (cam) {
			setImages(filtered);

		} else {
			setImages(allImages);

		}
	}, [cam]);

	const paginateData = () => {
		setPaginatedImages(images.slice(pagination.from, pagination.to));
		setPagination({ ...pagination, count: Math.ceil(images.length / 25) });
	};

	useEffect(() => {
		paginateData();
	}, [images, pagination.to, pagination.from]);

	const fetchSearches = () => {
		const searchData = JSON.parse(localStorage.getItem("allSaves")) || [];
		setSavedSearches(searchData);
	};

	useEffect(() => {
		fetchSearches();
	}, []);

	const handleRover = (event, newRoverName) => {
		setRoverName(newRoverName);
		setDate(maxDate);
		setCam();
	};

	const handleDate = (event) => {
		if (event.target.value === "sol") {
			setDateType("sol");
			setDate(`sol=${maxSol}`);
			setCam();
		} else if (event.target.value === "earth_date") {
			setDateType("earth_date");
			setDate(`date=${maxDate}`);
			setCam();
		}
	};

	function formatEarthDate(value) {
		if (!value) return value;
		const num = value.replace(/[^\d]/g, "");
		const numLength = num.length;
		if (numLength < 5) return num;
		if (
			num.slice(0, 4) < manifest.landing_date.slice(0, 4) ||
			num.slice(0, 4) > maxDate.slice(0, 4)
		) {
			alert(
				`Please enter a valid year between ${manifest.landing_date.slice(
					0,
					4
				)} and ${maxDate.slice(0, 4)}`
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
				if (num.slice(6, 8) > 28) {
					alert(`Please enter a valid date for a non-leap February (1-28)`);
				}
			} else {
				if (num.slice(6, 8) > 29) {
					alert(`Please enter a valid date for a leap February (1-29)`);
				}
			}
		} else {
			if (num.slice(6, 8) > 30) {
				alert(`Please enter a valid date for month ${num.slice(4, 6)} (1-30)`);
			}
		}
		return `${num.slice(0, 4)}-${num.slice(4, 6)}-${num.slice(6, 8)}`;
	}

	const handleEarthDate = (event) => {
		const formattedDate = formatEarthDate(event.target.value);
		setEarthDate(formattedDate);
		setDate(`earth_date=${formattedDate}`);
		setCam();
	};

	function formatSolDate(value) {
		if (!value) return value;
		const num = value.replace(/[^\d]/g, "");
		if (num < 0 || num > manifest.max_sol) {
			alert(`Please enter a valid Sol date between 0 and ${manifest.max_sol}`);
		}
		return num;
	}

	const handleSolDate = (event) => {
		const formattedDate = formatSolDate(event.target.value);
		setSol(formattedDate);
		setDate(`sol=${formattedDate}`);
		setCam();
	};

	const handleCam = (event) => {
		if (event.target.value === "null") {
			setCam();
			fetchAllImages();
		} else {
			setCam(event.target.value);
		}
	};

	const handlePage = (event, page) => {
		const from = (page - 1) * pageSize;
		const to = (page - 1) * pageSize + pageSize;
		setPagination({ ...pagination, from: from, to: to });
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	const returnToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	const saveSearch = () => {
		let entry = {
			id: v4(),
			rover: roverName,
			dateType: dateType,
			date: date,
			camera: cam,
		};
		let updatedSaves = [...savedSearches];
		updatedSaves.unshift(entry);
		setSavedSearches(updatedSaves);
		localStorage.setItem("allSaves", JSON.stringify(updatedSaves));
	};
	const handleDelete = (event, id) => {
		
		const itemToRemove =
			savedSearches[
				event.target.parentElement.parentElement.parentElement.parentElement.id
			];
		const currentId = itemToRemove.id;
		// console.log(currentId);
		const newSavedSearches = savedSearches.filter(
			(savedSearch) => savedSearch.id !== currentId
		);
		// console.log(newSavedSearches);
		localStorage.setItem("allSaves", JSON.stringify(newSavedSearches));
		// localStorage.allSaves.removeItem(itemToRemove)
		fetchSearches();
	};

	const handleSavedClick = (event) => {
		// const currentSearches = [...savedSearches]
		// const currentItem = currentSearches.splice(
		// 	e.target.parentElement.parentElement.id, 1);
		// 	console.log(currentItem)
		const currentItem = savedSearches[event.target.parentElement.parentElement.id];
		console.log(currentItem);
		setDateType(currentItem.dateType);
		setRoverName(currentItem.rover);
		setDate(currentItem.date);
		setCam(currentItem.camera);
	};

	return (
		<ImageContext.Provider
			value={{
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
				handlePage,
				allImages,
				paginatedImages,
				pagination,
				returnToTop,
				saveSearch,
				savedSearches,
				handleDelete,
				handleSavedClick,
				fetchCameras,
				screenSize,
			}}
		>
			{props.children}
		</ImageContext.Provider>
	);
};

export default ImageProvider;
