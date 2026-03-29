// =====================================================
// RESERVATIONS.JS — FINAL WORKING VERSION
// =====================================================

// -------------------------------
// DOM ELEMENTS
// -------------------------------
const resourceSelect = document.getElementById("reservationResourceId");
const reservationList = document.getElementById("reservationList");
const form = document.getElementById("reservationForm");
const messageBox = document.getElementById("reservationMessage");

const idField = document.getElementById("reservationId");
const userIdField = document.getElementById("reservationUserId");
const reserverField = document.getElementById("reservationReserver");
const startField = document.getElementById("reservationStart");
const endField = document.getElementById("reservationEnd");
const noteField = document.getElementById("reservationNote");
const statusField = document.getElementById("reservationStatus");


// =====================================================
// LOAD RESOURCES INTO DROPDOWN
// =====================================================
async function loadResources() {
    try {
        const res = await fetch("/api/resources");
        const data = await res.json();

        if (!data.ok) {
            console.error("Failed to load resources");
            return;
        }

        resourceSelect.innerHTML = "";

        data.data.forEach(resource => {
            const opt = document.createElement("option");
            opt.value = resource.id;
            opt.textContent = resource.name;
            resourceSelect.appendChild(opt);
        });

    } catch (err) {
        console.error("Resource load error:", err);
    }
}


// =====================================================
// LOAD RESERVATIONS
// =====================================================
async function loadReservations() {
    try {
        const res = await fetch("/api/reservations");
        const data = await res.json();

        if (!data.ok) {
            console.error("Failed to load reservations");
            return;
        }

        renderReservationList(data.data);

    } catch (err) {
        console.error("Reservation load error:", err);
    }
}


// =====================================================
// RENDER RESERVATION LIST
// =====================================================
function renderReservationList(items) {
    reservationList.innerHTML = "";

    if (!items.length) {
        reservationList.innerHTML = `<p class="text-sm text-black/50">No reservations found.</p>`;
        return;
    }

    items.forEach(item => {
        const div = document.createElement("div");
        div.className =
            "cursor-pointer rounded-2xl border border-black/10 p-4 hover:bg-black/5 transition";

        div.innerHTML = `
            <div class="font-semibold">${item.resource_name}</div>
            <div class="text-xs text-black/60">${item.user_email}</div>
            <div class="text-xs text-black/60">${formatDate(item.start_time)} → ${formatDate(item.end_time)}</div>
            <div class="text-xs mt-1">
                <span class="px-2 py-1 rounded-full text-white text-[10px] ${
                    item.status === "active"
                        ? "bg-brand-green"
                        : item.status === "cancelled"
                        ? "bg-brand-rose"
                        : "bg-brand-blue"
                }">
                    ${item.status}
                </span>
            </div>
        `;

        div.onclick = () => fillForm(item);
        reservationList.appendChild(div);
    });
}

function formatDate(dt) {
    return new Date(dt).toLocaleString("fi-FI", {
        dateStyle: "short",
        timeStyle: "short"
    });
}


// =====================================================
// FILL FORM FOR EDITING
// =====================================================
function fillForm(item) {
    idField.value = item.id;
    resourceSelect.value = item.resource_id;
    userIdField.value = item.user_id;
    reserverField.value = item.user_email;

    startField.value = item.start_time.slice(0, 16);
    endField.value = item.end_time.slice(0, 16);

    noteField.value = item.note || "";
    statusField.value = item.status;

    document.getElementById("reservationSubmit").textContent = "Update reservation";
}


// =====================================================
// CREATE OR UPDATE RESERVATION
// =====================================================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        resourceId: Number(resourceSelect.value),
        userId: Number(userIdField.value),
        startTime: new Date(startField.value).toISOString(),
        endTime: new Date(endField.value).toISOString(),
        note: noteField.value.trim(),
        status: statusField.value
    };

    const id = idField.value;
    const url = id ? `/api/reservations/${id}` : "/api/reservations";
    const method = id ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            showMessage("Error saving reservation", "error");
            return;
        }

        showMessage(id ? "Reservation updated!" : "Reservation created!", "success");

        form.reset();
        idField.value = "";
        document.getElementById("reservationSubmit").textContent = "Submit";

        loadReservations();

    } catch (err) {
        console.error(err);
        showMessage("Network error", "error");
    }
});


// =====================================================
// DELETE RESERVATION
// =====================================================
async function deleteReservation(id) {
    if (!confirm("Delete this reservation?")) return;

    try {
        const res = await fetch(`/api/reservations/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            showMessage("Error deleting reservation", "error");
            return;
        }

        showMessage("Reservation deleted!", "success");
        loadReservations();
        form.reset();

    } catch (err) {
        console.error(err);
        showMessage("Network error", "error");
    }
}


// =====================================================
// MESSAGE HELPER
// =====================================================
function showMessage(msg, type = "success") {
    messageBox.textContent = msg;

    messageBox.className =
        "mt-6 rounded-2xl border px-4 py-3 text-sm " +
        (type === "success"
            ? "bg-green-100 border-green-400 text-green-700"
            : "bg-red-100 border-red-400 text-red-700");

    messageBox.classList.remove("hidden");

    setTimeout(() => {
        messageBox.classList.add("hidden");
    }, 3000);
}


// =====================================================
// INIT
// =====================================================
document.addEventListener("DOMContentLoaded", loadResources);
document.addEventListener("DOMContentLoaded", loadReservations);
