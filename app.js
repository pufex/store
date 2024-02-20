import { getData } from './fetch.js'

let step = 0, idTimeout = [,], idInterval, newPosition;
console.log(idTimeout.length)

const data = await getData()
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
      ctx.fillText("Added to cart!", 0, 0);
      ctx.restore();

      vx = ((4*vmax)/((t1-t0)*(t0-t1)))*(t-t0)*(t-t1)
      positionY = positionY + vx;
      time = new Date();
      dateCurrent = time.getSeconds() + time.getMilliseconds()/1000;
      t = dateCurrent - dateStart;
      console.log(t);
      }
  }, 0);
}

const productsDisplay = () => {
  products.innerHTML = '';
  data.filter((item, index) => index < 6+step && index >= step).map((item, index) => {
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
      const element = {
        id: item.id,
        title: item.title,
        image: item.image,
        description: item.description,
        amount: 1,
        price: item.price,
      }
      dodajElement(element)
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

      boxAnimation(added, ctx, 0, 0.75, 0.57, 0)

      idTimeout[1] = setTimeout(() => {
        boxAnimation(added, ctx, 0, 2, -2, newPosition)
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
}

productsDisplay()
