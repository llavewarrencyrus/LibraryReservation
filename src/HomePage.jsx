import React from 'react';
import styles from "./App.module.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from './components/About/About';
import SectionTour from './components/SectionTour/SectionTour';
import Goal from './components/Goal/Goal';
import Service from './components/Service/Service';
import Footer from "./components/Footer/Footer";


function HomePage() {

  return (
    <>
      
        <div className={styles.App}>
          <Navbar />
          <Hero />
          <About />
          <SectionTour />
          <Goal />
          <Service />
          <Footer />
        </div>
      
    </>
  )
}

export default HomePage;
