// copyright year update
const date = document.getElementById(`date`);
const ourDate = new Date().getFullYear();
date.innerHTML = ourDate;

// set toggle button

const toggleBtn = document.querySelector(`.nav-toggle`);
const linksContainer = document.querySelector(`.links-container`);
const links = document.querySelector(`.links`);

toggleBtn.addEventListener(`click`, function(){
    const linksHeight = links.getBoundingClientRect().height;
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;

    if(linksContainerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`
    }
    else{
        linksContainer.style.height = 0
    }
})

// fixed navBar
const navBar = document.getElementById(`nav`);
const topBtn = document.querySelector(`.top-links`);

window.addEventListener(`scroll`, function(){
    const navBarHeight = navBar.getBoundingClientRect().height;
    const scrollHeight = window.pageYOffset;
    if(scrollHeight > navBarHeight) {
        navBar.classList.add(`fixed-nav`)
    }
    else{
        navBar.classList.remove(`fixed-nav`)
    }

    if (scrollHeight > 500){
        topBtn.classList.add(`show-top-links`);
    }
    else{
        topBtn.classList.remove(`show-top-links`);
    }
});

// scroll event
const scrollPage = document.querySelectorAll(`.scroll-link`);

scrollPage.forEach((link)=>{
    link.addEventListener(`click`, (event)=>{
         event.preventDefault();
         const id = event.currentTarget.getAttribute(`href`).slice(1);
         const element = document.getElementById(id);
         const linksContainerHeight = linksContainer.getBoundingClientRect().height;
         const navBarHeight = navBar.getBoundingClientRect().height;
         let position = element.offsetTop - navBarHeight;
         const fixedNav = navBar.classList.contains(`fixed-nav`)
        
         if (!fixedNav){
            position = position-navBarHeight
         }
         if (navBarHeight > 66){
            position = position + linksContainerHeight
         }
         
         window.scrollTo({
            left:0, top:position
        })

         console.log(position)
         linksContainer.style.height = 0
    });
});