let cart = [];
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartIcon = document.getElementById("cart-icon");
const cartSection = document.getElementById("cart-section");
const closeCartButton = document.getElementById("close-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price"));
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) { existingProduct.quantity += 1 } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 })
        }
        saveCartToLocalStorage();
        updateCart()
    })
});
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0; cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name; li.appendChild(document.createElement("br"));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`الكمية: ${item.quantity}`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`السعر: ${item.price * item.quantity} دينار`));
        li.appendChild(document.createElement("br")); li.appendChild(document.createElement("br"));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.color = "#ffffff";
        deleteButton.style.backgroundColor = "#199da699";
        deleteButton.addEventListener("click", () => { deleteProduct(item.id) });
        li.appendChild(deleteButton); cartItems.appendChild(li);
        total += item.price * item.quantity
    });
    totalPriceElement.textContent = total.toFixed(2)
}
function deleteProduct(productId) {
    cart = cart.filter(item => item.id !== productId); saveCartToLocalStorage(); updateCart()
}
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) { cart = JSON.parse(savedCart); updateCart() }
}
window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage); function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart))
}
window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage)



