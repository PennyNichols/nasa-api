import { useContext } from "react";
import Gallery from "./components/gallery/Gallery";
import SearchForm from "./components/searchForm/SearchForm";
import { ImageContext } from "./context/ImageContext";
import { ToastContainer } from "react-toastify";

function App() {
	const { date } = useContext(ImageContext);
	return (
		<>
			<ToastContainer />
			<div className="page">
				<SearchForm />
				{date && <Gallery />}
			</div>
		</>
	);
}

export default App;
