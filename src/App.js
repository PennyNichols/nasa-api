import './App.css';
import Form from './components/form/Form';
import ImageProvider from './context/ImageContext';

function App() {
  return (
    <ImageProvider>
      <div className="page">
        <Form/>
      </div>
    </ImageProvider>
  );
}

export default App;
