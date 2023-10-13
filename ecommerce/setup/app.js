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
const cart = [];

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
        console.log(productCenter)
    };
}
// local storage  
class storage{
    
}

// add eventlistener
document.addEventListener(`DOMContentLoaded`, ()=>{
    const ui = new UI();
    const products = new Products();
    // get all product
    products.getProducts().then(products => ui.displayProducts(products))
});