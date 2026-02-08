import React, { useState } from 'react';
import styles from './Checkout.module.css';
import Swal from 'sweetalert2'; 

const Checkout = ({ cart }) => {
    const [result, setResult] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async (event) => {
        event.preventDefault();

        if (cart.length === 0 || !name || !email) {
            setResult("Please enter your name and email.");
            return;
        }

        const confirm = await Swal.fire({
            title: 'Confirm your order',
            text: `Total Amount: ₱${totalAmount}\nName: ${name}\nEmail: ${email}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        });

        if (!confirm.isConfirmed) return; 

        setResult("Sending...");

        const formData = new FormData();
        formData.append("access_key", "2aef2153-bde5-4a37-bdc3-d88a10cdb9d8");
        formData.append("name", name);
        formData.append("email", email);

        const orderDetails = cart.map(item => `${item.name} - ₱${item.price} x ${item.quantity}`).join("\n");
        formData.append("message", `Order Details:\n${orderDetails}\nTotal Amount: ₱${totalAmount}`);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Response Data:", data); 

            if (data.success) {
                setResult("Checkout successful! An email has been sent with your order details.");
                setName("");
                setEmail("");
            } else {
                console.log("Error", data);
                setResult(data.message || "There was an error sending your order."); 
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setResult("There was an error sending your order."); 
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <form onSubmit={handleCheckout}>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <h3>Your Order:</h3>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                {item.name} - ₱{item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₱{totalAmount}</h3>
                    <button className={styles.confirmButton} type="submit">Confirm Purchase</button>
                    <p className={styles.resultMessage}>{result}</p>
                </form>
            )}
        </div>
    );
};

export default Checkout;
