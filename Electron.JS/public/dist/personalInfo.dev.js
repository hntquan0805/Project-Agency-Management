"use strict";

var modalContent = document.querySelector(".modal-content");
var openModal = document.querySelector(".open-modal");
var closeModal = document.querySelector(".close-modal");
var blurBg = document.querySelector(".blur-bg");
openModal.addEventListener("click", function () {
  modalContent.classList.remove("hidden-modal");
  blurBg.classList.remove("hidden-blur");
});

var closeModalFunction = function closeModalFunction() {
  modalContent.classList.add("hidden-modal");
  blurBg.classList.add("hidden-blur");
};

blurBg.addEventListener("click", closeModalFunction);
closeModal.addEventListener("click", closeModalFunction);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modalContent.classList.contains("hidden")) {
    closeModalFunction();
  }
});