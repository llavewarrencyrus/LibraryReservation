import React from 'react';
import styles from './About.module.css'; // Import CSS module for styling
import { getImageUrl } from "../../utils"; // Assuming you have a utility to get image URLs

const About = () => {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>About Us</h2>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.imageContainer}>
                    <img src={getImageUrl('about/1.png')} alt="Baguio City Public Library" className={styles.image} />
                </div>

                <div className={styles.textContainer}>
                    <div className={styles.missionContainer}>
                        <h3 className={styles.subtitle}>Our Mission</h3>
                        <p className={styles.paragraph}>
                            The Baguio City Public Library is committed to providing access to knowledge, 
                            fostering a love for reading, and enriching the community's cultural life.
                            We aim to provide a welcoming environment where people of all ages can come 
                            to read, learn, and explore.
                        </p>
                    </div>

                    <div className={styles.visionContainer}>
                        <h3 className={styles.subtitle}>Our Vision</h3>
                        <p className={styles.paragraph}>
                            Our vision is to be the leading public library in the region, providing innovative services
                            and programs that cater to the needs of our community. We envision a library that fosters
                            creativity, collaboration, and a lifelong love for learning.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
