import axios from "axios";
import { parse } from "dotenv";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Home = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [value, setValue] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [rating, setRating] = useState(0);
    const [availability, setAvailability] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [message, setMessage] = useState("");
    const initialValue = 40;
    const [showCartProducts,setShowCartProducts] = useState(0)
    const [pincode, setPincode] = useState("");
    const popupInterval = 1 * 60 * 1000;
    const [showMessage, setShowMessage] = useState(false);
    const [isPopupCompleted, setIsPopupCompleted] = useState(false); 
    const navigate = useNavigate();
    useEffect(() => {
        const getUsername = localStorage.getItem("username");
        if (getUsername) {
            setLogin(true);
            setUsername(getUsername);
        }
        getAllProducts();

        if (!isPopupCompleted) {
            const intervalId = setInterval(() => {
                setShowPop(true);
            }, popupInterval);

            return () => clearInterval(intervalId);
        }
    }, [isPopupCompleted]); 

    const closePopup = () => {
        setShowPop(false);
    };

    const getAllProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products");
            toast.success("Successfully fetched all the products");
            const data = res.data;
            setProducts(data);
            setFilteredProducts(data); 
        } catch (error) {
            toast.error("ERROR!!");
        }
    };

    const filterProducts = () => {
        let filtered = products; 
        if (selectedCategory) {
            filtered = filtered.filter(
                (product) => product.category === selectedCategory
            );
        }
        if (value > 0) {
            filtered = filtered.filter(
                (product) => product.productPrice <= Number(value)
            );
        }
        if (rating > 0) {
            filtered = filtered.filter(
                (product) => product.productRating >= Number(rating)
            );
        }
        if (availability) {
            filtered = filtered.filter(
                (product) => product.productIsAvailability === true
            );
        }

        setFilteredProducts(filtered);
    };
    const popupStyles = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      };
      
      const popupContentStyles = {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        filterProducts();
    };

    const handlePriceFilterChange = (price) => {
        setValue(price);
        filterProducts();
    };

    const handleRating = (rating) => {
        setRating(rating);
        filterProducts();
    };

    const handleAvailability = (state) => {
        setAvailability(state);
        filterProducts();
    };

    const handleDeliveryQuery = (pincode) => {
        if (pincode >= 600000 && pincode < 700000) {
            setMessage("CONGRATULATIONS, free delivery available.");
        } else if (pincode >= 500000 && pincode < 600000) {
            setMessage("CONGRATULATIONS, free delivery available.");
        } else {
            setMessage("Delivery not available in your location right now.");
        }
    };

    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
        handleDeliveryQuery(e.target.value);
    };

    const handlePopupCompletion = () => {
        setIsPopupCompleted(true);  
        closePopup();
    };

    const handleAddToCartBtn = (productName,productImg,productPrice,productId) => {
        let noOfProductsINCart = 0;
        const newItem = {
            productName,
            productImg,
            productPrice,
            productId
        }

        let existingCart = localStorage.getItem("cart");
        if (!existingCart) {
            existingCart = [];
        }else{
            try {
                existingCart = JSON.parse(existingCart);
                noOfProductsINCart = existingCart.length;
            } catch (error) {
                console.error("Error parsing cart data:", error);
                existingCart = []
            }
        }

        const isProductInCart = existingCart.some(item => item.productId === productId);
        if (!isProductInCart) {
            existingCart.push(newItem);
            noOfProductsINCart++;
            setShowCartProducts(noOfProductsINCart);
        }else{
            toast.warn(`${productName} is already in cart`);
        }
        try {
            const cartString =JSON.stringify(existingCart);
            localStorage.setItem("cart",cartString);
        } catch (error) {
            console.error(error);
        }
        
        toast.success(`${productName} Added to the cart sucessfully..`)
        console.log(noOfProductsINCart);
        
    }

    return (
        <div>
            <h1>E-com App</h1>
            <div>
                <button onClick={() => handleCategoryFilter("electronics")}>Electronics</button>
                <button onClick={() => handleCategoryFilter("fashion")}>Fashion</button>
                <button onClick={() => handleCategoryFilter("home&kitchen")}>Home & Kitchen</button>
                <button onClick={() => handleCategoryFilter("books&stationary")}>Books & Stationary</button>
                <button onClick={() => {
                    setSelectedCategory("");
                    setFilteredProducts(products);
                }}>
                    All Products
                </button>
                <button onClick={()=>{navigate("/cart")}}>🛒</button>{showCartProducts}
            </div>
            <div>
                <button onClick={() => setShowFilter((prevState)=> !prevState)}>Filter</button>
                {showFilter && (
                    <div>
                        {initialValue}
                        <p>Filter with price..</p>
                        <input
                            type="range"
                            min="40"
                            max="100000"
                            step="1"
                            value={value}
                            onChange={(e) => handlePriceFilterChange(e.target.value)}
                            style={{ width: "300px" }}
                        />
                        {value}
                        <button onClick={filterProducts}>Apply</button>
                    </div>
                )}
            </div>
            <div>
                {login && <h3>Hello {username}</h3>}
                {login && (
                    <button
                        onClick={() => {
                            localStorage.clear();
                            setLogin(false);
                            setUsername("");
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
            <div>
                {showFilter && (
                    <div>
                        <p>Filter with ratings..</p>
                        <button onClick={() => handleRating(1)}>1</button>
                        <button onClick={() => handleRating(2)}>2</button>
                        <button onClick={() => handleRating(3)}>3</button>
                        <button onClick={() => handleRating(4)}>4</button>
                        <button onClick={() => handleRating(5)}>5</button>
                        <p>stars</p>
                    </div>
                )}
            </div>
            <div>
                {showFilter && (
                    <div>
                        <p>Filter with availability..</p>
                        <button onClick={() => handleAvailability(true)}>In Stock</button>
                    </div>
                )}
            </div>
            <div>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product._id}>
                            <img src={product.productImg} alt={product.productName} width="100" />
                            <h4>Product Name: {product.productName}</h4>
                            <p>Description: {product.productDescription}</p>
                            <p>Price: {product.productPrice}rs</p>
                            <p>Category: {product.category}</p>
                            <p>Rating: {product.productRating}</p>
                            <button onClick={()=>handleAddToCartBtn(product.productName,product.productImg,product.productPrice,product._id)}>Add to cart</button> <br /> <br />
                        </div>
                    ))
                ) : (
                    <p>No products available for the selected category.</p>
                )}
            </div>
            {showPop && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h3>Check your pincode for delivery here</h3>
                        <input
                            type="text"
                            value={pincode}
                            onChange={handlePincodeChange}
                        />
                        {showMessage && <div>{message}</div>}
                        <button onClick={()=>{setShowMessage(true)}}>Check</button>
                        <button onClick={handlePopupCompletion}>Close</button>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>
        
    );
    
};
