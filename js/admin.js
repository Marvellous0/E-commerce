const productBtn = document.querySelector('#createProductBtn');
const categoryBtn = document.querySelector('#createCategoryBtn');
const homeBtn = document.querySelector('#home');

homeBtn.addEventListener('click', () => {
    location.href = '/AdminDashboard.html';
})

productBtn.addEventListener('click', () => {
    location.href = '/createProduct.html';
})

categoryBtn.addEventListener('click', () => {
    location.href = '/createCategory.html';
})

let cartItems = JSON.parse(localStorage.getItem('productList'));
let products = [];
for (let i = 0; i < cartItems.length; i++) {
    let product = {
        id: cartItems.length + 1,
        name: cartItems[i].name,
        category: cartItems[i].category,
        price: cartItems[i].price,
        quantity: 0
    }
    products.push(product);
}

const setItems = (product) => {

    let cartItems = JSON.parse(localStorage.getItem('productList'));
    let cartBtn = document.querySelectorAll('.cart');

    for (let i = 0; i < cartBtn.length; i++) {
        cartBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            if (cartItems != null) {
                const addedItem = cartItems.find(i => i.id === product.id);
                if (addedItem == undefined) {
                    product.quantity = 1;
                    cartItems = [...cartItems, product];
                } else {
                    addedItem.quantity++;
                    cartItems = cartItems.filter(i => i.id != addedItem.id);
                    cartItems = [...cartItems, addedItem];

                }
            } else {
                product.quantity = 1;
                cartItems = [product];

            }

            localStorage.setItem('productList', JSON.stringify(cartItems));
            console.log('added');
        })
    }
}


const displayCart = () => {
    const container = document.querySelector('.pro-container');
    for (let i = 0; i < cartItems.length; i++) {
        var productContainer =
            `<div class="pro">
         <img src="Images/cloth1.webp" alt="No Img found"> 
         <div class="description">
                            <span>${cartItems[i].productCategory}</span>
                            <h5>${cartItems[i]. productname}</h5>
                            <div class="star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <h4>$${cartItems[i]. productprice}</h4>
                        </div>
                        <a href=""><i class="fas fa-shopping-cart cart"></i></a>
                        </div>
                       `

        container.innerHTML += productContainer;
    }
}

setItems();
displayCart();