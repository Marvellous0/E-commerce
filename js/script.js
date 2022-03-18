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

const homeBtn = document.querySelector('#home');
const productBtn = document.querySelector('#product');
const cartBtn = document.querySelector('#cartBtn');

homeBtn.addEventListener('click', () => {
    location.href = "/index.html";
})

productBtn.addEventListener('click', () => {
    location.href = "/product.html";
})

cartBtn.addEventListener('click', () => {
    location.href = "/cart.html";
})

let products = [{
        id: 1,
        name: "Cartoon Astronault T-Shirts",
        category: 'adidas',
        tag: '',
        price: 78,
        quantity: 0,
    },

    {
        id: 2,
        name: "Summer T-Shirts",
        category: 'Men Wear',
        tag: '',
        price: 98,
        quantity: 0,
    },
    {
        id: 3,
        name: "Suits",
        category: 'Casual',
        tag: '',
        price: 46,
        quantity: 0,
    },

    {
        id: 4,
        name: "Big Summer Unisex T-Shirts",
        category: 'Clothing',
        tag: '',
        price: 73,
        quantity: 0,
    },

    {
        id: 5,
        name: "Wwinter Astronault T-Shirts",
        category: 'Casual',
        tag: '',
        price: 334,
        quantity: 0,
    },

    {
        id: 6,
        name: "Men's stipped T-Shirt",
        category: 'Glasses',
        tag: '',
        price: 34,
        quantity: 0,
    },

    {
        id: 7,
        name: "Stipped blouse",
        category: 'Women Wear',
        tag: '',
        price: 22,
        quantity: 0,
    },

    {
        id: 8,
        name: "Agbada",
        category: 'Children Wear',
        tag: '',
        price: 78,
        quantity: 0,
    }
]

// const productDetails = document.querySelector('.pro');
// productDetails.addEventListener('click', () => {
//     location.href = 'productdetail.html';
// })

var carts = document.querySelectorAll(".cart");
const modal = document.querySelector('.modal-cotainer');
const productContainer = document.querySelector('.modal-body');
const closes = document.querySelector('.close');
for (let i = 0; i < carts.length; i++) {
    // if (modal) {
    carts[i].addEventListener('click', (e) => {
        e.preventDefault();

        modal.classList.add('active');
        const div = document.createElement('div');
        div.classList.add('single-pro-details');
        div.appendChild(productContainer.innerHTML += products[i].name,
            productContainer.textContent += products[i].price,
            productContainer.innerHTML += products[i].quantity)

        setItems(products[i]);
        // })


        // if (closes) {
        //     closes.addEventListener('click', () => {
        //         modal.classList.remove('active');
        //     })
    })
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

const setCardIconNumber = () => {
    let cartItems = JSON.parse(localStorage.getItem('productIncart'));
    let productNumbers = cartItems == null ? 0 : cartItems.length;

    document.querySelector('.icons span').textContent = productNumbers;
}


var table = document.querySelector('table');

const removeCart = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('remove')) {

        return;
    }

    const btn = e.target;
    // localStorage.setItem('productIncart', btn);
    btn.parentElement.parentElement.parentElement.remove();
    let items = JSON.parse(localStorage.getItem('productIncart'));
    console.log(items);

    // const newArray = items.filter((item) => item === items.id);
    // console.log(newArray);

    // updateCartTotal();
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
                        <div class="cart">
                            <a href="#"><i class="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                       `
            container.innerHTML += productContainer;
        }

    }
    // const updateCartTotal = () => {
    //     var cartItemContainer = document.querySelector('.product');
    //     console.log(cartItemContainer);
    //     var cartRows = cartItemContainer.getElementsByClassName('cart-rows')
    //     console.log(cartRows);
    //     var total = 0
    //     for (var i = 0; i < cartRows.length; i++) {
    //         var cartRow = cartRows[i]
    //         var priceElement = cartRow.getElementsById('cart-price')[0]
    //         var quantityElement = cartRow.getElementsById('cart-quantity')[0]
    //         var price = parseFloat(priceElement.innerText.replace('$', ''))
    //         var quantity = quantityElement.value
    //         total = total + (price * quantity)
    //     }
    //     total = Math.round(total * 100) / 100
    //     document.getElementById('total')[0].innerText = '$' + total
    // }


// table.addEventListener('click', removeCart)

// onLoadCartNumbers();
setCardIconNumber();
displayProduct();
displayInModal();