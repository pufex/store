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
    regex: /(0[1-9]|1[0-2])\/?(([0-9]{4})|[0-9]{2}$)/,
  },
  {
    name: "CVV",
    value: false,
    regex: /^[0-9]{3}$/,
  },
]


newForm[0].addEventListener("change", ()=> {
  const feedback = document.querySelector("#forName");
  newForm[0].classList.remove("invalid")
  feedback.innerText = "";
  
  if(!formValues[0].regex.test(newForm[0].value)){
    newForm[0].classList.add("invalid")
    feedback.innerText = "Invalid name";
    formValues[0].value = false;
  } else{
    formValues[0].value = newForm[0].value;
  }
})

newForm[1].addEventListener("change", ()=> {
  const feedback = document.querySelector("#forNumber");
  newForm[1].classList.remove("invalid")
  feedback.innerText = "";
  formValues[1].value = newForm[1].value;

  let str = newForm[1].value;
  while(str.indexOf(" ") != -1){
    str = str.replace(" ", "");
  }
  newForm[1].value = str;

  if(!formValues[1].regex.test(newForm[1].value)){
    feedback.innerText = "Invalid number";
    newForm[1].classList.add("invalid")
    formValues[1].value = false;
  } else{
    for(let i = 0; i < 3; i++){
      newForm[1].value = newForm[1].value.slice(0, newForm[1].value.length - (3-i)*4) + " " + newForm[1].value.slice(newForm[1].value.length - (3-i)*4);
    }
    formValues[1].value = newForm[1].value;
  }
})

newForm[2].addEventListener("keyup", ()=> {
  console.log(newForm[2].value[1])
  if(newForm[2].value.length == 2 && newForm[2].value[1] != "/"){
    newForm[2].value += "/";
    console.log("sa1")
  }else if(newForm[2].value.length == 2 && newForm[2].value[1] == "/"){
    newForm[2].value = "0" + newForm[2].value;
    console.log("sa2")
  }else if(newForm[2].value.length > 2 && newForm[2].value[2] != "/"){
    let str = newForm[2].value;
    str = str.slice(0, 2) + "/" + str.slice(2);
    newForm[2].value = str;
    console.log("shit")
  }
})

newForm[2].addEventListener("change", ()=> {
  const feedback = document.querySelector("#forDate");
  newForm[2].classList.remove("invalid")
  feedback.innerText = "";
  formValues[2].value = newForm[2].value;

  if(!formValues[2].regex.test(newForm[2].value)){
    feedback.innerText = "Invalid";
    newForm[2].classList.add("invalid");
    formValues[2].value = false;
  } else{
    formValues[2].value = newForm[2].value;
  }
})

newForm[3].addEventListener("change", ()=> {
  const feedback = document.querySelector("#forCVV");
  newForm[3].classList.remove("invalid")
  feedback.innerText = "";
  formValues[3].value = newForm[3].value;

  if(!formValues[3].regex.test(newForm[3].value)){
    feedback.innerText = "Invalid";
    newForm[3].classList.add("invalid");
    formValues[3].value = false;
  } else{
    formValues[3].value = newForm[3].value;
  }
})

newForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let returned = false;
  for(let i = 0; i < 4; i++){
    switch(formValues[i].value){
      case false: 
        newForm[i].classList.add("invalid")
        returned = true; 
        break;
      default: 
        newForm[i].classList.remove("invalid")
        break; 
    }
  }
  if(returned == true) return;

  newForm.remove();
  const container = document.querySelector(".form-container");

  container.innerHTML = "";

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  
  const messageHeaderContainer = document.createElement("div");
  messageHeaderContainer.classList.add("message-header-container");
  
  const messageHeader = document.createElement('h1')
  messageHeader.classList.add("message-header");
  messageHeader.innerText = "Done";

  const messageIcon = document.createElement('img');
  messageIcon.classList.add("message-icon");
  messageIcon.setAttribute("src", "check-mark.svg");

  messageHeaderContainer.append(messageHeader, messageIcon);

  const messageMessage = document.createElement("p");
  messageMessage.classList.add("message-message")
  messageMessage.innerText = "You've successfully bought your products!"

  const messageLink = document.createElement("a")
  messageLink.classList.add("message-link")
  messageLink.innerText = "Go back to buy more!"
  messageLink.setAttribute("href", "index.html")
  

  messageContainer.append(messageHeaderContainer, messageMessage, messageLink)

  container.appendChild(messageContainer);

  localStorage.setItem("cart", "[]");
  // e.target.form[0]
})
