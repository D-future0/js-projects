const open_model = document.querySelector(".model-btn");
const close_model = document.querySelector(".close-btn");
const model = document.querySelector(".model-overlay");

open_model.addEventListener(`click`, function(){
    model.classList.add(`open-model`)
});
close_model.addEventListener(`click`, function(){
    model.classList.remove(`open-model`)
});