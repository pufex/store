const hamburger = document.querySelector(".hamburger");

hamburger.children[0].addEventListener("click", () => {
    hamburger.children[1].classList.toggle("hidden");
})
