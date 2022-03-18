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


// let products = [{
//         id: 1,
//         name: "Cartoon Astronault T-Shirts",
//         category: 'adidas',
//         tag: '',
//         price: 78,
//         quantity: 0,
//     },

//     {
//         id: 2,
//         name: "Summer T-Shirts",
//         category: 'Men Wear',
//         tag: '',
//         price: 98,
//         quantity: 0,
//     },
//     {
//         id: 3,
//         name: "Suits",
//         category: 'Casual',
//         tag: '',
//         price: 46,
//         quantity: 0,
//     },

//     {
//         id: 4,
//         name: "Big Summer Unisex T-Shirts",
//         category: 'Clothing',
//         tag: '',
//         price: 73,
//         quantity: 0,
//     },

//     {
//         id: 5,
//         name: "Wwinter Astronault T-Shirts",
//         category: 'Casual',
//         tag: '',
//         price: 334,
//         quantity: 0,
//     },

//     {
//         id: 6,
//         name: "Men's stipped T-Shirt",
//         category: 'Glasses',
//         tag: '',
//         price: 34,
//         quantity: 0,
//     },

//     {
//         id: 7,
//         name: "Stipped blouse",
//         category: 'Women Wear',
//         tag: '',
//         price: 22,
//         quantity: 0,
//     },

//     {
//         id: 8,
//         name: "Agbada",
//         category: 'Children Wear',
//         tag: '',
//         price: 78,
//         quantity: 0,
//     }
// ]
let cartItems = JSON.parse(localStorage.getItem('productIncart'));
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

const displayCart = () => {
    let cartItems = localStorage.getItem('productIncart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.product');
    let total = document.querySelector('#cont');
    let totalCost = 0;

    cartItems.forEach((element) => {
        totalCost += element.price * element.quantity;
    });

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        cartItems.map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <tbody>
                        <tr>
                            <td class=""><button><i class="fas fa-times circle remove"></i></button></td>
                            <td><img src="Images/cloth1.webp" alt=""></td>
                            <td>${item.name}</td>
                            <td id="cart-price">$${item.price}.00</td>
                            <td id="cart-quantity"><input type="number" value="${item.quantity}"></td>
                            <td id="total">$${item.price * item.quantity}.00</td>
                        </tr>
                </tbody>
            </div>
        `
        });

        total.innerHTML += `
        <table>
                <tr >
                        <td><strong>Total</strong></td>
                        <td><strong>$${totalCost}.00</strong></td>
                    </tr>
                    </table>
        `

    }
}

const setCardIconNumber = () => {
    let cartItems = JSON.parse(localStorage.getItem('productIncart'));
    let productNumbers = cartItems == null ? 0 : cartItems.length;

    document.querySelector('.icons span').textContent = productNumbers;
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

// var table = document.querySelector('table');
// const removeCart = (e) => {
//     e.preventDefault();
//     if (!e.target.classList.contains('remove')) {

//         return;
//     }

//     const btn = e.target;
//     btn.parentElement.parentElement.parentElement.remove();
//     let items = JSON.parse(localStorage.getItem('productIncart'));


//     var filteredArray = items.filter(i => i.id == products.id);
//     console.log(filteredArray);
//     // localStorage.setItem('productIncart', JSON.stringify(filteredArray));

//     // updateCartTotal();
// }

// table.addEventListener('click', removeCart);
const removeCart = () => {
    let items = JSON.parse(localStorage.getItem('productIncart'));
    let btn = document.querySelector('.remove');

    // for (let i = 0; i < items.length; i++) {
    btn.addEventListener('click', () => {
            var newArray = items.filter((i => i.id != products.id))
            console.log(newArray);
        })
        // }
        // items.forEach((element) => {
        //     btn.addEventListener('click', () => {
        //         console.log('ygjkml', element.id);
        //     })
        // });
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


setCardIconNumber();
displayCart();
removeCart();