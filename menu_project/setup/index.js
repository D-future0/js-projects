const menu = [
    {id:1,
    itemName:`jellof rice`,
    category:`breakfast`,
    price:`N1199.99`,
    img:"./food/item-1.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:2,
    itemName:`beans and braed`,
    category:`lunch`,
    price:`N369.99`,
    img:"./food/item-2.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:3,
    itemName:`pap`,
    category:`breakfast`,
    price:`N399.99`,
    img:"./food/item-3.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:4,
    itemName:`meat pie`,
    category:`lunch`,
    price:`N300.00`,
    img:"./food/item-4.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:5,
    itemName:`gari and groundnut`,
    category:`lunch`,
    price:`N199.99`,
    img:"./food/item-5.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:6,
    itemName:`egusi and fufu`,
    category:`dinner`,
    price:`N2199.99`,
    img:"./food/item-6.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:7,
    itemName:`corn flakes`,
    category:`breakfast`,
    price:`N449.99`,
    img:"./food/item-7.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:8,
    itemName:`hamburger`,
    category:`lunch`,
    price:`N699.99`,
    img:"./food/item-8.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:9,
    itemName:`moi moi`,
    category:`lunch`,
    price:`N500.95`,
    img:"./food/item-9.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:10,
    itemName:`amala and mixed ewedu and stew`,
    category:`dinner`,
    price:`N200.99`,
    img:"./food/item-10.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:11,
    itemName:`Napolitan`,
    category:`ice-cream`,
    price:`N1549.99`,
    img:"./food/item-11.jpeg",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:12,
    itemName:`pistachio`,
    category:`ice-cream`,
    price:`N1399.99`,
    img:"./food/item-12.jpeg",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:13,
    itemName:`vanilla ice cream`,
    category:`ice-cream`,
    price:`N1799.99`,
    img:"./food/item-13.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:14,
    itemName:`strawberry ice cream`,
    category:`ice-cream`,
    price:`N1649.99`,
    img:"./food/item-14.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },
    {id:15,
    itemName:`chocolate chip`,
    category:`ice-cream`,
    price:`N1499.99`,
    img:"./food/item-15.JPG",
    info:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste quis magnam suscipit impedit neque? Molestiae`
    },    
    
]

const sectionCenter = document.querySelector(`.section-center`);
const btnContainer = document.querySelector(`.btn-container`)

window.addEventListener(`DOMContentLoaded`, function () {
    displayMenuItems(menu);
    displayMenuBtns()
});

let displayMenuItems = (menuItem) => {
    
    let displayMenu = menuItem.map((item)=>{
    
    return `<article class="menu-item">
    <img src=${item.img} alt="${item.img}">
<div class="item-details">
    <header>
        <h3 class="name">${item.itemName}</h3>
        <h3 class="price">${item.price}</h3>
    </header>
    <p class="info">${item.info}</p>
</div>
</article>`
})
displayMenu = displayMenu.join(``)
sectionCenter.innerHTML = displayMenu
}

let displayMenuBtns = ()=>{
    const categories = menu.reduce((values, item)=>{
        if(!values.includes(item.category)){
         values.push(item.category);
        }
         return values
     }, [`all`]);
 
     const categoriesBtn = categories.map((category) => {
         return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`
     }).join(``);
     btnContainer.innerHTML = categoriesBtn;
 
     const filerBtn = document.querySelectorAll(`.filter-btn`);
 
     filerBtn.forEach((btn) => {
         btn.addEventListener(`click`, (event) => {
             const category = event.currentTarget.dataset.id;
             let categoryMenu = menu.filter((item) => {
                 if (item.category === category){
                     return item
                 }
             });
             
             if(category === "all") {
                 displayMenuItems(menu)
             }
             else{
                 displayMenuItems(categoryMenu)
             }
         })
     })
}