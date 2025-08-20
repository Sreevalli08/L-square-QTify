import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import Section from "./Section/Section";
import './App.css';

function App() {

  return (
  <div>
  
    <Navbar/>
    <Hero/>

    {/**Top Albums */}
    <Section
    title="Top Albums"
    apiEndpoint="https://qtify-backend-labs.crio.do/albums/top"/>

     {/*New Albums */}

     <Section
     title="New Albums"
     apiEndpoint= "https://qtify-backend-labs.crio.do/albums/new"

  />

  </div>
  );
}
 
  

export default App;
