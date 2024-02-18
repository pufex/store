const cart = JSON.parse(localStorage.getItem('cart')) || []
const container = document.querySelector('.cart-container')
const saveCartToLocal=(cart)=>{
    localStorage.setItem('cart', JSON.stringify(cart))
}


const displayCart = () => {
    container.innerHTML = ''
    if(!cart.length){
        const messageEmpty = document.createElement("div");
        messageEmpty.classList.add("message-empty")
        const messageText = document.createElement("div");
        messageText.classList.add("message-text");
        messageText.innerText = "Your cart is empty!";
        const messageLink = document.createElement("a");
        messageLink.setAttribute("href", "./index.html");
        messageLink.innerText = "Go back to the home page."
        messageLink.classList.add("message-link");

        messageEmpty.append(messageText, messageLink);
        container.appendChild(messageEmpty);
        return;
    }
  cart.map((item, index) => {
   
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')
    const img = document.createElement('img')
    img.classList.add('cart-image')
    img.src = item.image
    const cartTitle = document.createElement('h1')
    cartTitle.classList.add('cart-title')
    cartTitle.innerText = item.title
    const cartDescription = document.createElement('p')
    cartDescription.classList.add('cart-description')
    cartDescription.innerText = item.description
    const cartPrice = document.createElement('p')
    cartPrice.classList.add('cart-price')
    cartPrice.innerText = item.price
    const cartAmount = document.createElement('div')
    const buttonDelete = document.createElement('div')
    buttonDelete.id=item.id
    buttonDelete.classList.add('remove')
    buttonDelete.innerText = 'X'
    buttonDelete.addEventListener('click', (e) => {
      
      let newCart = cart.filter((item, index) => item.id != e.target.id)
     
      saveCartToLocal(newCart)
      location.reload()
    })
    cartItem.append(img, cartTitle, cartDescription, cartPrice, buttonDelete)
    container.append(cartItem)
  })

}
displayCart()
// import {getData} from './fetch.js';

// const updateCart = () =>{
//     cart = loadCartfromLocal();
//     if(cart == null) cart = [];
//     const cartIcon = document.querySelector(".cart");
//     if(cart.length == null || cart.length == 0){
//         cartIcon.children[2].innerText == 0;
//     }
//     else{
//         cartIcon.children[2].innerText = cart.length;
//     }
// }

// const loadCartfromLocal = () =>{
//     console.log(localStorage.getItem("cart"));
//     // if(localStorage.getItem("cart"))
//         // localStorage.setItem("cart", JSON.stringify([]));
//     return JSON.parse(localStorage.getItem("cart"));
// }

// const saveCartToLocal = (array) =>{
//     localStorage.setItem("cart", JSON.stringify(array));
// }

// const data = await getData();
// let cart = [];
// cart = loadCartfromLocal();
// console.log(cart);


// const displayCart = () => {
//     const cartContainer = document.querySelector(".cart-container")
//     cartContainer.innerHTML = "";
//     if(cart == []){
//         const noItem = document.createElement("div");
//         noItem.classList.add("cart-no-item");
//         cartContainer.appendChild(noItem);
//         return;
//     }
//     cart.forEach((item, index) => {
//         cartContainer.innerHTML += `
//             <div class="cart-item">
//                 <img class="cart-image" src="${item.image}" alt="image">
//                 <h1 class="cart-title">
//                     ${item.title}
//                 </h1>
//                 <p class="cart-description">
//                     ${item.description}
//                 </p>
//                 <div class="cart-buttons">
//                     <div class="amount">${item.amount}</div>
//                     <div class="toggle-amount">
//                         <div class="plus">+</div>
//                         <div class="minus">-</div>
//                     </div>
//                 </div>
//                 <div class="remove">
//                     X
//                 </div>
//             </div>
//         `
//     })
//     const removes = document.querySelectorAll(".remove");
//     removes.forEach((remove, index) =>{
//         remove.addEventListener("click", () => {
//             cart = cart.splice(index, 1);
//             remove.closest(".cart-item").remove();
//             saveCartToLocal();
//             displayCart();
//         })
//     });
// }   

// updateCart();
// displayCart();
