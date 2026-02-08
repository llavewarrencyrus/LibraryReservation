import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa'; // Added FaCode
import styles from './Footer.module.css'; // Import your CSS module

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Library Info */}
                <h2 className={styles.title}>Baguio City Public Library</h2>
                <p className={styles.paragraph}>
                    Promoting education, lifelong learning, and community engagement. Visit us or connect online to explore our wide array of resources.
                </p>
                <p className={styles.contact}>
                    <FaMapMarkerAlt className={styles.icon} />
                    Jose Abad Santos Dr, Baguio City, Philippines
                </p>
                <p className={styles.email}>
                    <FaEnvelope className={styles.icon} />
                    bcplibrary@baguiocity.gov.ph
                </p>

                {/* Social Media Links */}
                <div className={styles.icons}>
                    <a href="https://www.facebook.com/baguiocitypubliclibrary" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className={styles.icon} />
                    </a>
                    <a href="https://www.instagram.com/citylibrarybaguio/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className={styles.icon} />
                    </a>
                    <a href="https://www.youtube.com/@baguiocitypubliclibrary61?app=desktop" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className={styles.icon} />
                    </a>
                </div>

                {/* Separator Line with Icon */}
                <div className={styles.separator}>
                    <hr className={styles.line} />
                </div>

                {/* Credits Section */}
                <div className={styles.credits}>
                    <h3 className={styles.creditsTitle}>Developed by:</h3>
                    <ul className={styles.developersList}>
                        <li>Felix Miguel Galpao</li>
                        <li>Cristian Joseph Dizon</li>
                        <li>Warren Cyrus Llave</li>
                        <li>Jake Parungao</li>
                    </ul>
                    <h3 className={styles.creditsTitle}>Mentor:</h3>
                    <ul className={styles.developersList}>
                        <li>Benny Cris Pio</li>
                    </ul>
                    <h3 className={styles.creditsTitle}>Deans of School of Information Technology:</h3>
                    <ul className={styles.developersList}>
                        <li>Dr. Ellen Halover</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
