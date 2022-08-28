import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';

import AppRouter from './router/AppRouter';

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <AppRouter />
    </div>
  )
}

export default App
