import { getData } from './fetch.js'

let step = 0, idTimeout = [,], idInterval, newPosition, cart;
console.log(idTimeout.length)

let data = await getData();
let oldData = data;

console.log(data)
const products = document.querySelector('.products')
function dodajElement(nowyElement) {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]')
  }
  const elementy = JSON.parse(localStorage.getItem('cart'))
  elementy.push(nowyElement)
  localStorage.setItem('cart', JSON.stringify(elementy))
}

cart = JSON.parse(localStorage.getItem("cart"));

const boxAnimation = (canvas, ctx, t0, t1, vmax, position, message) => {
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
      ctx.fillStyle ="green"
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
      ctx.fillText(message, 0, 0);
      ctx.restore();

      vx = ((4*vmax)/((t1-t0)*(t0-t1)))*(t-t0)*(t-t1)
      positionY = positionY + vx;
      time = new Date();
      dateCurrent = time.getSeconds() + time.getMilliseconds()/1000;
      t = dateCurrent - dateStart;
      }
  }, 0);
}

const productsDisplay = () => {
  console.log("displaying...")
  products.innerHTML = '';
  data.filter((item, index) => index < 6+step && index >= step).map((item, index) => {
    console.log(item.price);
    const product = document.createElement('div')
    product.classList.add('product')
    const img = document.createElement('img')
    img.classList.add('product-image')
    img.src = item.image
    const title = document.createElement('h1')
    title.classList.add('product-title')
    title.innerText = item.title
    const description = document.createElement('p')
    description.classList.add('product-description')
    description.innerText = item.description
    const price = document.createElement('p')
    price.classList.add('product-price')
    price.innerText = item.price
    const button = document.createElement('div')
    button.classList.add('product-button')
    button.innerText = 'Add to cart'
    button.id = item.id
    button.addEventListener('click', () => {
      console.log(cart);
      console.log(item.id)
      // console.log(cart[0].id)
      console.log(cart.indexOf(cartItem => cartItem.id == item.id));
      if(cart.find(cartItem => cartItem.id == item.id)){
        let added = document.querySelector(".top-message");

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
        body.appendChild(added);

        boxAnimation(added, ctx, 0, 0.75, 0.57, 0, "Already in cart!")

        idTimeout[1] = setTimeout(() => {
          boxAnimation(added, ctx, 0, 2, -2, newPosition, "Already in cart!")
        }, 3000)

        idTimeout[0] = setTimeout(() => {
          added.remove();
          console.log(idTimeout[0]);
          clearTimeout(idTimeout[0]);
        }, 6000); 
        return;
      }
      const element = {
        id: item.id,
        title: item.title,
        image: item.image,
        description: item.description,
        amount: 1,
        price: item.price,
      }
      dodajElement(element);

      cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart)
      let added = document.querySelector(".top-message");
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
      body.appendChild(added);

      boxAnimation(added, ctx, 0, 0.75, 0.57, 0, "Added to cart!")

      idTimeout[1] = setTimeout(() => {
        boxAnimation(added, ctx, 0, 2, -2, newPosition, "Added to cart!")
      }, 3000)

      idTimeout[0] = setTimeout(() => {
        added.remove();
        console.log(idTimeout[0]);
        clearTimeout(idTimeout[0]);
      }, 6000);
    })
    product.append(img, title, description, button)
    products.append(product)
  })

  const stepbar = document.createElement("div");
  stepbar.classList.add("stepbar");
  for(let i = 0; i < Math.ceil(data.length/6); i++){
    const button = document.createElement("a");
    button.setAttribute("href", "#main");
    button.classList.add("stepbar-button");
    button.innerText = i+1;
    button.addEventListener("click", () => {
      step = i*6;
      productsDisplay();
    });
    stepbar.append(button);
  }
  products.append(stepbar);

  data = oldData;
}

productsDisplay()

const rolledLists = document.querySelectorAll(".rolled");

rolledLists.forEach((item) => {
  const listTitle = item.querySelector(".rolled-title");
  const theList = item.querySelector(".rolled-list");
  listTitle.addEventListener("click", () => {
    theList.classList.toggle("hidden");
  })
})

const applyFilters = document.querySelector(".apply-filters")

applyFilters.addEventListener("click", () => {
  console.log(1);
  const categories = document.querySelectorAll('input[name="category"]') 
  let chosenCategory;

  for(const category of categories){
    if(category.checked){
      chosenCategory = category.value;
    }else{}
  }
  console.log(chosenCategory);

  data = data.filter(item => item.category == chosenCategory);

  const ratings = document.querySelectorAll('input[name="rating"]');
  let chosenRating;

  console.log(1);
  for(const rating of ratings){
    if(rating.checked){
      chosenRating = rating.value;
    }
  }
  console.log(chosenRating);
  switch(chosenRating){
    case "3":
      data = data.filter(item => item.rating.rate < 4);
      break;
    case "4":
      data = data.filter(item => item.rating.rate >= 4 && item.rating.rate < 5);
      break;
    case "5":
      data = data.filter(item => item.rating.rate == 5);
      break;
    default: return; 
  }

  const prices = document.querySelectorAll('input[name="price"]')
  let chosenPrice;

  console.log(1);
  for(const price of prices){
    if(price.checked){
      chosenPrice = price.value;
    }
  }
  console.log(chosenPrice);

  switch(chosenPrice){
    case "low":
      data.sort((a,b) => a.price - b.price);
      break;
    case "high": 
      data.sort((b,a) => a.price - b.price);
      break;
    case "default": break;
    default: return;
  }

  console.log(1);
  productsDisplay();
})

const resetFilters = document.querySelector(".reset-filters")

resetFilters.addEventListener("click", () => {
  location.reload();
})
