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

// const productDetails = document.querySelector('.pro');
// productDetails.addEventListener('click', () => {
//     location.href = 'productdetail.html';
// })

var signUpInfoArray = []
if (JSON.parse(localStorage.getItem('signUpInfo'))) {
    signUpInfoArray = JSON.parse(localStorage.getItem('signUpInfo'));
} else {
    signUpInfoArray = []
}

const SignUp = () => {
    const continueBtn = document.querySelector("#continueBtn");
    const userName = document.querySelector("#signupUsername");
    const emailAddress = document.querySelector("#emailAddress");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");

    continueBtn.addEventListener("click", (e) => {
        e.preventDefault()
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var message = document.querySelector(".message");

        if (emailAddress.value.match(!validRegex)) {
            message.innerHTML += "Invalid Email address"
            return false;
        }

        if (userName.value === "" || emailAddress.value === "" || password.value === "" || confirmPassword.value === "") {
            alert("Kindly complete all fields");
            return false;

        }

        if (password.value == "") {
            message.innerHTML += "**Fill the password please!";
            return false;
        }

        if (password.value !== confirmPassword.value) {
            message.innerHTML += "Password does not match"
        }


        if (password.value.length < 8) {
            message.innerHTML += "**Password length must be atleast 8 characters";
            return false;
        }

        if (password.value.length > 15) {
            message.innerHTML += "**Password length must not exceed 15 characters";
            return false;
        }

        var info = {
            id: signUpInfoArray.length + 1,
            username: userName.value,
            emailaddress: emailAddress.value,
            password: password.value,
            confirmpassword: confirmPassword.value,
            role: "admin"
        }

        signUpInfoArray.push(info);
        localStorage.setItem("signUpInfo", JSON.stringify(signUpInfoArray));

        alert('Registration completed, kindly log in');
        location.href = "/login.html";

    })
}

var carts = document.querySelectorAll(".cart");

let products = [{
        name: "Cartoon Astronault T-Shirts",
        category: 'adidas',
        tag: '',
        price: 78,
        incart: 0,
    },

    {
        name: "Summer T-Shirts",
        category: 'Men Wear',
        tag: '',
        price: 98,
        incart: 0,
    },
    {
        name: "Suits",
        category: 'Casual',
        tag: '',
        price: 46,
        incart: 0,
    },

    {
        name: "Big Summer Unisex T-Shirts",
        category: 'Clothing',
        tag: '',
        price: 73,
        incart: 0,
    },

    {
        name: "Wwinter Astronault T-Shirts",
        category: 'Casual',
        tag: '',
        price: 334,
        incart: 0,
    },

    {
        name: "Men's stipped T-Shirt",
        category: 'Glasses',
        tag: '',
        price: 34,
        incart: 0,
    },

    {
        name: "Stipped blouse",
        category: 'Women Wear',
        tag: '',
        price: 22,
        incart: 0,
    },

    {
        name: "Agbada",
        category: 'Children Wear',
        tag: '',
        price: 78,
        incart: 0,
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

const onLoadCartNumbers = () => {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.icons span').textContent = productNumbers;
    }
}

const cartNumbers = (product) => {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.icons span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.icons span').textContent = 1;
    }

    setItems(product);
}

const setItems = (product) => {
    let cartItems = JSON.parse(localStorage.getItem('productIncart'));

    if (cartItems != null) {
        if (cartItems[product.category] == undefined) {
            cartItems = {
                ...cartItems,
                [product.category]: product
            }
        }
        cartItems[product.category].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.category]: product
        }
    }

    localStorage.setItem('productIncart', JSON.stringify(cartItems));
}

const totalCost = (product) => {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }

}

const displayCart = (e) => {
    let cartItems = localStorage.getItem('productIncart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.product');
    let cartCost = localStorage.getItem('totalCost');
    let total = document.querySelector('#cont');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {

            productContainer.innerHTML += `
            <div class="product">
                <tbody>
                        <tr>
                            <td class=""><button><i class="fas fa-times circle remove"></i></button></td>
                            <td><img src="Images/cloth1.webp" alt=""></td>
                            <td>${item.name}</td>
                            <td id="cart-price">$${item.price}.00</td>
                            <td id="cart-quantity"><input type="number" value="${item.incart}"></td>
                            <td id="total">$${item.incart * item.price}.00</td>
                        </tr>
                </tbody>
            </div>
        `
        });

        total.innerHTML += `
        <table>
                <tr >
                        <td><strong>Total</strong></td>
                        <td><strong>$${cartCost}.00</strong></td>
                    </tr>
                    </table>
        `
    }
}


var table = document.querySelector('table');

const removeCart = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('remove')) {
        return;
    }

    const btn = e.target;
    btn.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}

const updateCartTotal = () => {
    var cartItemContainer = document.querySelector('.product');
    console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByClassName('cart-rows')
    console.log(cartRows);
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsById('cart-price')[0]
        var quantityElement = cartRow.getElementsById('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementById('total')[0].innerText = '$' + total
}

var stripe = Stripe(
    "pk_test_51Ke3zAAO9d6NPgXPt68XD9U3u3DXgt1JNitWw2BeFbRJa7cK6ESD3N0tlNj13MVslc56rtgki8rEET9IOToTMl7C00lmLvokgM"
);

document.querySelector('#checkout').addEventListener('click', () => {
    stripe.redirectToCheckout({
        lineItems: [{
            price: "price_1Ke4ODAO9d6NPgXPWcje8p9I",
            quantity: 1,
        }],

        mode: "subscription",
        successUrl: "https://www.google.com/",
        cancelUrl: "https://www.twitter.com/",
    }).then(function(result) {

    })
})

table.addEventListener('click', removeCart)

onLoadCartNumbers();
displayCart();
SignUp();