const homeBtn = document.querySelector('#home');

homeBtn.addEventListener('click', () => {
    location.href = "/customerDashboard.html";
})

const bar = document.querySelector('#bar');
const nav = document.querySelector('.top-list');
const closebar = document.querySelector('#close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('activey');
    })
}

if (closebar) {
    closebar.addEventListener('click', () => {
        nav.classList.remove('activey');
    })
}

let cartItems = JSON.parse(localStorage.getItem('productList'));
const displayProduct = () => {
    const container = document.querySelector('.pro-container');
    for (let i = 0; i < cartItems.length; i++) {
        var productContainer =
            `       <div class="pro">
                        <img src="Images/cloth1.webp" alt="No Img found"> 
                        <div class="description">
                            <span>${cartItems[i].productCategory}</span>
                            <h5>${cartItems[i].productname}</h5>
                            <div class="star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div> 
                            <h4>$${cartItems[i].productprice}</h4>
                        </div>
                        <span class="cart">
                            <a href="#"><i class="fas fa-shopping-cart"></i></a>
                        </span>
                    </div>
                       `
        container.innerHTML += productContainer;
    }
}

const setItems = (product) => {
    let cartItems = JSON.parse(localStorage.getItem('productIncart'));

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

    localStorage.setItem('productIncart', JSON.stringify(cartItems));
}

displayProduct();