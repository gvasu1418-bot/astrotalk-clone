const API_URL = "https://astrotalk-clone-two.vercel.app";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}

async function loadWallet() {

    try {

        const response = await fetch(`${API_URL}/wallet/balance`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        document.getElementById("balance").innerHTML =
            "₹" + data.balance;

    } catch (err) {

        console.log(err);

        document.getElementById("balance").innerHTML = "₹0";

    }

}

async function addMoney() {

    const amount = prompt("Enter Amount");

    if (!amount) return;

    try {

        const response = await fetch(`${API_URL}/wallet/add-money`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + token

            },

            body: JSON.stringify({

                amount: Number(amount)

            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Money Added Successfully");

            loadWallet();

        } else {

            alert(data.detail || "Failed");

        }

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

loadWallet();