import React, { useState, useEffect } from "react";
import styles from "./SectionTour.module.css";
import { getImageUrl } from "../../utils";

const SectionTour = () => {
    const sections = [
        {
            title: "Explore Libraries",
            description: "Discover the library's layout and resources located on the 1st floor, providing access to various reading materials and study areas.",
            image: getImageUrl("sectionTour/1stfloor.png"),
        },
        {
            title: "Chinese Corner",
            description: "A special area on the 1st floor dedicated to books and resources focused on Chinese literature, culture, and language.",
            image: getImageUrl("sectionTour/chinese.png"),
        },
        {
            title: "Fiction Books",
            description: "The section on the 1st floor where you can find a wide range of fiction books across different genres, perfect for readers looking for entertainment and imaginative stories.",
            image: getImageUrl("sectionTour/fiction.png"),
        },
        {
            title: "Inspirational Books",
            description: "A collection on the 1st floor that includes books meant to motivate and uplift readers, providing guidance and positive perspectives.",
            image: getImageUrl("sectionTour/inspirational.png"),
        },
        {
            title: "Periodicals Section",
            description: "Located on the 1st floor, this area features a collection of current and archived magazines and journals covering various topics for research and leisure reading.",
            image: getImageUrl("sectionTour/periodicals.png"),
        },
        {
            title: "Children's Section",
            description: "The 1st-floor section designed for young readers, offering a variety of children's books, including picture books, early readers, and educational stories.",
            image: getImageUrl("sectionTour/children.png"),
        },
        {
            title: "Let's continue with another floor",
            description: "Transition to the 2nd floor, where a new range of specialized sections awaits you.",
            image: getImageUrl("sectionTour/2ndfloor.png"),
        },
        {
            title: "Gender and Development Sections",
            description: "A part of the 2nd floor that focuses on materials related to gender studies and development, promoting awareness and education on gender-related issues.",
            image: getImageUrl("sectionTour/gad.png"),
        },
        {
            title: "Filipiniana Section",
            description: "The 2nd-floor section dedicated to works related to the history, culture, and contributions of the Philippines, offering a unique collection for local studies.",
            image: getImageUrl("sectionTour/filipiniana.png"),
        },
        {
            title: "Local History Section",
            description: "A section on the 2nd floor featuring books and documents that highlight the historical events and stories of the local community and region.",
            image: getImageUrl("sectionTour/localhistory.png"),
        },
        {
            title: "Law Section",
            description: "Located on the 2nd floor, this area holds legal texts, case law, and reference books for students, professionals, and anyone interested in the legal system.",
            image: getImageUrl("sectionTour/law.png"),
        },
        {
            title: "General Collection Section",
            description: "The 2nd-floor space that houses a variety of books covering multiple disciplines, offering comprehensive resources for research and reading.",
            image: getImageUrl("sectionTour/general.png"),
        },
        {
            title: "Let's continue with the last floor",
            description: "Move up to the 3rd floor to explore the final level of specialized library sections.",
            image: getImageUrl("sectionTour/3rdfloor.png"),
        },
        {
            title: "Study Carrels Section",
            description: "A section on the 3rd floor designed with individual study carrels for focused, private study sessions.",
            image: getImageUrl("sectionTour/studycarrels.png"),
        },
        {
            title: "Supreme Court Reports Annotated",
            description: "The 3rd-floor section that includes comprehensive volumes of Supreme Court rulings, valuable for legal research and reference.",
            image: getImageUrl("sectionTour/supreme.png"),
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle automatic interval
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === sections.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [sections.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === sections.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sections.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className={styles.sectionTour}>
            <h2 className={styles.title}>Take a Tour</h2>
            <div className={styles.carousel}>
                <button className={styles.navButton} onClick={handlePrev}>
                    &#8592;
                </button>
                <div className={styles.carouselContent}>
                    <img
                        src={sections[currentIndex].image}
                        alt={sections[currentIndex].title}
                        className={styles.image}
                    />
                    <div className={styles.content}>
                        <h3 className={styles.slideTitle}>{sections[currentIndex].title}</h3>
                        <p className={styles.description}>{sections[currentIndex].description}</p>
                    </div>
                </div>
                <button className={styles.navButton} onClick={handleNext}>
                    &#8594;
                </button>
            </div>
            <div className={styles.dots}>
                {sections.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${
                            index === currentIndex ? styles.activeDot : ""
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default SectionTour;