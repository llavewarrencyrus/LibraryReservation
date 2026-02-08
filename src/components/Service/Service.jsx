import React from 'react';
import styles from './Service.module.css'; // Import as 'styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faWifi, faChalkboardTeacher, faLaptop, faUsers, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getImageUrl } from '../../utils';

const Service = () => {
  const services = [
    { 
      title: 'Book Lending', 
      description: 'Dive into our extensive collection of books, magazines, and journals, carefully curated for all ages and interests. Borrow your favorite titles and enjoy them at your leisure, with flexible lending policies. Whether for study or pleasure, our library has something for everyone.', 
      icon: <FontAwesomeIcon icon={faBook} />,
      image: getImageUrl("services/1.png")
    },
    { 
      title: 'E-Books & Digital Resources', 
      description: 'Access thousands of e-books, research databases, and digital materials anytime, anywhere. Stay updated with the latest publications and academic resources at your fingertips. Perfect for on-the-go learners and tech-savvy readers.', 
      icon: <FontAwesomeIcon icon={faLaptop} />,
      image: getImageUrl("services/2.png")  // Make sure the correct image path is provided
    },
    { 
      title: 'Research Assistance', 
      description: 'Our experts are here to guide you through your research journey, whether it’s for school, work, or personal growth. Get help finding reliable sources, crafting bibliographies, or diving deep into academic materials. We’re dedicated to making your research process smooth and successful.', 
      icon: <FontAwesomeIcon icon={faSearch} />,
      image: getImageUrl("services/3.png")  // Make sure the correct image path is provided
    },
    { 
      title: 'Free Wi-Fi', 
      description: 'Stay connected with our high-speed internet, available for all visitors free of charge. Use it to complete assignments, browse the web, or access digital resources without interruptions. Our Wi-Fi service ensures you can work, learn, or connect efficiently.', 
      icon: <FontAwesomeIcon icon={faWifi} />,
      image: getImageUrl("services/4.png")  // Make sure the correct image path is provided
    },
    { 
      title: 'Reading Rooms', 
      description: 'Enjoy a quiet, comfortable environment dedicated to focused reading and studying. Our reading rooms are equipped with ample lighting, ergonomic seating, and a serene atmosphere. Perfect for uninterrupted learning or enjoying a good book in peace.', 
      icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
      image: getImageUrl("services/5.png")  // Make sure the correct image path is provided
    },
    { 
      title: 'Community Programs', 
      description: 'Join us for vibrant storytelling sessions, interactive workshops, and book club discussions. Our programs are designed to foster learning, creativity, and community engagement. Meet like-minded individuals and explore new ideas in a welcoming space.', 
      icon: <FontAwesomeIcon icon={faUsers} />,
      image: getImageUrl("services/6.png")  // Make sure the correct image path is provided
    },
  ];

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <h2 className={styles['services-title']}>Our Services</h2>
        <div className={styles['services-grid']}>
          {services.map((service, index) => (
            <div key={index} className={styles['service-card']}>
              <div className={styles['service-content']}>
                <div className={styles['service-icon']}>{service.icon}</div>
                <h3 className={styles['service-title']}>{service.title}</h3>
                <p className={styles['service-description']}>{service.description}</p>
              </div>
              <div className={styles['service-image']} style={{ backgroundImage: `url(${service.image})` }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
