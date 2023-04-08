const dropMenu = document.getElementById("dropBtn");
const display_links = document.getElementById("links");

dropMenu.addEventListener(`click`, function(){
    display_links.classList.toggle(`display_links`)
})
console.log(display_links)