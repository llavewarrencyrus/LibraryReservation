import React from 'react';
import styles from './ShoppingCart.module.css'; // Adjust the CSS path
import Swal from 'sweetalert2';

const ShoppingCart = ({ cart, setCart }) => {
    const removeFromCart = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                setCart(cart.filter(item => item.id !== id)); // Remove item from cart
                Swal.fire(
                    'Removed!',
                    'The item has been removed from your cart.',
                    'success'
                );
            }
        });
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className={styles.cartContainer}>
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.name} - ₱{item.price} x {item.quantity}
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: ₱{totalAmount}</h3>
        </div>
    );
};

export default ShoppingCart;
