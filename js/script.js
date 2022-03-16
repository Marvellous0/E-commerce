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

const productDetails = document.querySelector('.pro');
productDetails.addEventListener('click', () => {
    location.href = 'productdetail.html';
})

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

SignUp();