const months = [
    `January`,`Febuary`,`March`,`April`,`may`,`June`,`July`,`Auguest`,`September`,`October`,`November`,`December`
];
const day = [
    `Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thuesday`,`Friday`,`Saturday`
]

const giveaway = document.querySelector(`.giveaway`);
const deadlines = document.querySelector(`.deadlines`);
const deadlinesTime = document.querySelectorAll(`.deadlines-format h4`);

const futureDate = new Date(2023, 4, 30, 12, 00, 00);

const ourYear = futureDate.getFullYear();
const ourDate = futureDate.getDate();
const ourHour = futureDate.getHours();
const ourMinute = futureDate.getMinutes();
const ourSeconds = futureDate.getSeconds();

const ourMonth = months[futureDate.getMonth()];
const ourDay = day[futureDate.getDay()];

giveaway.textContent = `Giveaway ends on ${ourDay}, ${ourDate}th ${ourMonth} ${ourYear} ${ourHour}:${ourMinute}0:${ourSeconds}0am`;
// deadline time setup
const timeSetup = ()=>{
    const futureTime = futureDate.getTime();
    const presentTime = new Date().getTime();
    const timeDifference = futureTime - presentTime;
    // values in micro seconds
    const perDay = 24 * 60 * 60 * 1000;
    const perHour = 60 * 60 * 1000;
    const perMinute = 60 * 1000;
    const perSecond = 1000
    // calculate count down time
    const days = Math.floor(timeDifference / perDay);
    const hours = Math.floor((timeDifference % perDay) / perHour);
    const minutes = Math.floor(((timeDifference % perDay) % perHour) / perMinute);
    const seconds = Math.floor((timeDifference % perMinute) / perSecond);
    
    const timeIndex = (timeIndex) =>{
        if (timeIndex < 10){return timeIndex = `0${timeIndex}`}
        else{return timeIndex}
    };
    
    const values = [days,hours,minutes,seconds];
    deadlinesTime.forEach((time,index) => {
        time.textContent = timeIndex(values[index]);
    });

    if (timeDifference < 0){
        clearInterval(countDown);
        deadlines.innerHTML = `<h4>giveaway has expired</h4>`
    }
};
const countDown = setInterval(timeSetup, 1000)




 