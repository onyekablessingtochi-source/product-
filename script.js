// script.js

// 1️⃣ Define all products
const products = {
    rice: [
        { name: "Jollof Rice", price: "$12.99", img: "jollofrice.jpg" },
        { name: "Fried Rice", price: "$10.99", img: "images/friedrice.jpg" }
    ],
    drinks: [
        { name: "Coca-Cola", price: "$2.99", img: "images/coke.jpg" },
        { name: "Orange Juice", price: "$3.99", img: "images/orangejuice.jpg" }
    ],
    pizza: [
        { name: "Cheese Pizza", price: "$15.99", img: "images/cheesepizza.jpg" },
        { name: "Pepperoni Pizza", price: "$18.99", img: "images/pepperonipizza.jpg" }
    ],
    dessert: [
        { name: "Oreo Dessert", price: "$15.99", img: "images/oreodessert.jpg" },
        { name: "Fried Ice-Cream", price: "$18.99", img: "images/friedicecream.jpg" }
    ],
    chicken: [
        { name: "Grilled Chicken", price: "$15.99", img: "images/grilledchicken.jpg" },
        { name: "Crispy Chicken", price: "$18.99", img: "images/crispchicken.jpg" }
    ]
};

// 2️⃣ Get category from URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 3️⃣ Select container and title
const container = document.querySelector(".dynamic-products");
const title = document.getElementById("category-title");

// 4️⃣ Display products dynamically
if (category && products[category]) {
    // Update title
    title.innerText = category.toUpperCase() + " MENU";

    // Create product cards
    products[category].forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <button>Order Now</button>
        `;

        container.appendChild(card);
    });
} else {
    // If category not found
    container.innerHTML = "<p style='font-size:18px; color:red;'>No products found in this category.</p>";
}