const finalUser = JSON.parse(localStorage.getItem('signUpInfo'));

var loginObject = {}
if (JSON.parse(localStorage.getItem('loginInfo'))) {
    loginObject = JSON.parse(localStorage.getItem('loginInfo'));
} else {
    loginObject = {}
}

const Login = () => {
    const loginBtn = document.querySelector(".loginBtn");

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()

        const uName = document.querySelector("#uname");
        const psw = document.querySelector("#psw");

        if (uName.value === "" || psw.value === "") {
            alert("Kindly complete all fields");
            return false;
        }

        loginObject = {
            nameVal: uName.value,
            passwordVal: psw.value,
        }

        localStorage.setItem("loginInfo", JSON.stringify(loginObject));


        for (let i = 0; i < finalUser.length; i++) {
            if (loginObject.nameVal === finalUser[i].username && loginObject.passwordVal === finalUser[i].password && finalUser[i].role === "admin" && finalUser[i].id === 1) {
                location.href = "/AdminDashboard.html";
                break;
            } else {
                alert("Failed");
                break;
            }
        }

    });
}

Login();