function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("https://ecompulse-backend.onrender.com/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })

    .then(res => {

        if (!res.ok) {
            throw new Error("Login request failed");
        }

        return res.json();

    })

    .then(data => {

        document.getElementById("message").innerHTML = data.message;

        if (data.success) {

            document.getElementById("message").style.color = "green";

        } else {

            document.getElementById("message").style.color = "red";

        }

    })

    .catch(error => {

        console.error("Login error:", error);

        document.getElementById("message").innerHTML =
            "Unable to connect to server";

        document.getElementById("message").style.color = "red";

    });

}


/* =========================
   SHOW / HIDE PASSWORD
========================= */

let eye = document.getElementById("eye");
let password = document.getElementById("password");

eye.onclick = function () {

    if (password.type === "password") {

        password.type = "text";

        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");

    }

};