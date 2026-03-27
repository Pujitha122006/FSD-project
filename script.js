const form = document.getElementById("eventForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);

    fetch("add_event.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        loadEvents();
    });
});

// Load events every 3 seconds
function loadEvents() {
    fetch("fetch_events.php")
    .then(res => res.json())
    .then(data => {
        let output = "";
        data.forEach(event => {
            output += `
                <div>
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <hr>
                </div>
            `;
        });
        document.getElementById("events").innerHTML = output;
    });
}

setInterval(loadEvents, 3000);
loadEvents();