const favoriteContainer = document.getElementById("favoriteContainer");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {

    favoriteContainer.innerHTML = `

    <div style="
        background:white;
        padding:30px;
        border-radius:12px;
        text-align:center;
        box-shadow:0 5px 15px rgba(0,0,0,.1);
    ">

        <h2>No Favorite Astrologers Yet ❤️</h2>

    </div>

    `;

} else {

    favorites.forEach((astro, index) => {

        favoriteContainer.innerHTML += `

        <div style="
            background:white;
            padding:20px;
            margin-bottom:20px;
            border-radius:12px;
            box-shadow:0 5px 15px rgba(0,0,0,.1);
        ">

            <h2>${astro.name}</h2>

            <button onclick="removeFavorite(${index})">

                Remove

            </button>

        </div>

        `;

    });

}

function removeFavorite(index) {

    favorites.splice(index, 1);

    localStorage.setItem(

        "favorites",

        JSON.stringify(favorites)

    );

    location.reload();

}