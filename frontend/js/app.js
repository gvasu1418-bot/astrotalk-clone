// Login Button
document.getElementById("loginBtn").addEventListener("click", () => {
    window.location.href = "login.html";
});

// Signup Button
document.getElementById("signupBtn").addEventListener("click", () => {
    window.location.href = "signup.html";
});

const heroTalkBtn = document.getElementById("heroTalkBtn");
if (heroTalkBtn) {
    heroTalkBtn.addEventListener("click", () => {
        document.getElementById("astrologers").scrollIntoView({ behavior: "smooth" });
    });
}

function getAvatarUrl(id) {
    const gender = id % 2 === 0 ? "women" : "men";
    const photoIndex = (id * 7) % 90;
    return `https://randomuser.me/api/portraits/${gender}/${photoIndex}.jpg`;
}

// Astrologer Data
const API_URL = "http://https://astrotalk-clone-two.vercel.app";

async function loadCards() {

    try {

        const response = await fetch(
            `${API_URL}/astrologers`
        );

        const astrologers = await response.json();

        localStorage.setItem("astrologers", JSON.stringify(astrologers));
        
        cardContainer.innerHTML = "";

        astrologers.forEach((astro) => {

            cardContainer.innerHTML += `
                <div class="card">

                    <img src="${getAvatarUrl(astro.id)}">

                    <div class="card-content">

                        <h3>${astro.name}</h3>

                        <p>Experience : ${astro.experience} Years</p>

                        <p>⭐ ${astro.rating || "4.8"}</p>


                        <button onclick="talkNow(${astro.id})">
                            Talk Now
                        </button>

                        <button onclick="openChat(${astro.id})">
                            💬 Chat
                        </button>

                        <button onclick="openReview(${astro.id})">
                            ⭐ Reviews
                        </button>

                        <button onclick="addFavorite(${astro.id}, '${astro.name}')">
                             Favorite
                        </button>
                    </div>

                </div>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}
const cardContainer = document.getElementById("cardContainer");

loadCards();
// Authentication
const token = localStorage.getItem("token");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const usernameSpan = document.getElementById("username");

if (token) {

    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";

    

    const username = localStorage.getItem("username");

    if (usernameSpan) {
    usernameSpan.innerHTML = "👤 " + (username || "User");
    }

    if (logoutBtn) {
        logoutBtn.style.display = "inline-block";
    }

} else {

    if (logoutBtn) {
        logoutBtn.style.display = "none";
    }

}

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");


        localStorage.removeItem("username");


        alert("Logged Out Successfully");

        window.location.reload();

    });

}


async function talkNow(astrologerId) {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please Login First");
        window.location.href = "login.html";
        return;
    }

    try {

            const response = await fetch(
                `${API_URL}/bookings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    astrologer_id: astrologerId
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("✅ Booking Successful");
        } else {
            alert(data.detail || "Booking Failed");
        }

    } catch (err) {
        console.log(err);
        alert("Server Error");
    }

}

const walletBtn = document.getElementById("walletBtn");

if (walletBtn) {

    walletBtn.addEventListener("click", () => {

        window.location.href = "wallet.html";

    });

}

const profileBtn = document.getElementById("profileBtn");

if (profileBtn) {

    profileBtn.addEventListener("click", () => {

        window.location.href = "profile.html";

    });

}

const bookingBtn = document.getElementById("bookingBtn");

if (bookingBtn) {

    bookingBtn.addEventListener("click", () => {

        window.location.href = "booking.html";

    });

}


document.getElementById("searchBtn").addEventListener("click", searchAstrologer);

async function searchAstrologer() {

    const specialization = document
        .getElementById("searchInput")
        .value
        .trim();

    if (!specialization) {

        alert("Please enter specialization");

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/astrologers/search?specialization=${specialization}`

        );

        const astrologers = await response.json();

        console.log("Search Result:", astrologers);


       
        localStorage.setItem(
            "astrologers",
             JSON.stringify(astrologers)
            );

        cardContainer.innerHTML = "";

        if (astrologers.length === 0) {

            cardContainer.innerHTML =
                "<h2>No Astrologer Found</h2>";

            return;

        }

        astrologers.forEach((astro) => {

            cardContainer.innerHTML += `

            <div class="card">

                <img src="${getAvatarUrl(astro.id)}">

                <div class="card-content">

                    <h3>${astro.name}</h3>

                    <p>${astro.specialization}</p>

                    <p>${astro.experience} Years</p>

                    <button onclick="talkNow(${astro.id})">

                        Talk Now

                    </button>

                    <button onclick="openReview(${astro.id})">
                        ⭐ Reviews
                    </button>

                </div>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

function openReview(astrologerId) {

    localStorage.setItem("astrologerId", astrologerId);

    window.location.href = "review.html";

}

function addFavorite(id, name) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = favorites.find(item => item.id === id);

    if (alreadyExists) {

        alert("Already Added to Favorites ❤️");

        return;

    }

    favorites.push({
        id: id,
        name: name
    });

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("Added to Favorites ❤️");

}


function openChat(astrologerId) {

    localStorage.setItem("astrologerId", astrologerId);

    window.location.href = "chat.html";

}