const button = document.querySelector(".btn");
const videoContainer = document.querySelector(`.video-clip`);
const preloader = document.querySelector(`.preloader`);


button.addEventListener(`click`, function(){
  if(!button.classList.contains(`slide`)){
    button.classList.add(`slide`)
    videoContainer.pause()
  }
  else{
    button.classList.remove(`slide`);
    videoContainer.play()
  }
})
window.addEventListener(`load`, function () {
  preloader.classList.add(`hide-preloader`)

}) 