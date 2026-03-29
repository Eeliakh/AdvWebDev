// form.js

// Hae lomake ja lista
const form = document.getElementById("reservationForm");
const reservationList = document.getElementById("reservationList");
const messageBox = document.getElementById("reservationMessage");

// Lomakkeen submit-event
form.addEventListener("submit", function (e) {
    e.preventDefault(); // estää sivun uudelleenlatauksen
    createReservation();
});

// Luo uusi varaus backendille
function createReservation() {
    const resourceId = parseInt(document.getElementById("reservationResource").value);
    const userId = parseInt(document.getElementById("reservationUserId").value || "1"); // Piilotettu kenttä tai testikäyttäjä
    const startTime = document.getElementById("reservationStart").value;
    const endTime = document.getElementById("reservationEnd").value;
    const note = document.getElementById("reservationNote").value.trim();
    const status = document.getElementById("reservationStatus").value;

    // Pieni validointi
    if (!resourceId || !userId || !startTime || !endTime) {
        showMessage("Please fill in all required fields.", "error");
        return;
    }

    const reservation = {
        resourceId,
        userId,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        note,
        status
    };

    // Lähetä POST-pyyntö backendille
    fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation)
    })
    .then(response => {
        if (response.status === 201) {
            showMessage("Reservation created successfully!", "success");
            form.reset();
            addReservationToList(reservation);
        } else {
            showMessage("Error creating reservation.", "error");
        }
    })
    .catch(err => {
        console.error(err);
        showMessage("Network error.", "error");
    });
}

// Lisää varaus selaimen listaan (vain UI-päivitys)
function addReservationToList(reservation) {
    const item = document.createElement("div");
    item.className = "p-3 rounded-xl border border-black/10 bg-white shadow cursor-pointer hover:bg-gray-50 transition";
    item.innerHTML =
        "<strong>Resource ID:</strong> " + reservation.resourceId + "<br>" +
        "<strong>User ID:</strong> " + reservation.userId + "<br>" +
        formatDateTime(reservation.startTime) + " → " + formatDateTime(reservation.endTime) + "<br>" +
        "<em>" + reservation.note + "</em><br>" +
        "Status: <span class='font-semibold'>" + reservation.status + "</span>";

    reservationList.appendChild(item);
}

// Näyttää viestin lomakkeen yläpuolella
function showMessage(msg, type) {
    type = type || "success";

    messageBox.textContent = msg;
    messageBox.className =
        "mt-6 rounded-2xl border px-4 py-3 text-sm " +
        (type === "success"
            ? "bg-green-100 border-green-400 text-green-700"
            : "bg-red-100 border-red-400 text-red-700");

    messageBox.classList.remove("hidden");

    setTimeout(function () {
        messageBox.classList.add("hidden");
    }, 3000);
}

// Muotoilee ISO 8601 datetime
function formatDateTime(dt) {
    if (!dt) return "";
    const date = new Date(dt);
    return date.toLocaleString([], { dateStyle: "short", timeStyle: "short" });
}