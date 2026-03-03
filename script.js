// LOAD CART FROM LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// PRODUCT DATA
const products = {
    rice: [
        { name: "Jollof Rice", price: 12.99, img: "Jollofrice.jpg", rating: "⭐ 4.6", bought: 210 },
        { name: "Fried Rice", price: 10.99, img: "friedrice.jpg", rating: "⭐ 4.4", bought: 180 }
    ],
    drinks: [
        { name: "Coca-Cola", price: 2.99, img: "coke.jpg", rating: "⭐ 4.2", bought: 300 },
        { name: "Orange Juice", price: 3.99, img: "FreshJuice.jpg", rating: "⭐ 4.7", bought: 250 }
    ],
    pizza: [
        { name: "Cheese Pizza", price: "$15.99", img: "italian.jpg", rating: "⭐ 4.9", bought: 180 },
        { name: "Pepperoni Pizza", price: "$18.99", img: "chessy.jpg" , rating: "⭐ 4.4", bought: 200 }
    ],
    dessert: [
        { name: "Oreo Dessert", price: "$15.99", img: "creamy.jpg" , rating: "⭐ 4.0", bought: 180 },
        { name: "Fried Ice-Cream", price: "$18.99", img: "Special.jpg" , rating: "⭐ 4.8", bought: 180 }
    ],
    chicken: [
        { name: "Grilled Chicken", price: "$15.99", img: "kfc.jpg"  , rating: "⭐ 4.4", bought: 190 },
        { name: "Crispy Chicken", price: "$18.99", img: "GrilledChicken.jpg" , rating: "⭐ 4.0", bought: 140 }
    ]
};

// GET CATEGORY FROM URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const container = document.querySelector(".dynamic-products");
const title = document.getElementById("category-title");

// DISPLAY PRODUCTS
if (products[category]) {
    title.innerText = category.toUpperCase() + " MENU";

    products[category].forEach((product, index) => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>

                <p>${product.rating}</p>
                <p>👥 ${product.bought} people bought this</p>

                <div class="quantity">
                    <button class="decrease">-</button>
                    <span class="qty">1</span>
                    <button class="increase">+</button>
                </div>

                <button class="add-to-cart" data-index="${index}">Add to Cart</button>
            </div>
        `;
    });

    addQuantityFunction();
    addCartFunction();
} else {
    container.innerHTML = "<p>No products found.</p>";
}


// QUANTITY BUTTONS
function addQuantityFunction() {
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", function () {
            let qty = this.parentElement.querySelector(".qty");
            qty.innerText = parseInt(qty.innerText) + 1;
        });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", function () {
            let qty = this.parentElement.querySelector(".qty");
            let current = parseInt(qty.innerText);
            if (current > 1) {
                qty.innerText = current - 1;
            }
        });
    });
}


// ADD TO CART FUNCTION
function addCartFunction() {
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", function () {

            const index = this.getAttribute("data-index");
            const product = products[category][index];

            const qtyElement = this.parentElement.querySelector(".qty");
            const quantity = parseInt(qtyElement.innerText);

            cart.push({
                name: product.name,
                price: product.price,
                quantity: quantity
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            alert(product.name + " added to cart!");
        });
    });
}


// UPDATE CART COUNT
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }
}