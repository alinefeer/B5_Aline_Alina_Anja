/*slider*/
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
let index = 0;

document.querySelector(".next").addEventListener("click", () => {
  console.log("indexbefore", index);
  index = (index + 1) % images.length;
  console.log("indexafter", index);
  updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  updateSlider();
});

function updateSlider() {
  slides.style.transform = `translateX(${-index * 600}px)`;
}
