const about = document.querySelector(`.about`);
const button = document.querySelectorAll(`.tab-btn`)
const article = document.querySelectorAll(`.content`)

about.addEventListener(`click`, (event)=>{
    // const id = event.target.dataset.id
    //     if(id){
    //         button.forEach((btn)=>{
    //         btn.classList.remove(`active`);
    //         event.target.classList.add(`active`);
    //         })
    //         article.forEach((content)=>{
    //             content.classList.remove(`active`);
    //         });
    //         const activeBtn = document.getElementById(id)  
    //         activeBtn.classList.add(`active`) 
    //     } 
    console.log(event.target.classList)
})


