const API_URL = "/api/persons";

let selectedCustomerId = null;

// Load customers on page load
document.addEventListener("DOMContentLoaded", loadCustomers);

// FORM SUBMIT (ADD)
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const customer = getFormData();

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });

    clearForm();
    loadCustomers();
});

// UPDATE BUTTON
document.getElementById("update-btn").addEventListener("click", async () => {
    if (!selectedCustomerId) return alert("Select a customer first");

    const customer = getFormData();

    await fetch(`${API_URL}/${selectedCustomerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });

    clearForm();
    loadCustomers();
});

// DELETE BUTTON
document.getElementById("delete-btn").addEventListener("click", async () => {
    if (!selectedCustomerId) return alert("Select a customer first");

    await fetch(`${API_URL}/${selectedCustomerId}`, {
        method: "DELETE"
    });

    clearForm();
    loadCustomers();
});

// LOAD CUSTOMERS
async function loadCustomers() {
    const res = await fetch(API_URL);
    const customers = await res.json();

    renderCustomers(customers);
}

// RENDER LIST
function renderCustomers(customers) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    customers.forEach(customer => {
        const div = document.createElement("div");
        div.classList.add("customer-item");

        div.textContent = `${customer.first_name} ${customer.last_name} (${customer.email})`;

        div.onclick = () => selectCustomer(customer);

        list.appendChild(div);
    });
}

// SELECT CUSTOMER
function selectCustomer(customer) {
    selectedCustomerId = customer.id;

    document.getElementById("first_name").value = customer.first_name;
    document.getElementById("last_name").value = customer.last_name;
    document.getElementById("email").value = customer.email;
    document.getElementById("phone").value = customer.phone || "";
    document.getElementById("birth_date").value = customer.birth_date
        ? customer.birth_date.split("T")[0]
        : "";
}

// GET FORM DATA
function getFormData() {
    return {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value || null,
        birth_date: document.getElementById("birth_date").value || null
    };
}

// CLEAR FORM
function clearForm() {
    selectedCustomerId = null;

    document.getElementById("form").reset();
}