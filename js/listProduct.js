// var productArray = JSON.parse(localStorage.getItem('productsList'));
// var productItem = document.querySelector('#products');
// var img = document.querySelector('#img');

// for (let i = 0; i < productArray.length; i++) {

//     var products = ` 
//            <div class="pro">
//                <img src="${img.innerHTML += productArray[i].productPics}" alt="No Img found">
//                <div class="description">
//                    <span>${productArray[i].productCategory}</span>
//                    <h5>${productArray[i].productname}</h5>
//                    <div class="star">
//                        <i class="fas fa-star"></i>
//                        <i class="fas fa-star"></i>
//                        <i class="fas fa-star"></i>
//                        <i class="fas fa-star"></i>
//                        <i class="fas fa-star"></i>
//                    </div>
//                    <h4>${productArray[i].productprice}</h4>
//                </div>
//                <a href="#"><i class="fas fa-shopping-cart cart"></i></a>
//            </div>`

//     productItem.innerHTML += products;
// }

// var carts = document.querySelectorAll(".cart");
// // const getProd = JSON.parse(localStorage.getItem('productsList'));
// // for (let j = 0; j < productArray.length; j++) {
// let products1 = [{
//     name: productArray.productname,
//     price: productArray.productprice,
//     category: productArray.productCategory,
// }]

// // }

// for (let i = 0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//         cartNumbers(products1[i]);
//     })
// }

// const onLoadCartNumbers = () => {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     if (productNumbers) {
//         document.querySelector('.icons span').textContent = productNumbers;
//     }
// }

// const cartNumbers = (product) => {
//     console.log('The product clicked is', product);
//     let productNumbers = localStorage.getItem('cartNumbers');
//     productNumbers = parseInt(productNumbers);

//     if (productNumbers) {
//         localStorage.setItem('cartNumbers', productNumbers + 1);
//         document.querySelector('.icons span').textContent = productNumbers + 1;
//     } else {
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.icons span').textContent = 1;
//     }

// }

// onLoadCartNumbers();