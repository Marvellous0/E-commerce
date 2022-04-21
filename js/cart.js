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

const availableCartNumber = () => {
    let items = JSON.parse(localStorage.getItem('productIncart'));
    let numberCount = document.querySelector('#count');
    let productNumbers = items == null ? 0 : items.length;
    numberCount.textContent = productNumbers;
}

const displayCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('productIncart'));
    let pName = document.querySelector('#product-name');
    let pPrice = document.querySelector('#cart-price');
    let pQuantity = document.querySelector('#cart-quantity');
    let uPrice = document.querySelector('#unitPrice');
    let total = document.querySelector('#total');

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
        pQuantity.value = cartItems[i].quantity;
        uPrice.textContent = cartItems[i].quantity * modalItem.unitPrice;
        total.textContent = uPrice.textContent

        pQuantity.addEventListener('change', () => {
            uPrice.textContent = modalItem.unitPrice * pQuantity.value
            total.textContent = modalItem.unitPrice * pQuantity.value
        })
    }

}

const removeCart = () => {
    let items = JSON.parse(localStorage.getItem('productIncart'));
    let btn = document.querySelector('.remove');

    items.forEach((element) => {
        const productId = element.productId;
        let productDetails = JSON.parse(localStorage.getItem('productList'));
        btn.addEventListener('click', () => {
            if(items.length == 1)
            {
                localStorage.removeItem('productIncart');
            }

            else{
                var newArray = productDetails.filter(i => i.id == productId);
                localStorage.setItem('productIncart', JSON.stringify(newArray))
            }
            
        }) 
    })
}

const checkOutBtn = document.querySelector('#checkout');
checkOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('loginInfo'));
    let objectLenght = Object.keys(user).length;
   
    if(objectLenght == 2){
        location.href = '/checkout.html';
    }

    else{
        location.href = '/login.html';
    }
});

// const logOutBtn = document.querySelector('#log-out');
// logOutBtn.addEventListener('click', () =>{
//     localStorage.removeItem('loginInfo');
//     localStorage.removeItem('productIncart');
//     location.href = '/index.html';
// })

availableCartNumber();
displayCart();
removeCart();