const bar1 = document.querySelector('#bar');
const nav1 = document.querySelector('.top-list');
const closebar1 = document.querySelector('#close');

if (bar1) {
    bar1.addEventListener('click', () => {
        nav1.classList.add('activey');
    })
}

if (closebar1) {
    closebar1.addEventListener('click', () => {
        nav1.classList.remove('activey');
    })
}

const homeButn = document.querySelector('#home');
const productBtn = document.querySelector('#product');
const cartBtn = document.querySelector('#cartBtn');

homeButn.addEventListener('click', () => {
    location.href = "/index.html";
})

productBtn.addEventListener('click', () => {
    location.href = "/product.html";
})

cartBtn.addEventListener('click', () => {
    location.href = "/cart.html";
})


let cartItems1 = JSON.parse(localStorage.getItem('productList'));
const displayAvailableProduct = () => {
    const container = document.querySelector('.pro-container');
    for (let i = 0; i < cartItems1.length; i++) {
        var productContainer =
            `       <div class="pro">
                        <img src="Images/cloth1.webp" alt="No Img found"> 
                        <div class="description">
                            <span>${cartItems1[i].productCategory}</span>
                            <h5>${cartItems1[i].productname}</h5>
                            <div class="star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div> 
                            <h4>$${cartItems1[i].productprice}</h4>
                        </div>
                        <div id="${cartItems1[i].id}" class="cart">
                            <a href="#"><i class="fas fa-shopping-cart"></i></a>
                        </div>
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

    qty.addEventListener('change', () => {
        let productDetails1 = JSON.parse(localStorage.getItem('productList'));
        const productItem1 = productDetails1.find(c => c.id == addBtn.id);
        let uPrice = productItem1.productprice;

        totalPrice.textContent = uPrice * qty.value
    })

    cartBtn.forEach(c => {
        c.addEventListener('click', () => {
            let items = JSON.parse(localStorage.getItem('productIncart'));
            const modalContainer = document.querySelector('.modal-cotainer');
            const closes = document.querySelector('.close');
            const stars = document.querySelectorAll('.rating i');
            const rate = document.querySelector('.rate');

            for (let i = 0; i < stars.length; i++) {
                stars[i].addEventListener('click', () =>{
                    rate.textContent = i + 1;
                    rate.value = i + 1;
                    if(stars[i].classList != 'active-star'){
                        stars[i].classList.add('active-star');
                    }
                   else{
                    stars[i].classList.remove('active-star');
                   }
                })
            }

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

displayAvailableProduct();
popUpModal();
addToCart();
availableCartNumber();