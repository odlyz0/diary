document.addEventListener("DOMContentLoaded", () => {
    displayEntries();
});

function saveEntry() {
    const entryText = document.getElementById("diaryEntry").value;
    const mood = document.getElementById("mood").value;
    const date = new Date().toLocaleDateString();
    const imageUpload = document.getElementById("imageUpload").files[0];
    
    if (entryText.trim() === "") {
        alert("Please write something in your diary!");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        const entry = {
            id: Date.now(),
            date: date,
            text: entryText,
            mood: mood,
            image: reader.result || null
        };

        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));

        document.getElementById("diaryEntry").value = "";
        document.getElementById("mood").value = "happy";
        document.getElementById("imageUpload").value = "";

        displayEntries();
    };

    if (imageUpload) {
        reader.readAsDataURL(imageUpload);
    } else {
        reader.onloadend();
    }
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
        moodP.innerHTML = `Mood: ${getMoodEmoji(entry.mood)}`;
        entryDiv.appendChild(moodP);

        if (entry.image) {
            const img = document.createElement("img");
            img.src = entry.image;
            img.alt = "Diary Image";
            img.classList.add("entry-image");
            entryDiv.appendChild(img);
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deleteEntry(entry.id);
        entryDiv.appendChild(deleteBtn);

        entriesList.appendChild(entryDiv);
    });
}

function getMoodEmoji(mood) {
    const moodEmojis = {
        happy: '<i class="fa-solid fa-face-smile"></i> ',
        sad: '<i class="fa-solid fa-face-frown"></i> ',
        excited: '<i class="fa-solid fa-face-laugh"></i> ',
        angry: '<i class="fa-solid fa-face-angry"></i> ',
        neutral: '<i class="fa-solid fa-face-meh"></i> ',
        depressed: '<i class="fa-solid fa-face-sad-tear"></i> ',
        irritated: '<i class="fa-solid fa-face-rolling-eyes"></i> '
    };

    return moodEmojis[mood] || mood;
}

function deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem("entries", JSON.stringify(entries));
    displayEntries();
}
