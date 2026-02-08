import React from 'react';
import styles from './Contact.module.css'; 
import { getImageUrl } from "../../utils";
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "99c912f3-385f-40fb-8bea-f10460151cdf");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
            Swal.fire({
                title: "Success!",
                text: "Your form submitted successfully!",
                icon: "success"
              });
        }else{
            Swal.fire({
                title: "Error!",
                text: "Your form not submitted successfully!",
                icon: "error"
              });
        }
    };

    return (
        <section className={styles.contact}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}><b>Get in Touch</b></h2>
                <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}><FaUser className={styles.icon} />Name</label>
                        <div className={styles.inputGroup}>
                            
                            <input name="name" type="text" id="name" className={styles.input} placeholder='Enter your Name' required />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}><FaEnvelope className={styles.icon} />Email</label>
                        <div className={styles.inputGroup}>
                            
                            <input name="email" type="email" id="email" className={styles.input} placeholder='Enter your Email' required />
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className={styles.formGroup}>
                        
                        <label htmlFor="message" className={styles.label}><FaCommentDots className={styles.icon} />Message</label>
                        <div className={styles.inputGroup}>
                            <textarea name="message" id="message" className={styles.textarea} placeholder='Enter your Message' required></textarea>
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
            <div className={styles.imageContainer}>
            <iframe
                className={styles.image}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.6499812970741!2d120.59436589278096!3d16.408502733503084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a1696c5c432f%3A0xb84c4bfa4b7541d7!2sBaguio%20City%20Library!5e0!3m2!1sen!2sph!4v1732119134416!5m2!1sen!2sph"
                width="500"
                height="400"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Responsive Google Map"
                />

            </div>
            
        </section>
    );
};

export default Contact;