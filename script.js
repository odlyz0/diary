document.addEventListener("DOMContentLoaded", () => {
    displayEntries();
});

function saveEntry() {
    const entryText = document.getElementById("diaryEntry").value;
    const mood = document.getElementById("mood").value;
    const date = new Date().toLocaleDateString();
    
    if (entryText.trim() === "") {
        alert("Please write something in your diary entry.");
        return;
    }

    const entry = {
        date: date,
        text: entryText,
        mood: mood
    };

    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    document.getElementById("diaryEntry").value = "";
    document.getElementById("mood").value = "happy";

    displayEntries();
}

function displayEntries() {
    const entriesList = document.getElementById("entriesList");
    entriesList.innerHTML = "";

    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    entries.forEach(entry => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const dateP = document.createElement("p");
        dateP.innerText = `Date: ${entry.date}`;
        entryDiv.appendChild(dateP);

        const textP = document.createElement("p");
        textP.innerText = entry.text;
        entryDiv.appendChild(textP);

        const moodP = document.createElement("p");
        moodP.classList.add("mood");
        moodP.innerText = `Mood: ${entry.mood}`;
        entryDiv.appendChild(moodP);

        entriesList.appendChild(entryDiv);
    });
}
