const reviewContainer = document.getElementById("reviewContainer");

const reviews = [

{
    name:"Rahul",
    rating:"⭐⭐⭐⭐⭐",
    review:"Amazing astrologer. Very accurate prediction."
},

{
    name:"Priya",
    rating:"⭐⭐⭐⭐",
    review:"Good guidance for career and relationship."
},

{
    name:"Amit",
    rating:"⭐⭐⭐⭐⭐",
    review:"Highly recommended. Very professional."
}

];

reviewContainer.innerHTML = "";

reviews.forEach((item)=>{

    reviewContainer.innerHTML += `

        <div class="review-card">

            <div class="review-header">

                <span class="review-name">${item.name}</span>

                <span class="review-rating">${item.rating}</span>

            </div>

            <div class="review-text">

                ${item.review}

            </div>

        </div>

    `;

});