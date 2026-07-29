const API_URL = "http://127.0.0.1:8000";

const token = localStorage.getItem("token");

const bookingTable = document.getElementById("bookingTable");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

async function loadBookings() {

    try {

        const response = await fetch(`${API_URL}/bookings`, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const bookings = await response.json();

        bookingTable.innerHTML = "";

        if (bookings.length === 0) {

            bookingTable.innerHTML = `

            <tr>

                <td colspan="4">

                    No Bookings Found

                </td>

            </tr>

            `;

            return;

        }

        bookings.forEach((booking) => {

            bookingTable.innerHTML += `

            <tr>

                <td>${booking.astrologer}</td>

                <td>${booking.specialization}</td>

                <td>Today</td>

                <td style="color:green">

                    Completed

                </td>

            </tr>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadBookings();