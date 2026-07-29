const horoscopeData = {

    Aries: "Today is a great day to start something new. Stay confident.",

    Taurus: "Focus on your career. A new opportunity may come.",

    Gemini: "Communication will help you solve problems today.",

    Cancer: "Spend quality time with your family and loved ones.",

    Leo: "Your leadership skills will shine today.",

    Virgo: "A productive day for studies and work.",

    Libra: "Maintain balance in your relationships.",

    Scorpio: "Trust your instincts before making decisions.",

    Sagittarius: "Travel or learning something new is favored.",

    Capricorn: "Hard work will bring success very soon.",

    Aquarius: "Creative ideas can lead to new opportunities.",

    Pisces: "Stay calm and avoid unnecessary stress."

};

function showHoroscope() {

    const zodiac = document.getElementById("zodiacSelect").value;

    if (!zodiac) {

        alert("Please select your zodiac sign.");

        return;

    }

    document.getElementById("signName").innerHTML = zodiac;

    document.getElementById("prediction").innerHTML = horoscopeData[zodiac];

}