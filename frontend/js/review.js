const API_URL = "http://https://astrotalk-clone-two.vercel.app";

const token = localStorage.getItem("token");


const astrologerId = localStorage.getItem("astrologerId");

// Reviews load
async function loadReviews() {

    try {

        const response = await fetch(
            `${API_URL}/reviews/${astrologerId}`
        );

        const reviews = await response.json();

        const reviewList = document.getElementById("reviewList");

        reviewList.innerHTML = "";

        if (reviews.length === 0) {

            reviewList.innerHTML = "<p>No Reviews Yet</p>";
            return;

        }

        reviews.forEach((review) => {

            reviewList.innerHTML += `
                <div class="review-card">
                    <h3>⭐ ${review.rating}/5</h3>
                    <p>${review.comment}</p>
                    <hr>
                </div>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}


// Submit Review
async function submitReview() {

    if (!token) {

        alert("Please Login First");
        window.location.href = "login.html";
        return;

    }

    const rating = document.getElementById("rating").value;

    const comment = document.getElementById("comment").value;

    try {

        const response = await fetch(
            `${API_URL}/reviews`,
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify({

                    astrologer_id: astrologerId,
                    rating: parseInt(rating),
                    comment: comment

                })

            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("✅ Review Submitted");

            document.getElementById("comment").value = "";

            loadReviews();

        }

        else {

            alert(data.detail);

        }

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

loadReviews();



function openReview(astrologerId) {

    localStorage.setItem("astrologerId", astrologerId);

    window.location.href = "review.html";

}