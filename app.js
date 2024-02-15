import {getData} from './fetch.js';

const data = await getData();
console.log(data);

const stepbar = document.querySelector(".stepbar")

let step = 0; 
let cart = [];

const saveCartToLocal = (array) =>{
    localStorage.setItem("cart", JSON.stringify(array));
}

const loadCartfromLocal = () =>{
    return JSON.parse(localStorage.getItem("cart"));
}

cart = loadCartfromLocal();

const updateCart = () =>{
    cart = loadCartfromLocal();
    if(cart == null) cart = [];
    const cartIcon = document.querySelector(".cart");
    if(cart.length == null || cart.length == 0){
        cartIcon.children[1].innerText == 0;
    }
    else{
        cartIcon.children[1].innerText = cart.length;
    }
    cartIcon.children[0].addEventListener("click", () => {
        cartIcon.children[2].classList.toggle("hidden");
        cartIcon.children[2].innerHTML = "";
        cart.forEach((item, index) => {

            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <img class="cart-item-image" scr="${cart[index].image}">
                <div class="cart-item-summary">
                    <h1 class="cart-item-title">${cart[index].name}</h1>
                    <p class="cart-item-description">${cart[index].description}</p>
                    <div class="cart-item-buttons">
                        <div class="cart-item-amount">${cart[index].amount}</div>
                        <div class="cart-item-add">+</div>
                        <div class="cart-item-drop">-</div>
                    </div>
                </div>
            `

            cartIcon.children[2].appendChild(cartItem);

            const plus = cartItem.querySelector(".cart-item-add");
            plus.addEventListener("click", () => {
                const amount = cartItem.querySelector(".cart-item-amount");
                cart[index].amount += 1;
                amount.innerText = cart[index].amount;
                console.log(cart[index].amount);
            })  
            
            const minus = cartItem.querySelector(".cart-item-drop");
            minus.addEventListener("click", () => {
                const amount = cartItem.querySelector(".cart-item-amount");
                if(Number(amount.innerText)-1 > 0){
                    cart[index].amount -= 1;
                    amount.innerText = cart[index].amount;
                    console.log(cart[index].amount);
                }
            })  
        })
    })
}

// const cartIcon = document.querySelector(".cart");
// console.dir(cartIcon);


const productsDisplay = () =>{
    const products = document.querySelector(".products");
    products.innerHTML = "";
    for(let i = 0; i < 6; i++){
        products.innerHTML += `
            <div class="product">
                <img class="product-image" src="${data[i+step].image}" alt="Shoes">
                <h1 class="product-title">
                    ${data[i+step].title}
                </h1>
                <p class="product-description">
                    ${data[i+step].description}
                </p>
            </div>
        `;

        const button = document.createElement("div");
        button.classList.add("product-button");
        button.innerText = "Add to cart";
        console.log("button")
        button.addEventListener("click", () => {
            console.log(cart.findIndex(x => x.title === data[index].title));
            if(cart.findIndex(x => x.title === data[index].title) !== -1){
                cart.push(JSON.parse(`{id: ${index}, name: ${data[index].name}, description: ${data[index].description}, image: }`));
                saveCartToLocal(cart);
                updateCart();
                console.log("added")
            }
        })


        let createdProducts = document.querySelectorAll(".product")
        createdProducts.forEach((item, index) => {
            if(index == i){
                button.addEventListener("click", () => {
                    if(cart.findIndex(x => x.title === data[index].title) !== -1){
                        cart.push(JSON.parse(`{id: ${index}, name: ${data[index].name}, description: ${data[index].description}, image: }`));
                        saveCartToLocal(cart);
                        updateCart();
                        console.log("added");
                    }
                })
                item.appendChild(button);
            } 
        })
    }
    stepbar.innerHTML = "";
    for(let i = 0; i < Math.ceil(data.length/6); i++){
        const button = document.createElement("a");
        button.setAttribute("href", "#main")
        button.classList.add("stepbar-button");
        button.innerText = i+1;

        button.addEventListener("click", () => {
            step = i*6;
            console.log(step);
            productsDisplay();
        })

        stepbar.appendChild(button);
    }
}

updateCart();
productsDisplay();