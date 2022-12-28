import './App.css';
import AppPagination from './components/gallery/AppPagination';
import Gallery from './components/gallery/Gallery';
import SearchForm from './components/searchForm/SearchForm';
import ImageProvider from './context/ImageContext';

function App() {
  return (
    <ImageProvider>
      <div className="page">
        <SearchForm/>
        <Gallery/>
      </div>
    </ImageProvider>
  );
}

export default App;
