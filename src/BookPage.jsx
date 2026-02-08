import React from 'react';
import styles from "./App.module.css";

import Navbar from "./components/Navbar/Navbar";
import BookLists from "./components/BookLists/BookLists";
import Footer from "./components/Footer/Footer";


function BookPage() {

  return (
    <>
      
        <div className={styles.App}>
          <Navbar />
          <BookLists />
          <Footer />
        </div>
      
    </>
  )
}

export default BookPage;
