import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<HomePage />} />
        
        {}
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;