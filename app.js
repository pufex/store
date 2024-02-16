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
    console.log(localStorage.getItem("cart"));
    if(!!localStorage.getItem("cart")){
        localStorage.setItem("cart", JSON.stringify([]));
        return [];
    }
    return JSON.parse(localStorage.getItem("cart"));
}

cart = loadCartfromLocal();
console.log(cart);

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


// const cartIcon = document.querySelector(".cart");
// console.dir(cartIcon);


const productsDisplay = () =>{
    const products = document.querySelector(".products");
    products.innerHTML = "";
    for(let i = 0; i < 6; i++){
        products.innerHTML += `
            <div class="product" id="${i+step}">
                <img class="product-image" src="${data[i+step].image}" alt="Shoes">
                <h1 class="product-title">
                    ${data[i+step].title}
                </h1>
                <p class="product-description">
                    ${data[i+step].description}
                </p>
                <div class="product-button">Add to cart</div>
            </div>
            `;
                
        let createdProducts = document.querySelectorAll(".product")

        createdProducts.forEach((item, index) => {
            const button = item.querySelector(".product-button");
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                console.log("added");                
                console.log(cart.findIndex(item => item.id == (index+step).toString()))
                console.log(index+step);
                console.log(cart);
                if(cart.findIndex(item => item.id == (index+step).toString()) == -1){
                    console.log("didn't find it");
                    const toCart = {
                        id: index+step, 
                        title: data[index+step].title, 
                        description: data[index+step].description, 
                        image: data[index+step].image,
                        amount: 0,
                    }
                    cart.push(toCart);
                    console.log(cart)
                    saveCartToLocal(cart);
                    updateCart();
                    console.log("added");
                }
            })
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

const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    hamburger.children[1].classList.toggle("hidden");
})

updateCart();
productsDisplay();
