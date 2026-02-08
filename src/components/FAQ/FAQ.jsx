import React, { useState } from 'react';
import styles from './FAQ.module.css'; // Import CSS module

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "What are the library's hours of operation?", answer: 'The Baguio City Library is open Monday to Saturday from 8 AM to 5 PM.' },
    { question: 'How long can I borrow books for?', answer: 'Books can typically be borrowed for 7 days. Extensions may be granted upon request.' },
    { question: 'How do I reserve a book?', answer: 'You can reserve a book online through our website or by f2f.' },
    { question: 'Is there a limit to how many books I can reserve at once?', answer: 'Yes, you can reserve up to 5 books at a time.' },
    { question: 'Are there any library events or workshops happening soon?', answer: 'Yes, we have workshops and events listed on our website. Check the “Activities” section for details.' },
    { question: 'How do I cancel a book reservation?', answer: 'You can cancel your book reservation by contacting the email of library.' },
    { question: 'Can someone else pick up my reserved book for me?', answer: 'Yes, someone else can pick up your reserved book, but they’ll need to show your ID.' },
    { question: 'Can I donate books to the library?', answer: 'Yes, we accept book donations. Please check our website for guidelines on donations.' },
    { question: 'How do I report a damaged or lost book?', answer: 'Please contact the library immediately to report a damaged or lost book. You may need to pay for the replacement cost.' },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles.top}>
      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>Frequently Asked Questions</h1>
        <div className={styles.description}>
          <p>
            Welcome to our Library FAQ section! Here you'll find answers to common questions about our services,
            policies, and procedures. If you can't find what you're looking for, feel free to contact us.
          </p>
          <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
        </div>
      </div>
      <div className={styles.container}>
        

        {filteredFaqs.length > 0 ? (
          <div className={styles.accordionContainer}>
            {filteredFaqs.map((faq, index) => (
              <div key={index} className={styles.accordionItem}>
                <div
                  className={styles.question}
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <span className={styles.icon}>{activeIndex === index ? '-' : '+'}</span>
                </div>
                {activeIndex === index && (
                  <div className={styles.answer}>
                    <p style={{ color: '#2b87d1' }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>
            No results found for "{searchTerm}". Please try again with a different keyword.
          </p>
        )}
      </div>
    </section>
  );
};

export default FAQ;
 