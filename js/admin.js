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
                            <span id=${cartItems[i].id} class="cart">
                                <a href="#"><i class="fas fa-shopping-cart"></i></a>
                            </span>
                        </div>
                       `

        container.innerHTML += productContainer;
    }
}

const popUpModal = () => {
    const cartBtn = document.querySelectorAll('.cart');
    const addBtn = document.querySelector('.addToCart');
    const minus = document.querySelector('#minus');
    const plus = document.querySelector('#plus');
    const totalPrice = document.querySelector('#total-price');
    let qty = document.querySelector('#qty');


    minus.addEventListener('click', () => {
        let productDetails1 = JSON.parse(localStorage.getItem('productList'));
        const productItem1 = productDetails1.find(c => c.id == addBtn.id);

        let uPrice = productItem1.productprice;

        if (qty.value > 1) {
            qty.value--;
            totalPrice.textContent = uPrice * qty.value
        }
    })

    plus.addEventListener('click', () => {
        let productDetails1 = JSON.parse(localStorage.getItem('productList'));
        const productItem1 = productDetails1.find(c => c.id == addBtn.id);

        let uPrice = productItem1.productprice;
        qty.value++;
        totalPrice.textContent = uPrice * qty.value
    })

    cartBtn.forEach(c => {
        c.addEventListener('click', () => {
            let items = JSON.parse(localStorage.getItem('productIncart'));
            const modalContainer = document.querySelector('.modal-cotainer');
            const modalBody = document.querySelector('.modal-body');
            const closes = document.querySelector('.close');

            const quantity = document.querySelector('#qty');

            addBtn.id = c.id;

            let productQty = 1;
            if (items !== null) {
                const addedItem = items.find(i => i.productId == addBtn.id);
                addedItem == undefined ? productQty = 1 : productQty = addedItem.quantity
            }

            let productDetails = JSON.parse(localStorage.getItem('productList'));
            const productItem = productDetails.find(c => c.id == addBtn.id);

            const modalItem = {
                productName: productItem.productname,
                categoryName: productItem.productCategory,
                productDescription: productItem.productdescription,
                quantity: productQty,
                unitPrice: productItem.productprice
            }

            modalContainer.classList.add('active');
            console.log("feff");
            populateModal(modalItem);
            updateQuantity(productItem.productprice);

            closes.addEventListener("click", () => {
                quantity.value = 1;
                modalContainer.classList.remove('active');
            })

        })
    })
}

const populateModal = (modalItem) => {
    const productName = document.querySelector('#product-name');
    const categoryName = document.querySelector('#category-name');
    const productDescription = document.querySelector('.desc');
    const unitPrice = document.querySelector('#unit-price');
    const qty = document.querySelector('#qty');
    const totalPrice = document.querySelector('#total-price');
    productName.textContent = modalItem.productName;
    qty.value = modalItem.quantity,
        categoryName.textContent = modalItem.categoryName;
    productDescription.textContent = modalItem.productDescription;
    unitPrice.textContent = modalItem.unitPrice;
    totalPrice.textContent = modalItem.unitPrice * modalItem.quantity;
}

const addToCart = () => {
    const addToCartBtn = document.querySelector('.addToCart');
    addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const quantity = document.querySelector('#qty');
        const modalContainer = document.querySelector('.modal-cotainer');
        let items = JSON.parse(localStorage.getItem('productIncart'));

        const productItem = JSON.parse(localStorage.getItem('productList')).filter(i => i.id == addToCartBtn.id);

        const newProduct = {
            productId: addToCartBtn.id,
            quantity: quantity.value,
        }


        let newProductItem = [newProduct];
        if (items !== null) {
            newProductItem = [...items, newProduct]
            const addedItem = items.find(i => i.productId == addToCartBtn.id);
            if (addedItem !== undefined) {
                items = items.filter(i => i.productId !== addToCartBtn.id);
                const newCartItem = {
                    productId: addToCartBtn.id,
                    quantity: quantity.value,
                }
                items.push(newCartItem);
                localStorage.setItem('productIncart', JSON.stringify(items));
            } else {
                localStorage.setItem('productIncart', JSON.stringify(newProductItem));
            }

        } else {
            localStorage.setItem('productIncart', JSON.stringify(newProductItem));
        }

        quantity.value = 1;
        modalContainer.classList.remove('active');

    })

}

const updateQuantity = (uPrice) => {}

const availableCartNumber = () => {
    let items = JSON.parse(localStorage.getItem('productIncart'));
    let numberCount = document.querySelector('#count');
    let productNumbers = items == null ? 0 : items.length;
    numberCount.textContent = productNumbers;
}

displayCart();
popUpModal();
availableCartNumber();