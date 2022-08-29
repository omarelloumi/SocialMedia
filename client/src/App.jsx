import React from "react";
import { Container } from '@mui/material';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
function App() {
  
  return (
    <>
      <Router>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;