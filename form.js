const newForm = document.querySelector("#form");

console.dir(newForm);

let formValues = [
  {
    name: "Name",
    value: false,
    regex: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/,
  },
  {
    name: "Number",
    value: false,
    regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
  },
  {
    name: "Date",
    value: false,
    regex: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/,
  },
  {
    name: "CVV",
    value: false,
    regex: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/,
  },
]


newForm[0].addEventListener("change", ()=> {
  newForm[0].nextElementSibling.innerText = "";

  if(!formValues[0].regex.test(newForm[0].value)){
    newForm[0].nextElementSibling.innerText = "Invalid name";
    formValues[0].value = false;
  } else{
    formValues[0].value = newForm[0].value;
  }
})

newForm[1].addEventListener("change", ()=> {
  newForm[1].nextElementSibling.innerText = "";
  formValues[1].value = newForm[1].value;

  if(!formValues[1].regex.test(newForm[1].value)){
    newForm[1].nextElementSibling.innerText = "Invalid number";
    formValues[1].value = false;
  } else{
    fullname = newForm[11].value;
  }
})

newForm.addEventListener("click", (e) => {
  e.preventDefault();


  // e.target.form[0]
})
