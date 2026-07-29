const API_URL = "https://astrotalk-clone-two.vercel.app";

async function signup() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message || "Registration Successful");
            window.location.href = "login.html";

        } else {

                console.log(data);
                alert(data.detail || data.message || "Registration Failed");


        }

    } catch (error) {

        console.log(error);

        alert("Server Error: " + error.message);

    }

}