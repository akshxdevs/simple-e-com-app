import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const [checkoutCart,setCheckoutCart] = useState([]);
    const navigate = useNavigate();
    const totalPrice = localStorage.getItem("totalprice");
    useEffect(()=>{
        const cart = localStorage.getItem("cart");
        if (cart) {
            setCheckoutCart(JSON.parse(cart));
        }else{
            console.error("Error..");
        }
    },[])

    const handlePayment = () => {
        navigate("/payment")
    }

    return(
        <div>
            <h1>Checkout </h1>
            
                {checkoutCart.length > 0 ? (
                    <div>
                        <table border="1" cellPadding="10" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkoutCart.map((item,index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.productPrice}</td>
                                        <td>{item.Quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Grand total:{totalPrice}</h3>
                        <button onClick={handlePayment}>Pay</button>
                    </div>
            ):(
                <span>No items to checkout..</span>
            )}
        </div>
    );
}