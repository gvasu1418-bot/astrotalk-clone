const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("message");

const astrologerId = localStorage.getItem("astrologerId");

const astrologers = JSON.parse(localStorage.getItem("astrologers")) || [];

const astrologer = astrologers.find(
    a => a.id == astrologerId
);

if (astrologer) {

    document.getElementById("astroName").innerHTML = astrologer.name;

}

function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `

        <div style="
            text-align:right;
            margin:10px;
        ">

            <span style="
                background:#6c2bd9;
                color:white;
                padding:10px;
                border-radius:10px;
                display:inline-block;
            ">
                ${message}
            </span>

        </div>

    `;

    messageInput.value = "";

    setTimeout(() => {

        chatBox.innerHTML += `

            <div style="
                text-align:left;
                margin:10px;
            ">

                <span style="
                    background:#eeeeee;
                    padding:10px;
                    border-radius:10px;
                    display:inline-block;
                ">
                    Thank you. I'll guide you shortly. 😊
                </span>

            </div>

        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1000);

}