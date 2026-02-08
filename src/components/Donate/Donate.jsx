import React, { useState } from "react";
import styles from "./Donate.module.css";
import { FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const Donate = () => {
  const [books, setBooks] = useState([
    { type: "Books", customType: "", quantity: "" },
  ]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBook = () => {
    setBooks([...books, { type: "Books", customType: "", quantity: "" }]);
  };

  const handleDeleteBook = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this book entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (books.length > 1) {
          const updatedBooks = books.filter((_, i) => i !== index);
          setBooks(updatedBooks);
          Swal.fire("Deleted!", "The book entry has been removed.", "success");
        }
      }
    });
  };

  const handleBookChange = (index, field, value) => {
    const updatedBooks = books.map((book, i) =>
      i === index ? { ...book, [field]: value } : book
    );
    setBooks(updatedBooks);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // Create a formatted message for email
    const booksList = books
      .map((book, index) => {
        const typeInfo = book.type === "Others" ? book.customType : book.type;
        return `${index + 1}. Type: ${typeInfo}, Quantity: ${book.quantity}`;
      })
      .join("\n");
  
    const emailMessage = `
  Hello,
  
  A new donation form has been submitted on your website. Details below:
  
  Donor's Name: ${event.target.name.value}
  Address: ${event.target.address.value}
  Contact Number: ${event.target.contact.value}
  
  Books Information:
  ${booksList}
  
  Thank you.
    `;
  
    // Prepare form data
    const formData = new FormData();
    formData.append("message", emailMessage); // Only include the formatted message
    formData.append("access_key", "99c912f3-385f-40fb-8bea-f10460151cdf");
  
    // Send data to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
    setLoading(false);
  
    if (data.success) {
      Swal.fire({
        title: "Success!",
        text: "Your donation was submitted successfully!",
        icon: "success",
      });
      setBooks([{ type: "Books", customType: "", quantity: "" }]);
    } else {
      console.log("Error", data);
      setResult(data.message);
      Swal.fire({
        title: "Error!",
        text: "There was an issue with your donation submission.",
        icon: "error",
      });
    }
  };

  return (
    <section className={styles.contact}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>
          <b>Donate Books</b>
        </h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Donor's Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              className={styles.input}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Address
            </label>
            <input
              name="address"
              type="text"
              id="address"
              className={styles.input}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact" className={styles.label}>
              Contact Number
            </label>
            <input
              name="contact"
              type="tel"
              id="contact"
              className={styles.input}
              placeholder="Enter your contact number"
              required
            />
          </div>
          <div className={styles.booksSection}>
            <h3 className={styles.subtitle}>Books Information</h3>
            {books.map((book, index) => (
              <div key={index} className={styles.bookRow}>
                <select
                  className={`${styles.input} ${styles.smallInput}`}
                  value={book.type}
                  onChange={(e) =>
                    handleBookChange(index, "type", e.target.value)
                  }
                  required
                >
                  <option value="Books">Books</option>
                  <option value="Fiction Books">Fiction Books</option>
                  <option value="Children's Story Books">
                    Children's Story Books
                  </option>
                  <option value="Audio-Visual Materials">
                    Audio-Visual Materials
                  </option>
                  <option value="Periodicals/Serials">
                    Periodicals/Serials
                  </option>
                  <option value="Theses/Dissertations">
                    Theses/Dissertations
                  </option>
                  <option value="Filipiniana Books">
                    Filipiniana Books
                  </option>
                  <option value="Foreign Books">
                    Foreign Books
                  </option>
                  <option value="Magazines and Journals">
                    Magazines and Journals
                  </option>
                  <option value="Non-Print Materials">
                    Non-Print Materials
                  </option>
                  <option value="Special Collections">
                    Special Collections
                  </option>
                </select>
                <input
                  type="number"
                  className={`${styles.input} ${styles.smallInput}`}
                  placeholder="Quantity"
                  value={book.quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d+$/.test(value)) {
                      handleBookChange(index, "quantity", value); // Allow empty or numeric input temporarily
                    }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value || parseInt(e.target.value) < 1) {
                      handleBookChange(index, "quantity", "1"); // Reset to 1 if input is invalid
                    }
                  }}
                  required
                />
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={`${styles.deleteButton} ${styles.iconButton}`}
                    onClick={() => handleDeleteBook(index)}
                    aria-label="Delete this book"
                    disabled={books.length === 1}
                  >
                    <FaTrash />
                  </button>
                  {index === books.length - 1 && (
                    <button
                      type="button"
                      className={`${styles.addButton} ${styles.iconButton}`}
                      onClick={handleAddBook}
                      aria-label="Add another book"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className={styles.button}>
            Submit Donation
          </button>
        </form>
        {result && <div>{result}</div>}
      </div>
      {loading && (
        <div className={styles.loadingModal}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </section>
  );
};

export default Donate;
