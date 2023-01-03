import { useContext } from "react";
import Gallery from "./components/gallery/Gallery";
import SearchForm from "./components/searchForm/SearchForm";
import { ImageContext } from "./context/ImageContext";
import { ToastContainer } from "react-toastify";
import Title from "./components/title/Title";
import { Box, Typography } from "@mui/material";

function App() {
	const { date } = useContext(ImageContext);
	return (
		<>
			<ToastContainer />
			<Box
        sx={{padding:'0'}}
      className="page">

        <Title/>
				<SearchForm />
				{date && <Gallery />}
			</Box>
      <Typography  style={{position:'fixed', bottom:'0', left:'0', zIndex:'10000', fontSize:'10px', padding:'3px'}} >Penny Nichols</Typography>
		</>
	);
}

export default App;
