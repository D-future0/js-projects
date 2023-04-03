 const review = [
    {id: 1, name:`Chibuike Valentine`, img:`./person1.jpg`, job:`Graphic Designer`, info:`There are three responses to a piece of disign - yes, no, and WOW! Wow is the one i aim for.`},
    {id: 2, name:`Boicreation`, img:`./person2.JPEG`, job:`Software Engineer`, info:`Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...[Therefore,] making it easy to read makes it easier to write.`},
    {id: 3, img:`./person3.jpg`, name:`Okafor Vivian`, job:`Cyber Security`, info:`Security isn’t something you buy, it’s something you do, and it takes talented people to do it right.The most secure computer is the computer that's off.`},
    {id: 4, name:`Okafor Ifechukwu`, img:`./person4.JPEG`, job:`Web Designer`, info:`Sometimes, when you innovate, you make mistakes. It is best to admit them quickly and get on with improving your other innovations.`}
 ]
 const img = document.querySelector(`img`);
 const myName = document.querySelector(`#name`);
 const job = document.querySelector(`#job`);
 const info = document.querySelector(`#info`);
 const next = document.querySelector(`.forwardBtn`);
 const back = document.querySelector(`.backwardBtn`);
 const shuffle = document.querySelector(`.randomBtn`);
 
 currentPerson = 0;

 window.addEventListener(`DOMContentLoaded`, function() {
   showPersonReview(currentPerson )
 });
 next.addEventListener(`click`, function(){
   currentPerson++
   if (currentPerson > review.length - 1) {
      currentPerson = 0;
   };
   showPersonReview(currentPerson )
 });
 back.addEventListener(`click`, function(){
   currentPerson--
   if (currentPerson < 0) {
      currentPerson = review.length - 1;
   };
   showPersonReview(currentPerson )
 });
 shuffle.addEventListener(`click`, function(){
   currentPerson =Math.floor(Math.random()*review.length)
   if (currentPerson < 0) {
      currentPerson = review.length - 1;
   };
   if (currentPerson > review.length - 1) {
      currentPerson = 0;
   };
   showPersonReview(currentPerson )
 });

let showPersonReview = person => {
   const item = review[person];
   img.src = item.img;
   myName.innerText = item.name;
   job.innerText = item.job;
   info.innerText = item.info;
}

 