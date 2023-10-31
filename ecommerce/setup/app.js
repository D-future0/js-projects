
const cartBtn = document.querySelector(`.cart-btn`);
const closeCart = document.querySelector(`.close-cart`);
const cartOverlay = document.querySelector(`.cart-overlay`);
const cartDom = document.querySelector(`.cart`);
const cartCount = document.querySelector(`.cart-item-count`);
const cartContent = document.querySelector(`.cart-content`);
const cartItems = document.querySelector(`.cart-items`);
const cartTotal = document.querySelector(`.cart-total`);
const clearCartBtn = document.querySelector(`.clear-btn`);
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
                    // save items to cart
                    cart = [...cart, cartItem];
                    // save cart in localStorage 
                    storage.saveCart(cart);
                    // set cart value
                    this.setCartValue(cart)
                    // display items in cart
                    this.diplayCartItems(cartItem)
                    // show cart
                    this.showCart()
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
        cartCount.innerHTML = itemsTotal;
    };
    diplayCartItems(item){
        const div = document.createElement(`div`);
        div.classList.add(`cart-items`);
        div.innerHTML = `<img src=${item.image}>
        <div>
            <h4>${item.title}</h4>
            <h5>${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>`;
        cartContent.appendChild(div);
    };
    showCart(){
        cartOverlay.classList.add(`transparentBckg`);
        cartDom.classList.add(`show-cart`);
    }
    setupAPP(){
        cart = storage.getCart();
        this.setCartValue(cart);
        this.populateCart(cart);
        cartBtn.addEventListener(`click`, this.showCart);
        closeCart.addEventListener(`click`, this.hideCart);
    }
    populateCart(cart){
        cart = cart.forEach(item =>this.diplayCartItems(item))
    }
    hideCart(){
        cartOverlay.classList.remove(`transparentBckg`);
        cartDom.classList.remove(`show-cart`);
    }
    cartLogic(){
        // clear cart button 
        clearCartBtn.addEventListener(`click`, ()=>{
            this.clearCart();
            while(cartContent.children.length>0){
                cartContent.removeChild(cartContent.children[0]);
            }
            this.hideCart();
        })
        // cart functionalities (remove item/increase and decrease item)
        cartContent.addEventListener(`click`, event => {
            // let removeItem = event.target;
            if(event.target.classList.contains("remove-item")){
                let removeItem = event.target;
                let id = removeItem.dataset.id;
            cartContent.removeChild(removeItem.parentElement.parentElement);
            this.removeItem(id)
            } else if(event.target.classList.contains("fa-chevron-up")){
                let IncreaseAmount = event.target;
                let id = IncreaseAmount.dataset.id;
                let tempItemAmount = cart.find(item => item.id===id);
                tempItemAmount.amount = tempItemAmount.amount + 1;
                storage.saveCart(cart);
                this.setCartValue(cart);
                IncreaseAmount.nextElementSibling.innerHTML = tempItemAmount.amount;
                console.log(tempItemAmount.amount)
            } else if(event.target.classList.contains("fa-chevron-down")){
                let decreaseAmount = event.target;
                let id = decreaseAmount.dataset.id;
                let tempItemAmount = cart.find(item => item.id===id);
                tempItemAmount.amount = tempItemAmount.amount - 1;
                if(tempItemAmount.amount < 1){
                    tempItemAmount.amount = 1;
                }
                storage.saveCart(cart);
                this.setCartValue(cart);
                decreaseAmount.previousElementSibling.innerHTML = tempItemAmount.amount;
                console.log(tempItemAmount.amount)
            }
            
            
        })
    }
    clearCart(){
        let cartItems = cart.map(items => items.id);
        cartItems = cartItems.forEach(id => this.removeItem(id));
        console.log(cartItems)
    }
    removeItem(id){
        cart = cart.filter(item => item.id !== id);
        this.setCartValue(cart);
        storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `add to cart`;
    }
    getSingleButton(id){
        return buttonDom.find(button => button.dataset.id === id)
    }
};
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
    static getCart(){
        return localStorage.getItem(`cart`)?JSON.parse(localStorage.getItem(`cart`)):[];
    }
}

// add eventlistener
document.addEventListener(`DOMContentLoaded`, ()=>{
    const ui = new UI();
    const products = new Products();
    // setup App
    ui.setupAPP()
    // get all product
    products.getProducts().then(products => {
        ui.displayProducts(products);
        storage.saveProduct(products);  
    }).then(()=>{
        ui.getBagBtn()
        ui.cartLogic()
    });
});