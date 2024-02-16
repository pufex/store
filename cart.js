import {getData} from './fetch.js';

const updateCart = () =>{
    cart = loadCartfromLocal();
    if(cart == null) cart = [];
    const cartIcon = document.querySelector(".cart");
    if(cart.length == null || cart.length == 0){
        cartIcon.children[2].innerText == 0;
    }
    else{
        cartIcon.children[2].innerText = cart.length;
    }
}

const loadCartfromLocal = () =>{
    console.log(localStorage.getItem("cart"));
    // if(localStorage.getItem("cart"))
        // localStorage.setItem("cart", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("cart"));
}

const saveCartToLocal = (array) =>{
    localStorage.setItem("cart", JSON.stringify(array));
}

const data = await getData();
let cart = [];
cart = loadCartfromLocal();
console.log(cart);


const displayCart = () => {
    const cartContainer = document.querySelector(".cart-container")
    cartContainer.innerHTML = "";
    if(cart == []){
        const noItem = document.createElement("div");
        noItem.classList.add("cart-no-item");
        cartContainer.appendChild(noItem);
        return;
    }
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img class="cart-image" src="${item.image}" alt="image">
                <h1 class="cart-title">
                    ${item.title}
                </h1>
                <p class="cart-description">
                    ${item.description}
                </p>
                <div class="cart-buttons">
                    <div class="amount">${item.amount}</div>
                    <div class="toggle-amount">
                        <div class="plus">+</div>
                        <div class="minus">-</div>
                    </div>
                </div>
                <div class="remove">
                    X
                </div>
            </div>
        `
    })
    const removes = document.querySelectorAll(".remove");
    removes.forEach((remove, index) =>{
        remove.addEventListener("click", () => {
            cart = cart.splice(index, 1);
            remove.closest(".cart-item").remove();
            saveCartToLocal();
            displayCart();
        })
    });
}   

updateCart();
displayCart();
