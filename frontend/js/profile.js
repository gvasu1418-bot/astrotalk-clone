const API_URL = "http://127.0.0.1:8000";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}

async function loadProfile() {

    try {

        const response = await fetch(`${API_URL}/profile`, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const user = await response.json();

        document.getElementById("userName").innerHTML = user.name;

        document.getElementById("userEmail").innerHTML = user.email;

    } catch (err) {

        console.log(err);

    }

}

async function loadWallet() {

    try {

        const response = await fetch(`${API_URL}/wallet/balance`, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const data = await response.json();

        document.getElementById("walletBalance").innerHTML =
            "₹" + data.balance;

    } catch (err) {

        console.log(err);

    }

}

async function loadBookings() {

    try {

        const response = await fetch(`${API_URL}/bookings`, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const bookings = await response.json();

        document.getElementById("bookingCount").innerHTML =
            bookings.length;

    } catch (err) {

        console.log(err);

    }

}

loadProfile();

loadWallet();

loadBookings();