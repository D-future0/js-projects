const button = document.querySelector(`.btn`);
const color = document.querySelector(`.color`);
const colorBag = [`red`, `yellow`, `green`, `blue`, `purple`, `orange`, `gold`, `pink`];

button.addEventListener(`click`, random);
function random() {
    let outPutColor=Math.floor(Math.random()*colorBag.length);

    document.body.style.backgroundColor= colorBag[outPutColor];
    color.innerHTML= colorBag[outPutColor];
    
}
