const API_URL = "http://https://astrotalk-clone-two.vercel.app";

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok && data.access_token) {

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("username", email.split("@")[0]);

            alert("Login Successful");

            window.location.href = "index.html";

        } else {

            alert(data.message || "Invalid Email or Password");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}