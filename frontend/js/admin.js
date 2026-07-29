const API_URL = "https://astrotalk-clone-two.vercel.app";

async function loadDashboard() {

    try {

        const response = await fetch(`${API_URL}/admin/dashboard`);

        const data = await response.json();

        animateValue("users",0,data.total_users,800);

        animateValue("astrologers",0,data.total_astrologers,800);

        animateValue("bookings",0,data.total_bookings,800);

        animateValue("revenue",0,data.total_revenue,800);


        const table = document.getElementById("recentUsers");

        const bookingTable = document.getElementById("recentBookings");

if (bookingTable) {

    bookingTable.innerHTML = "";

    data.recent_bookings.forEach((booking) => {

        bookingTable.innerHTML += `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.user_id}</td>
                <td>${booking.astrologer_id}</td>
            </tr>
        `;

    });

}

        if (table) {

            table.innerHTML = "";

            data.recent_users.forEach((user) => {

                table.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                    </tr>
                `;

            });

        }

    } catch (err) {

        console.log(err);

        alert("Dashboard Loading Failed");

    }

}

loadDashboard();

const ctx = document.getElementById("dashboardChart");

new Chart(ctx, {

    type: "bar",

    data: {

        labels: [

            "Users",
            "Astrologers",
            "Bookings"

        ],

        datasets: [{

            label: "Analytics",

            data: [

                data.total_users,

                data.total_astrologers,

                data.total_bookings

            ]

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        }

    }

});


function animateValue(id, start, end, duration) {

    let current = start;

    const increment = end / (duration / 20);

    const obj = document.getElementById(id);

    const timer = setInterval(() => {

        current += increment;

        if (current >= end) {

            current = end;

            clearInterval(timer);

        }

        if (id === "revenue") {

            obj.innerHTML = "₹" + Math.floor(current);

        } else {

            obj.innerHTML = Math.floor(current);

        }

    }, 20);

}