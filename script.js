
let user = { name: "", spend: 0, orders: 0, cart: [] };
const levels = [
    { name: "Beginner", min: 0, max: 1000, color: "#fff" },
    { name: "Regular", min: 1000, max: 2000, color: "#ddd" },
    { name: "Silver", min: 2000, max: 3000, color: "#c0c0c0" },
    { name: "Gold", min: 3000, max: 4000, color: "#D4AF37" },
    { name: "Platinum", min: 4000, max: 5000, color: "#E5E4E2" }
];

const products = [
    { id: 1, name: "NVИ Compression", price: 850, img: "product1.jpg" },
    { id: 2, name: "NVИ Shorts", price: 650, img: "product2.jpg" }
];

function handleLogin() {
    let name = document.getElementById("username-input").value;
    if(!name) return alert("Please enter your name!");
    user.name = name;
    document.getElementById("login-page").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("display-name").innerText = name;
    renderProducts();
    updateLevels();
}

function renderProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p>${p.price} EGP</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

window.addToCart = (id) => {
    let p = products.find(x => x.id == id);
    user.cart.push(p);
    updateCart();
};

function updateCart() {
    let total = user.cart.reduce((s, i) => s + i.price, 0);
    document.getElementById("cart-items").innerHTML = user.cart.map(i => `<p>${i.name}</p>`).join('');
    document.getElementById("total-price").innerText = `Total: ${total} EGP`;
}

function updateLevels() {
    let current = levels.find(l => user.spend >= l.min && user.spend < l.max) || levels[4];
    document.getElementById("lvl-text").innerText = current.name;
    document.getElementById("lvl-text").style.color = current.color;
    let prog = (user.spend / 5000) * 100;
    document.getElementById("progress-bar").style.width = Math.min(prog, 100) + "%";
}

window.checkLvl = (n) => alert("This level is locked. You're closer than you think! Keep shopping to unlock.");

window.sendToWhatsapp = () => {
    if(user.cart.length == 0) return alert("Cart is empty!");
    let items = user.cart.map(i => i.name).join(', ');
    let total = user.cart.reduce((s, i) => s + i.price, 0);
    let msg = `Hello NVИ👋%0AName: ${user.name}%0ALevel: ${document.getElementById("lvl-text").innerText}%0AOrder: ${items}%0ATotal: ${total} EGP`;
    window.open(`https://wa.me/qr/U3OXN6HVOH6RD1?text=${msg}`);
};

window.onscroll = () => { document.getElementById("scrollTop").style.display = window.scrollY > 400 ? "block" : "none"; };
document.getElementById("scrollTop").onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});