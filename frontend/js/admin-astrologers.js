const API_URL = "https://astrotalk-clone-two.vercel.app";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login as an admin first");
    window.location.href = "login.html";
}

const astrologerList = document.getElementById("astrologerList");

loadAstrologers();

async function loadAstrologers() {

    astrologerList.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(`${API_URL}/astrologers`);
        const astrologers = await response.json();

        if (!astrologers.length) {
            astrologerList.innerHTML = `
                <h2 style="text-align:center;">
                    No Astrologers Added
                </h2>
            `;
            return;
        }

        astrologerList.innerHTML = "";

        astrologers.forEach((astro) => {

            astrologerList.innerHTML += `

                <div class="astro-card">

                    <h2>${astro.name}</h2>

                    <p>🔮 ${astro.specialization}</p>

                    <p>⭐ ${astro.experience} Years Experience</p>

                    <p>💰 ₹${astro.price_per_minute}/Minute</p>

                    <button onclick="deleteAstrologer(${astro.id})">
                        Delete
                    </button>

                </div>

            `;

        });

    } catch (err) {
        console.log(err);
        astrologerList.innerHTML = "<p>Failed to load astrologers.</p>";
    }
}

async function addAstrologer() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const specialization = document.getElementById("specialization").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const price = document.getElementById("price").value.trim();
    const bio = document.getElementById("bio").value.trim();

    if (!name || !email || !specialization || !experience || !price || !bio) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/astrologers/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name,
                email,
                specialization,
                experience: Number(experience),
                price_per_minute: Number(price),
                bio
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.detail || "Failed to add astrologer");
            return;
        }

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("specialization").value = "";
        document.getElementById("experience").value = "";
        document.getElementById("price").value = "";
        document.getElementById("bio").value = "";

        alert("Astrologer Added Successfully");
        loadAstrologers();

    } catch (err) {
        console.log(err);
        alert("Server Error");
    }
}

async function deleteAstrologer(id) {

    if (!confirm("Delete this astrologer?")) return;

    try {

        const response = await fetch(`${API_URL}/astrologers/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.detail || "Failed to delete astrologer");
            return;
        }

        alert("Astrologer Deleted");
        loadAstrologers();

    } catch (err) {
        console.log(err);
        alert("Server Error");
    }
}