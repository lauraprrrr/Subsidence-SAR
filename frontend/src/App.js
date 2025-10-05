// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage'; // 1. Importa la nueva página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<HomePage />} />
        
        {/* Aquí definiremos la ruta para la página del mapa en el siguiente paso */}
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;