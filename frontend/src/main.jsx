import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 1. Importa 'extendTheme' además de ChakraProvider
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Pásale el tema que acabamos de crear al Provider */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)