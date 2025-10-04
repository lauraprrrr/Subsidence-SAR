// src/App.js

import './App.css';
import Header from './components/Header'; // 1. Importamos el Header

function App() {
  return (
    <div className="App">
      <Header /> {/* 2. Lo añadimos aquí */}

      {/* Este div servirá como un espaciador gigante para que podamos probar el scroll */}
      <div style={{ height: '300vh', background: '#f0f0f0' }}>
        <p style={{ paddingTop: '100px' }}>
          Aquí irá el contenido de nuestra historia...
        </p>
      </div>
    </div>
  );
}

export default App;