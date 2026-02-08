import React from 'react';
import styles from './Goal.module.css';
import { getImageUrl } from '../../utils';

const Goal = () => {
  const goals = [
    {
      title: "Promote Literacy",
      description: "Encourage reading habits by providing access to diverse resources and programs.",
      image: getImageUrl("goal/promoteliteracy.png")
    },
    {
      title: "Support Research",
      description: "Offer access to reliable information and tools to assist academic and personal research.",
      image: getImageUrl("goal/2.png")
    },
    {
      title: "Foster Community",
      description: "Create a welcoming space for community engagement, learning, and collaboration.",
      image: getImageUrl("goal/fostercommunity.png")
    }
  ];

  return (
    <section className={styles.goalsSection}>
      <h2 className={styles.title}>Our Goals</h2>
      <div className={styles.cardsContainer}>
        {goals.map((goal, index) => (
          <div key={index} className={styles.card}>
            <img src={goal.image} alt={goal.title} className={styles.cardImage} />
            <h3 className={styles.cardTitle}>{goal.title}</h3>
            <p className={styles.cardDescription}>{goal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Goal;
