const astrologerList = document.getElementById("astrologerList");

const astrologers = [];

loadAstrologers();

function loadAstrologers() {

    astrologerList.innerHTML = "";

    if (astrologers.length === 0) {

        astrologerList.innerHTML = `
            <h2 style="text-align:center;">
                No Astrologers Added
            </h2>
        `;

        return;
    }

    astrologers.forEach((astro, index) => {

        astrologerList.innerHTML += `

            <div class="astro-card">

                <h2>${astro.name}</h2>

                <p>🔮 ${astro.specialization}</p>

                <p>⭐ ${astro.experience} Years Experience</p>

                <p>💰 ₹${astro.price}/Minute</p>

                <button onclick="deleteAstrologer(${index})">
                    Delete
                </button>

            </div>

        `;

    });

}

function addAstrologer() {

    const name = document.getElementById("name").value.trim();
    const specialization = document.getElementById("specialization").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const price = document.getElementById("price").value.trim();

    if (!name || !specialization || !experience || !price) {
        alert("Please fill all fields");
        return;
    }

    astrologers.push({
        name,
        specialization,
        experience,
        price
    });

    document.getElementById("name").value = "";
    document.getElementById("specialization").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("price").value = "";

    loadAstrologers();

    alert("Astrologer Added Successfully");
}

function deleteAstrologer(index) {

    astrologers.splice(index, 1);

    loadAstrologers();

    alert("Astrologer Deleted");
}