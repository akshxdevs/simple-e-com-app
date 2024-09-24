import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Home = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [value, setValue] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const initailValue = 40;

    useEffect(() => {
        const getUsername = localStorage.getItem("username");
        if (getUsername) {
            setLogin(true);
            setUsername(getUsername);
        }
        getAllProducts();
    }, []);

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

        setFilteredProducts(filtered);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category); 
        filterProducts(); 
    };

    const handlePriceFilterChange = (price) => {
        setValue(price); 
        filterProducts(); 
    };

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
            </div>
            <div>
                <button onClick={() => setShowFilter(true)}>Filter</button>
                {showFilter ? (
                    <div>
                        {initailValue}
                        <p>Filter with price..</p>
                        <input
                            type="range"
                            min="40"
                            max="100000"
                            step="1"
                            value={value}
                            onChange={(e) => {
                                handlePriceFilterChange(e.target.value);
                            }}
                            style={{ width: "300px" }}
                        />
                        {value}
                        <button onClick={() => filterProducts()}>Apply</button>
                    </div>
                ) : (
                    ""
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
                {showFilter ? (
                    <div>
                        <p>Filter with ratings..</p>
                        <button>Rating</button>
                    </div>
                ) :( 
                    ""

                )}
            </div>
            <div>
                {showFilter ? (
                    <div>
                        <p>Filter with availabity..</p>
                        <button>Availabity</button>
                    </div>
                ) :( 
                    ""

                )}
            </div>
            <div>
                {showFilter ? (
                    <div>
                        <p>Filter with brand..</p>
                        <button>Brand</button>
                    </div>
                ) :( 
                    ""

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
                        </div>
                    ))
                ) : (
                    <p>No products available for the selected category.</p>
                )}
            </div>

        </div>
    );
};
