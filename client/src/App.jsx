import React from "react";
import { Container } from '@mui/material';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

function App() {
  
  return (
    <>
      <Container maxwidth="lg">
        <Navbar/>
        <Home/>
      </Container>
    </>
  );
}

export default App;