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


const displayCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('productIncart'));
    let pName = document.querySelector('#product-name');
    let pPrice = document.querySelector('#cart-price');
    let pQuantity = document.querySelector('cart-quantity');
    let uPrice = document.querySelector('#unitPrice');
    let total = document.querySelector('#total');
    let totalCost = 0;

    // cartItems.forEach((element) => {
    //     const productId = element.productId;
    //     console.log(productId)

    //     let productDetails = JSON.parse(localStorage.getItem('productList'));
    //     const productItem = productDetails.find(c => c.id == productId);

    //     const modalItem = {
    //         productName: productItem.productname,
    //         categoryName: productItem.productCategory,
    //         productDescription: productItem.productdescription,
    //         unitPrice: productItem.productprice
    //     }

    //     pName.textContent = modalItem.productName;
    //     pPrice.textContent = modalItem.unitPrice;
    // });

    for (let i = 0; i < cartItems.length; i++) {
        const productId = cartItems[i].productId;
        let productDetails = JSON.parse(localStorage.getItem('productList'));
        const productItem = productDetails.find(c => c.id == productId);

        const modalItem = {
            productName: productItem.productname,
            categoryName: productItem.productCategory,
            productDescription: productItem.productdescription,
            unitPrice: productItem.productprice
        }

        pName.textContent = modalItem.productName;
        pPrice.textContent = modalItem.unitPrice;


    }

}


const removeCart = () => {
    let items = JSON.parse(localStorage.getItem('productIncart'));
    let btn = document.querySelector('.remove');

    btn.addEventListener('click', () => {
        var newArray = items.filter((i => i.id != products.id))
        console.log(newArray);
    })

}


const checkOutBtn = document.querySelector('#checkout');
checkOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('signUpInfo'));
    users.forEach((i) => {
        if (i.name > -1) {
            location.href = '/checkout.html';
        } else {
            location.href = '/login.html';
        }
    })
});



displayCart();
removeCart();