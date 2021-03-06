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
    const role = document.querySelector("#role");

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
            role: role.value,
        }

        signUpInfoArray.push(info);
        localStorage.setItem("signUpInfo", JSON.stringify(signUpInfoArray));

        alert('Registration completed, kindly log in');
        location.href = "/login.html";

    })
}

SignUp();