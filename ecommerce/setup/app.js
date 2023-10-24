
const cartBtn = document.querySelector(`.cart-btn`);
const closeCart = document.querySelector(`.close-cart`);
const cartOverlay = document.querySelector(`.cart-overlay`);
const cartDom = document.querySelector(`.cart`);
const cartContent = document.querySelector(`.cart-content`);
const cartItems = document.querySelector(`.cart-items`);
const cartTotal = document.querySelector(`.cart-total`);
const productCenter = document.querySelector(`.products-center`);
// const cartBtn = document.querySelector(`.cart-btn`);

// cart
let cart = [];
let buttonDom = [];

// products
class Products{
    async getProducts(){
        try {
            let result = await fetch(`products.json`);
            let data = await result.json();
            let products = data.items;
            products = products.map((item)=>{
                const {id} = item.sys;
                const {title, price} = item.fields;
                const image = item.fields.image.fields.files.url;
                return {id, title, price, image};
            })
            return products
        } catch (error) {
            return error
        }
    }
}

// display product
class UI{
    displayProducts(products){
        let results = ``;
        products.forEach(product => {
            results += `
            <!-- single product -->
            <article class="product">
                <div class="image-container">
                    <img src=${product.image} alt="item" class="item-image">
                </div>
                <button type="submit" class="bag-btn" data-id=${product.id}>
                    add to cart
                </button>
                <h3 class="product-name"> ${product.title}</h3>
                <h4 class="product-price">N${product.price}</h4>
            </article>
            <!-- end of single product -->
            `;
        }); 
        productCenter.innerHTML = results;
    };
    getBagBtn(){
        const allBagBtn = [...document.querySelectorAll(`.bag-btn`)];
        buttonDom = allBagBtn;
        allBagBtn.forEach(bagButton => {
            let id = bagButton.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                bagButton.innerText = `in cart`;
                bagButton.disabled = true;
            }
            
                bagButton.addEventListener(`click`, event =>{
                    event.target.innerHTML = `in cart`;
                    event.target.disabled = true;

                    // get product from products
                    let cartItem = {...storage.getProduct(id), amount:1};
                    // add items to cart
                    cart = [...cart, cartItem];
                    // save cart in localStorage 
                    storage.saveCart(cart);
                    // set cart value
                    this.setCartValue(cart)
                })
                
        });
    }
    setCartValue(cart){
        let tempTotal = 0
        let itemsTotal = 0
        cart.map((item)=>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerHTML = parseFloat(tempTotal.toFixed(2));
        cartItems.innerHTML = itemsTotal
        console.log(cartTotal, cartItems)
    }
}
// local storage   
class storage{
    static saveProduct(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// add eventlistener
document.addEventListener(`DOMContentLoaded`, ()=>{
    const ui = new UI();
    const products = new Products();
    // get all product
    products.getProducts().then(products => {
        ui.displayProducts(products);
        storage.saveProduct(products);  
    }).then(()=>{
        ui.getBagBtn()
    });
});