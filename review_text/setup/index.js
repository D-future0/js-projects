 const languages = document.querySelectorAll(`.languages`);

 languages.forEach(language => {
    const btn = language.querySelector(`.detail-btn`);
        btn.addEventListener(`click`, function () {
            languages.forEach(item=> {
                if (item !== language) {
                    item.classList.remove(`show-details`);
                }
            });
            language.classList.toggle(`show-details`);
    })
 });

// alternate setup

// const languages = document.querySelectorAll(`.languages`);
// const btns = document.querySelectorAll(`.detail-btn`);

// btns.forEach(btn => {
//     btn.addEventListener(`click`, function(btn) {
//         const language = btn.currentTarget.parentElement.parentElement;
//                     languages.forEach(item=> {
//                 if (item !== language) {
//                     item.classList.remove(`show-details`);
//                 }
//                     })
//         language.classList.toggle(`show-details`);

//     })
// })
