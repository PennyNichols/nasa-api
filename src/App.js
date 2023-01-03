import { useContext } from 'react';
import Gallery from './components/gallery/Gallery';
import SearchForm from './components/searchForm/SearchForm';
import { ImageContext } from './context/ImageContext';

function App() {
  const { date } = useContext(ImageContext);
  return (
    <div className="page">
        <SearchForm/>
      {date && 
        <Gallery/>
      }
    </div>
  );
}

export default App;
