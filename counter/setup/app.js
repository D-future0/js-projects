let digit = document.querySelector(`.digit`);
const btns = document.querySelectorAll(`.btn`);
let count = 0

btns.forEach(function (btn){
     btn.addEventListener(`click`, function pick(event) {
        const typeOfBtn = event.currentTarget.classList;
        if (typeOfBtn.contains('decrease')) {
         count--
         if(count<0){
            count=0
         }
        }
        if (typeOfBtn.contains('reset')) {
         count=0
        }
        if (typeOfBtn.contains('increase')) {
         count++
        }
        digit.innerHTML= count 
        if (count>0) {
         digit.style.color =`blue`
        }
        else if (count<0) {
         digit.style.color =`red`
        }
        else{
         digit.style.color =`black`
        }
     })
    });
    