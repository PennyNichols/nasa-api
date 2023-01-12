import { createContext, useEffect, useState, useRef } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';

export const ImageContext = createContext();

const key = process.env.REACT_APP_NASA_API_KEY;

const ImageProvider = (props) => {

// Gets todays date and formats it for the api url
  // most of the time there are no pictures for the current date
  // I, instead, made it so the user will always be greeted with the most recent photos

  // let todaysDate = new Date();
  // const year = todaysDate.getFullYear();
  // let month = todaysDate.getMonth();
  // if (month < 9) {
  //   month = `0${month + 1}`;
  // } else {
  //   month = month + 1;
  // }
  // let today = todaysDate.getDate();
  // if (today < 9) {
  //   today = `0${today}`;
  // }
  // const now = `${year}-${month}-${today}`;

// react-toastify customization
  const notify = (message) =>
    toast(message, {
      theme: 'dark',
      autoClose: 3000,
    });

  const pageSize = 25;
  const [manifest, setManifest] = useState('');
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [activePage, setActivePage] = useState(1);
  const [paginatedImages, setPaginatedImages] = useState([]);
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState('');
  const [location, setLocation] = useState(0);
  const [roverName, setRoverName] = useState('curiosity');
  const [dateType, setDateType] = useState('earth_date');
  const [maxDate, setMaxDate] = useState('');
  const [maxSol, setMaxSol] = useState('');
  const [date, setDate] = useState('');
  const [earthDate, setEarthDate] = useState('');
  const [sol, setSol] = useState('');
  const [cam, setCam] = useState('');
  const [camSelections, setCamSelections] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [savedSearches, setSavedSearches] = useState([]);
  const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1';
  const allImagesUrl = `${baseUrl}/rovers/${roverName}/photos?${dateType}=${date}${cam}&api_key=${key}`;
  const manifestUrl = `${baseUrl}/manifests/${roverName}/?api_key=${key}`;
  const roverOptions = ['curiosity', 'opportunity', 'spirit'];
  const dateTypeOptions = ['earth_date', 'sol'];
  const [isLoading, setIsLoading] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [savedHistoryData, setSavedHistoryData] = useState({
    dateType: '',
    date: '',
    cam: '',
  });

// Changes screenSize variable if user resizes window
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  }, []);

// retrieve data from the rover manifest
// initializes data from the most recent day photos were taken if triggered by clicking a new rover
// if photos were taken on the current date, current date photos will be mapped in gallery
// guarantees the user will not be greeted with an empty gallery
// does not initialize form data if triggered by clicking a saved search
// manifest - used to look up camera options by earth date or sol
// manifest - used to look up date ranges for date input validation
  useEffect(() => {
    const fetchManifest = async () => {
      const { data } = await axios.get(manifestUrl);
      setIsLoading(false);
      const maxEarth = data.photo_manifest.max_date;
      const maxMars = data.photo_manifest.max_sol;
      const photos = data.photo_manifest.photos;
      const day = photos.find((item) => item.earth_date === maxEarth);
      const cams = day.cameras;
      setManifest(data.photo_manifest);
      setMaxDate(maxEarth);
      setMaxSol(maxMars);
      setCamSelections(cams);
      if (!isHistory) {
        setDate(maxEarth);
        setDateType('earth_date');
        setEarthDate(maxEarth);
        setSol(maxMars);
        setCam('');
        fetchAllImages();
      }
    };
    setIsLoading(true);
    fetchManifest();
  }, [roverName, manifestUrl]);

// when clicking a saved search after the manifest is loaded
// check if the current state of date, cam selection, and dateType are equal to the data from the saved search click
// if it is not, sets the state data
// ensures the correct images in the gallery and cam selections for the date
  useEffect(() => {
    if (isHistory && !isLoading) {
      if (savedHistoryData.date !== date) setDate(savedHistoryData.date);
      else if (savedHistoryData.cam !== cam) setCam(savedHistoryData.cam);
      if (savedHistoryData.dateType !== dateType)
        setDateType(savedHistoryData.dateType);
    }
  }, [isLoading, isHistory]);

// manifest.photos - array of days during which data collection occurred
// searches for data matching the provided date
// if data exists for the date, sets the cam selections
// if the current state of sol and earthDate do not match the data from the manifest, change the states to the date values from the selectedDateData
  // ensures correct images are filtered for the date selected when new date is typed and when a saved search is clicked
  const handleSelectedDateData = () => {
    if (date) {
      const photos = manifest.photos;
      const selectedDateData =
        dateType === 'sol'
          ? photos?.find((item) => item.sol === +date)
          : photos?.find((item) => item.earth_date === date);
      if (selectedDateData) {
        setCamSelections(selectedDateData?.cameras);
        if (sol !== selectedDateData?.sol) setSol(selectedDateData?.sol);
        if (earthDate !== selectedDateData?.earth_date)
          setEarthDate(selectedDateData?.earth_date);
      }
    }
  };

  useEffect(() => {
    handleSelectedDateData();
  }, [date, dateType, manifest.photos]);

