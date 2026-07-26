// Login Button
document.getElementById("loginBtn").addEventListener("click", () => {
    window.location.href = "login.html";
});

// Signup Button
document.getElementById("signupBtn").addEventListener("click", () => {
    window.location.href = "signup.html";
});

// Astrologer Data
const API_URL = "https://astrotalk-clone-two.vercel.app";

async function loadCards() {

    try {

        const response = await fetch(
            `${API_URL}/astrologers/search?specialization=Tarot`
        );

        const astrologers = await response.json();

        cardContainer.innerHTML = "";

        astrologers.forEach((astro) => {

            cardContainer.innerHTML += `
                <div class="card">

                    <img src="https://randomuser.me/api/portraits/men/32.jpg">

                    <div class="card-content">

                        <h3>${astro.name}</h3>

                        <p>Experience : ${astro.experience} Years</p>

                        <p>⭐ ${astro.rating || "4.8"}</p>

                        async function talkNow(astrologerId) {

                        <button onclick="talkNow('${astro.name}')">
                            Talk Now
                        </button>

                        }
                    </div>

                </div>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}

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

        alert("Logged Out Successfully");

        window.location.reload();

    });

}