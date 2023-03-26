const button = document.querySelector(`.btn`);
const color = document.querySelector(`.color`);
const colorBag = [`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`A`,`B`,`C`,`D`,`E`,`F`];

button.addEventListener(`click`, pick);

function pick() {
    let colors=`#`
    for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random()*colorBag.length);
        colors+=colorBag[randomNumber]; 
    };
    document.body.style.background= colors;
    color.innerHTML= colors;
}