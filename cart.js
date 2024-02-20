const cart = JSON.parse(localStorage.getItem('cart')) || []

const container = document.querySelector('.cart-container');
const cartContainer = document.querySelector('.the-cart');
const cartSummary = document.querySelector(".cart-summary");
const saveCartToLocal=(cart)=>{
    localStorage.setItem('cart', JSON.stringify(cart))
}

let idTimeout = [,], idInterval, newPosition, deleted = localStorage.getItem("deleted") || "false";

const boxAnimation = (canvas, ctx, t0, t1, vmax, position) => {
  let boxHeight = 60;

  let vx = 0, positionY = position, t = t0, fadeout = 0;

  let time, dateStart, dateCurrent;


  time = new Date();
  dateStart = time.getSeconds() + time.getMilliseconds()/1000;

  idInterval = setInterval(() => {
    if(t > t1){
      clearInterval(idInterval);
      newPosition = positionY
    }
    else{

      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255 / 30%)"
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      
      // Message box 

      ctx.save();
      ctx.translate(0, positionY);
      ctx.fillStyle = "crimson"
      ctx.beginPath();
      ctx.roundRect(0,0, canvas.width, boxHeight, 10);
      ctx.fill();
      ctx.closePath()
      ctx.restore()

      // Text on box
      ctx.save();

      ctx.translate(canvas.width/2, eval(boxHeight-24)+ positionY);
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.font = "24px sans-serif";
      ctx.fillText("Successfully deleted!", 0, 0);
      ctx.restore();

      vx = ((4*vmax)/((t1-t0)*(t0-t1)))*(t-t0)*(t-t1)
      positionY = positionY + vx;
      time = new Date();
      dateCurrent = time.getSeconds() + time.getMilliseconds()/1000;
      t = dateCurrent - dateStart;
      }
  }, 0);
}

const displayCart = () => {
  if(!cart.length){
        container.innerHTML = ''
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
  cartContainer.innerHTML = '';
  cartSummary.innerHTML = '';

  const summaryHeader = document.createElement("h1");
  summaryHeader.classList.add("summary-header");
  summaryHeader.innerText = "Your cart";

  const summaryPrices = document.createElement("div");
  summaryPrices.classList.add("summary-prices");

  const hr1 = document.createElement("hr");
  hr1.classList.add("summary-hr");

  const hr2 = document.createElement("hr");
  hr2.classList.add("summary-hr");

  const summaryHeader2 = document.createElement("h1");
  summaryHeader2.classList.add("summary-header");
  
  const summaryButton = document.createElement("a");
  summaryButton.classList.add("summary-button");
  summaryButton.setAttribute("href", "form-payment.html")
  summaryButton.innerText = "Pay now!"
  
  cartSummary.append(summaryHeader, hr1, summaryPrices, hr2, summaryHeader2, summaryButton);
  
  
  let sum = cart.reduce((accumulator, item) => accumulator + item.price*item.amount, 0)
  summaryHeader2.innerText += "Total: $" + sum.toFixed(2);


  cart.map((item, index) => {
    const summaryPrice = document.createElement("div");
    summaryPrice.classList.add("summary-price");
    summaryPrice.innerText = `${index+1}. ${item.amount}  * ${item.price} = ${((item.price*item.amount).toFixed(2)).toString()}`;
    summaryPrices.appendChild(summaryPrice);


    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')

    const img = document.createElement('img')
    img.classList.add('cart-image')
    img.src = item.image

    const cartTitle = document.createElement('h1')
    cartTitle.classList.add('cart-title')
    cartTitle.innerText = item.title;

    const cartDescription = document.createElement('p')
    cartDescription.classList.add('cart-description')
    cartDescription.innerText = item.description
    
    const cartButtons = document.createElement("div");
    cartButtons.classList.add("cart-buttons");
    
    const cartPrice = document.createElement('p')
    cartPrice.classList.add('cart-price')
    cartPrice.innerText = (item.price*item.amount).toFixed(2);
    
    const cartAmount = document.createElement("div");
    cartAmount.classList.add("cart-amount");

    const cartQuantity = document.createElement("div");
    cartQuantity.classList.add("cart-quantity");
    cartQuantity.innerText = item.amount;

    const add = document.createElement("div");
    add.classList.add("plus");
    add.innerText = "+";
    add.addEventListener("click", () => {
      item.amount++;
      saveCartToLocal(cart);
      location.reload();
    })
    
    const remove = document.createElement("div");
    remove.classList.add("minus");
    remove.innerText = "-";
    remove.addEventListener("click", () => {
      if(item.amount >= 2){
        item.amount--;
        saveCartToLocal(cart);
        location.reload();
      } 
    })

    cartAmount.append(remove, cartQuantity, add);

    cartButtons.append(cartPrice, cartAmount);
    
    const buttonDelete = document.createElement('div')
    buttonDelete.id=item.id
    buttonDelete.classList.add('remove')
    buttonDelete.innerText = 'X'
    buttonDelete.addEventListener('click', (e) => {
      
      let newCart = cart.filter((item, index) => item.id != e.target.id)
     
      saveCartToLocal(newCart)
      localStorage.setItem("deleted", "true")
      location.reload()
    })
    cartItem.append(img, cartTitle, cartDescription, cartButtons, buttonDelete)
    cartContainer.append(cartItem)

    

  })
  console.log(sum);
}
console.log(deleted);
if(deleted == "true"){
  let added = document.querySelector(".top-message");
  localStorage.setItem("deleted", "false");
  if(added != null){
    added.remove();
    clearInterval(idInterval);
    clearTimeout(idTimeout[0]);
    clearTimeout(idTimeout[1]);
  }
  added = document.createElement("canvas");
  added.classList.add("top-message")
  let ctx = added.getContext("2d");
  added.width = 250;
  added.height = 300;
  const body = document.querySelector("body");
  body.appendChild(added)
  boxAnimation(added, ctx, 0, 1, 0.57, 0), 
  idTimeout[1] = setTimeout(() => {
    boxAnimation(added, ctx, 0, 2, -2, newPosition)
  }, 3000)
  idTimeout[0] = setTimeout(() => {
    added.remove();
    console.log(idTimeout[0]);
    clearTimeout(idTimeout[0]);
  }, 6000);
}
  
displayCart()