// fetches image data for the indicated date
// sets both AllImages and images variables to the resulting data array
  const fetchAllImages = async () => {
    if (date) {
      const { data } = await axios.get(allImagesUrl);
      setAllImages(data.photos);
      setImages(data.photos);

      if (isHistory && !isLoading) {
        setIsHistory(false);
        console.log({ cam });
        if (savedHistoryData.cam !== cam) setCam(savedHistoryData.cam);
      }
    }
  };

  useEffect(() => {
    fetchAllImages();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

// filters the allImages array for all items matching the current cam selection and assigns the new array to the images variable
// only the data in the images variable is mapped in the gallery, this allows user to change camera selection without sending a new data request
  const handleCamChange = () => {
    if (cam) {
      const filtered = allImages?.filter((image) => image.camera.name === cam);
      setImages(filtered);
    } else {
      setImages(allImages);
    }
    if (isHistory) setIsHistory(false);
  };

// triggers handleCamChange function each time a new camera selection is made
// does not work if function is defined inside the useEffect
  useEffect(() => {
    handleCamChange();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cam]);

// allows conditional rendering to provide dynamic loading (pagination on large screens, continuous scroll on mobile)
// paginatedImages array is created from a slice of the existing images array
// pagination is dynamic based on pageSize variable
// pageSize variable could be turned into a state to allow the user to choose how many results to show per page (assignment indicated max of 25, so I did not add the extra feature)
  useEffect(() => {
    const paginateData = () => {
      setPaginatedImages(images.slice(pagination.from, pagination.to));
      setPagination({
        ...pagination,
        count: Math.ceil(images.length / pageSize),
      });
    };
    paginateData();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, pagination.to, pagination.from]);


// recalls saved searches from local storage to be mapped in the DOM for user selection of previously saved searches
  const fetchSearches = () => {
    const searchData = JSON.parse(localStorage.getItem('allSaves')) || [];
    setSavedSearches(searchData);
  };

// fetches previously saved searches at initial load
  useEffect(() => {
    fetchSearches();
  }, []);

// handles user selection of rover
// triggers the fetchManifest function
  const handleRover = (event, newRoverName) => {
    setRoverName(newRoverName);
  };

// handles user selection of date type
// triggers the useEffect hook that formats the date variable to match what is expected by the api
// triggers fetchCameras, fetchAllImages, and handleCamChange functions
  const handleDate = (event) => {
    if (event.target.value !== dateType) {
      if (event.target.value === 'sol') {
        setDateType('sol');
      } else if (event.target.value === 'earth_date') {
        setDateType('earth_date');
      }
    }
  };

// prevents user from entering invalid dates
// does not allow invalid characters
// provides feedback to the user when attempting to make invalid entry
// automatically formats the date as the user types to match what is expected by the api
// provides a toast outlining how to fix entry errors
  const formatEarthDate = (value) => {
    if (!value) return value;
    const num = value.replace(/[^\d]/g, '');
    const numLength = num.length;
    if (numLength < 5) return num;
    if (
      num.slice(0, 4) < manifest.landing_date.slice(0, 4) ||
      num.slice(0, 4) > maxDate.slice(0, 4)
    ) {
      notify(
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
      notify(`Please enter a valid month between 1 and 12`);
    }
    if (
      num.slice(4, 6) === '01' ||
      num.slice(4, 6) === '03' ||
      num.slice(4, 6) === '05' ||
      num.slice(4, 6) === '07' ||
      num.slice(4, 6) === '08' ||
      num.slice(4, 6) === '10' ||
      num.slice(4, 6) === '12'
    ) {
      if (num.slice(6, 8) > 31) {
        notify(`Please enter a valid date for month ${num.slice(4, 6)} (1-31)`);
      }
    } else if (num.slice(4, 6) === '02') {
      if (num.slice(0, 4) % 4 !== 0) {
        if (num.slice(6, 8) > 28) {
          notify(`Please enter a valid date for a non-leap February (1-28)`);
        }
      } else {
        if (num.slice(6, 8) > 29) {
          notify(`Please enter a valid date for a leap February (1-29)`);
        }
      }
    } else {
      if (num.slice(6, 8) > 30) {
        notify(`Please enter a valid date for month ${num.slice(4, 6)} (1-30)`);
      }
    }
    return `${num.slice(0, 4)}-${num.slice(4, 6)}-${num.slice(6, 8)}`;
  };

// prevents effects of date input from taking effect for 1 second after the user stops typing
// prevents data fetch from every keystroke
  const debounceDateChange = useRef(
    debounce((input) => {
      setDate(input);
      setCam('');
    }, 1000)
  ).current;

// resets debounce so effects will take place 1 second after last keystroke instead of 1 second after every keystroke
  useEffect(() => {
    return () => {
      debounceDateChange.cancel();
    };
  }, [debounceDateChange]);

// handles user input to date field when earth date option is selected
// triggers formatEarthDate fetchCameras, fetchAllImages, and handleCamChange functions
// triggers the useEffect hook that formats the date variable to match what is expected by the api
  const handleEarthDate = (event) => {
    const formattedDate = formatEarthDate(event.target.value);
    setEarthDate(formattedDate);
    debounceDateChange(event.target.value);
  };

// prevents user from entering invalid dates
// does not allow invalid characters
// provides feedback to the user when attempting to make invalid entry
// automatically formats the date as the user types to match what is expected by the api
// provides a toast outlining how to fix entry errors
  const formatSolDate = (value) => {
    if (!value) return value;
    const num = value.replace(/[^\d]/g, '');
    if (num < 0 || num > maxSol) {
      notify(`Please enter a valid Sol date between 0 and ${maxSol}`);
    }
    return num;
  };

// handles user input to date field when sol option is selected
// triggers formatSolDate fetchCameras, fetchAllImages, and handleCamChange functions
// triggers the useEffect hook that formats the date variable to match what is expected by the api
  const handleSolDate = (event) => {
    const formattedDate = formatSolDate(event.target.value);
    setSol(formattedDate);
    debounceDateChange(event.target.value);
  };

// handles user selection of camera
// triggers handleCamChange function to filter images specifically taken by the selected camera
  const handleCam = (event) => {
    if (event.target.value === 'null') {
      setCam('');
    } else {
      setCam(event.target.value);
      handlePage(null, 1);
    }
  };

// handles user interaction with pagination component
// dynamically sets the slice of the images data array mapped in the gallery
// scrolls user to the top of the gallery when a new page is selected
  const handlePage = (event, page) => {
    const galleryLocation =
      document.getElementsByClassName('gallery')[0].offsetTop;
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
    if (page !== activePage) {
      setActivePage(page);
      window.scrollTo({ top: galleryLocation, left: 0, behavior: 'smooth' });
    }
  };

// returns user to the top of the page
// button only rendered on small screen sizes without pagination
  const returnToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

// saves current search values to local storage
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
    localStorage.setItem('allSaves', JSON.stringify(updatedSaves));
  };

// finds the indicated item to remove by indexing savedSearches array
// creates a newSavedSearches array to store all items in savedSearches array that do not match the indicated item to remove
// stores new savedSearches array in local storage
  const handleDelete = (event, id) => {
    const itemToRemove =
      savedSearches[
        event.target.parentElement.parentElement.parentElement.parentElement.id
      ];
    const currentId = itemToRemove.id;
    const newSavedSearches = savedSearches.filter(
      (savedSearch) => savedSearch.id !== currentId
    );
    localStorage.setItem('allSaves', JSON.stringify(newSavedSearches));
    fetchSearches();
  };

  // sets rover and triggers manifest fetch
  // sets savedHistoryData to the clicked data
  // triggers the useEffect to set form data to savedHistoryData after manifest data has been received 
  const handleSavedClick = (event) => {
    const currentItem =
      savedSearches[event.target.parentElement.parentElement.id];
    if (isHistory) setIsHistory(false);
    setIsHistory(true);
    setRoverName(currentItem.rover);
    setSavedHistoryData({
      dateType: currentItem.dateType,
      date: currentItem.date,
      cam: currentItem.camera,
    });
	handlePage(null,1)
  };

  // prevents user from scrolling when image is in full screen
  const disableScroll = () => {
    document.querySelector('.app').classList.add('disable-scroll');
  };

  // allows user to scroll after exiting image full screen
  const enableScroll = () => {
    document.querySelector('.app').classList.remove('disable-scroll');
  };

  // opens image to full screen when the user clicks an item
  // carousel opens at the top of the page
  // location variable is set to return the user to the same location they were on the page when the item was clicked
  // sets the starting image of the slider to the image that was clicked
  // triggers disable scroll function
  const handleImageClick = (event) => {
    setLocation(event.pageY - event.clientY);
    disableScroll();
    setSliderIsOpen(true);
    const clickedId = event.target.value;
    const index = images.indexOf(
      images.find((image) => image.id === +clickedId)
    );
    setClickedIndex(index);
  };

  // closes the slider
  // triggers enableScroll function
  const handleSliderClick = () => {
    setSliderIsOpen(false);
    enableScroll();
  };

  // returns the user to the image they clicked on when closing full screen view
  useEffect(() => {
    !sliderIsOpen && window.scrollTo({ top: location, left: 0 });
  }, [sliderIsOpen, location]);

  return (
    <ImageContext.Provider
      value={{
        manifest,
        images,
        handleImageClick,
        handleSliderClick,
        sliderIsOpen,
        clickedIndex,
        roverOptions,
        dateTypeOptions,
        roverName,
        dateType,
        handleDate,
        date,
        camSelections,
        cam,
        handleRover,
        handleEarthDate,
        handleSolDate,
        handleCam,
        handlePage,
        paginatedImages,
        pagination,
        activePage,
        returnToTop,
        saveSearch,
        savedSearches,
        handleDelete,
        handleSavedClick,
        screenSize,
        sol,
        earthDate,
		setActivePage
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};
export default ImageProvider;
