import React from "react";
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
    url="https://qtify-backend-labs.crio.do/albums/top"/>

     {/*New Albums */}

     <Section
     title="New Albums"
     url= "https://qtify-backend-labs.crio.do/albums/new"

  />

  < Section

  title="Songs"
  url="https://qtify-backend-labs.crio.do/songs"
  type="songs"
  />

  </div>
  );
}
 
  

export default App;
