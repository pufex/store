import { getData } from './fetch.js'

let step = 0;

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
