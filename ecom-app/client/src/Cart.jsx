import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



export const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const totalprice = cart.reduce((acc,item) => acc + item.productPrice,0);
    localStorage.setItem("totalprice",totalprice);
    console.log(totalprice);
    

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                cart.map((item, index) => (
                    <div key={index}>
                        <img src={item.productImg} alt={item.productName} width="100" />
                        <h4>{item.productName}</h4>
                        <p>Price: {item.productPrice}rs</p>
                        <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
                    </div>
                    
                ))
            ) : (
                <div>
                    <p>Your cart is empty.</p>
                    <p>Grand Total: 0</p>
                </div>
            )}
            <p>Grand Total: {totalprice}</p>
            <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
    );
};
