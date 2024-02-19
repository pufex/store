import { getData } from './fetch.js'

let step = 0, idTimeout, idInterval;

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
        clearTimeout(idTimeout);
      }
      added = document.createElement("canvas");
      added.classList.add("top-message")
      let ctx = added.getContext("2d");
      added.width = 250;
      added.height = 300;

      const body = document.querySelector("body");
      body.appendChild(added);

      let vx = 3, t = 1000, d = 96, positionY = 0, boxHeight;
      idInterval = setInterval(() => {
        if(positionY+200 > added.height) 
          clearInterval(idInterval);
        else{
          console.log
          ctx.clearRect(0, 0, added.width, added.height);

          // Message box

          ctx.save();
          ctx.translate(0, positionY);
          ctx.fillStyle ="green"
          ctx.beginPath();
          ctx.roundRect(0,0, added.width, 100, 10);
          ctx.fill();
          ctx.closePath();
          ctx.restore()

          // Text on box

          ctx.save();
          ctx.translate(added.width/2, eval(100-38)+ positionY);
          ctx.textAlign = "center";
          ctx.fillStyle = "white";
          ctx.font = "24px sans-serif";
          ctx.fillText("Added to cart!", 0, 0);
          ctx.restore();

          positionY = positionY + vx;
        }
      })

      idTimeout = setTimeout(() => {
        added.remove();
        console.log(idTimeout);
        clearTimeout(idTimeout);
      }, 2500);
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
