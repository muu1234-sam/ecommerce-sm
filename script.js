var items = [
    { id: 1, name: "Laptop", price: 500000.00, image: "https://evercomps.co.ke/wp-content/uploads/2024/06/hp-elitebook-x360-1040-g7-14-i5-10210u-16gb-512gb-ssd-laptop.jpeg" },
    { id: 2, name: "Phone", price: 200000.00, image: "https://appleprice.co.ke/wp-content/uploads/2024/04/iPhone-13-mini-d.jpg" },
    { id: 3, name: "Headphones", price: 5000.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSY6lCuUhozBZKqUhMcKKrQt9KkvC5OkiswQ&s" }
];

var cart = [];
var total = 0;

document.addEventListener("DOMContentLoaded", () => {
    displayItems();
    document.getElementById("registration-form").addEventListener("submit", handleRegistration);
    document.getElementById("checkout").addEventListener("click", showPaymentOptions);
    document.getElementById("mpesa").addEventListener("click", handleMpesaPayment);
    document.getElementById("card").addEventListener("click", handleCardPayment);
});

function displayItems() {
    var itemsDiv = document.getElementById("items");
    items.forEach(item => {
        var itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: Ksh${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        itemsDiv.appendChild(itemDiv);
    });
}

function showSection(section) {
    var sections = ['home', 'registration', 'items', 'cart', 'contact'];
    sections.forEach(sec => {
        document.getElementById(sec + '-section').style.display = sec === section ? 'block' : 'none';
    });
}

function handleRegistration(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    alert(`Registration Successful!\nUsername: ${username}\nEmail: ${email}`);
    showSection('items');
}

function addToCart(itemId) {
    var item = items.find(i => i.id === itemId);
    cart.push(item);
    total += item.price;
    updateCart();
}

function updateCart() {
    var cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = ''; // Clear the cart display
    cart.forEach(item => {
        var itemDiv = document.createElement("div");
        itemDiv.textContent = `${item.name} - Ksh${item.price}`;
        cartItemsDiv.appendChild(itemDiv);
    });
    document.getElementById("total").textContent = `Total: Ksh${total}`;
}

function showPaymentOptions() {
    document.getElementById("payment-options").style.display = 'block';
}

function handleMpesaPayment() {
    var phoneNumber = prompt("Enter your phone number for M-Pesa payment:");
    if (phoneNumber) {
        alert(`M-Pesa payment of Ksh${total} initiated for phone number ${phoneNumber}`);
    }
}

function handleCardPayment() {
    alert(`Card payment of Ksh${total} initiated.`);
}
function orderThroughWhatsApp() {
    var message = "Hello, I would like to place the following order:\n";
    cart.forEach(item => {
        message += `${item.name} - Ksh${item.price}\n`;
    });
    message += `Total: Ksh${total}`;

    var phoneNumber = "+254113236282"; // Replace with your WhatsApp number
    var whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

showSection('home');
