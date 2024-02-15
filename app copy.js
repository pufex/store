import { getData } from './fetch.js'

const data = await getData()
console.log(data)
const products = document.querySelector('.products')
function dodajElement(nowyElement) {
  if (!localStorage.getItem('elementy')) {
    localStorage.setItem('elementy', '[]')
  }
  const elementy = JSON.parse(localStorage.getItem('elementy'))
  elementy.push(nowyElement)
  localStorage.setItem('elementy', JSON.stringify(elementy))
}

const productsDisplay = () => {
  data.map((item, index) => {
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
    const button = document.createElement('button')
    button.classList.add('product-button')
    button.innerText = 'Add to cart'
    button.id = item.id
    button.addEventListener('click', () => {
      const element = {
        id: item.id,
        title: item.title,
        image: item.image,
        description: item.description,
        price: item.price,
      }
      dodajElement(element)
    })
    products.append(product, img, title, description, button)
  })
}

productsDisplay()
