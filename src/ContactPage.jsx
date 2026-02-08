import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <Contact />
            <FAQ />
            <Footer />
        </>
    );
};

export default ContactPage;
