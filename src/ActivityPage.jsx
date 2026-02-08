import React from "react";
import styles from "./App.module.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Activity from "./components/Activity/Activity";
import Footer from "./components/Footer/Footer";



const ActivityPage = () => {
  return (
    <div className={styles.App}>
          <Navbar />
          <Activity />
          <Footer />
    </div>
  );
};

export default ActivityPage;
