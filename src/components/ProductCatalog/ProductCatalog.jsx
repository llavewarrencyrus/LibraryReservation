import React, { useState } from "react";
import styles from './ProductCatalog.module.css'; 
import { getImageUrl } from "../../utils";
import Swal from 'sweetalert2';

const productsData = [
    { id: 1, name: 'Laptop', imageUrl: getImageUrl("products/1.png"), price: 999, description: 'High performance laptop for all your needs.', quantity: 0 },
    { id: 2, name: 'Smartphone', imageUrl: getImageUrl("products/2.png"), price: 799, description: 'Latest smartphone with cutting-edge features.', quantity: 0 },
    { id: 3, name: 'Headphones', imageUrl: getImageUrl("products/3.png"), price: 199, description: 'Noise-cancelling headphones for an immersive experience.', quantity: 0 },
    { id: 4, name: 'Smartwatch', imageUrl: getImageUrl("products/4.png"), price: 299, description: 'Stylish smartwatch with fitness tracking features.', quantity: 0 },
    { id: 5, name: 'Camera', imageUrl: getImageUrl("products/5.png"), price: 599, description: 'Professional camera for high-quality photography.', quantity: 0 },
];

const ProductCard = ({ product, updateQuantity, addToCart }) => {
    const handleAddToCart = () => {
        if (product.quantity > 0) {
            addToCart(product);
            updateQuantity(product.id, 0);
            
            Swal.fire({
                title: 'Added to Cart!',
                text: `${product.name} has been added to your cart.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Quantity Required',
                text: 'Please enter a quantity greater than zero.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.name} className={styles.image} />
            </div>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.price}>₱{product.price}</p>
            <p className={styles.description}>{product.description}</p>
            <input
                type="number"
                min="0"
                value={product.quantity}
                onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                className={styles.quantityInput}
                placeholder="Quantity" // Placeholder for clarity
            />
            <button onClick={handleAddToCart} className={styles.addButton}>Add to Cart</button>
        </div>
    );
};

const ProductCatalog = ({ setCart }) => {
    const [products, setProducts] = useState(productsData);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...existingProduct, quantity: existingProduct.quantity + product.quantity } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: product.quantity }];
            }
        });
    };

    const updateQuantity = (id, quantity) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, quantity } : product
        ));
    };

    return (
        <section className={styles.productsSection}>
            <h2 className={styles.title}>Product Catalog</h2>
            <div className={styles.productsContainer}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} updateQuantity={updateQuantity} />
                ))}
            </div>
        </section>
    );
};

export default ProductCatalog;
