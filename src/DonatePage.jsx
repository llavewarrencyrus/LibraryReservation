import React from 'react';
import styles from "./App.module.css";

import Navbar from "./components/Navbar/Navbar";
import DonateHero from './components/DonateHero/DonateHero';
import Donate from "./components/Donate/Donate";
import Footer from "./components/Footer/Footer";


function HomePage() {

  return (
    <>
      
        <div className={styles.App}>
          <Navbar />
          <DonateHero />
          <Donate />
          <Footer />
        </div>
      
    </>
  )
}

export default HomePage;
