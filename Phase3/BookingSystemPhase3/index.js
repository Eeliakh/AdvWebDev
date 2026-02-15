require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const path = require("path");

// Timestamp
function timestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").replace("Z", "");
}

// --- Middleware ---
app.use(express.json()); // Parse application/json

// Serve everything in ./public as static assets
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- Views (HTML pages) ---
// GET /  -> serve index.html
app.get("/", (_req, res) => { //maybe req?
  res.sendFile(path.join(publicDir, "index.html"));
});

// Optional: GET /resources -> serve resources.html directly
app.get("/resources", (_req, res) => {
  res.sendFile(path.join(publicDir, "resources.html"));
});

// POST /api/resources -> create/update/delete based on "action"
app.post("/api/resources", (req, res) => {
  const {
    action = "",
    resourceName = "",
    resourceDescription = "", //fixed declaration
    resourceAvailable = false,  //maybe?
    resourcePrice = 0,
    resourcePriceUnit = "",
  } = req.body || {};

  // Normalize inputs
  const resourceAction = String(action).trim();
  const name = String(resourceName).trim();
  const description = String(resourceDescription).trim();
  const available = Boolean(resourceAvailable); //maybe?
  const parsedPrice = Number(resourcePrice);
  const price = Number.isFinite(parsedPrice) ? parsedPrice : 0;
  const unit = String(resourcePriceUnit || "").trim();

  // The client's request to the console
  console.log("The client's POST request ", `[${timestamp()}]`);
  console.log("--------------------------");
  console.log("Action ➡️ ", resourceAction);
  console.log("Name ➡️ ", name);
  console.log("Description ➡️ ", description);
  console.log("Price ➡️ ", price);
  console.log("Available ➡️ ", available);
  console.log("Price unit ➡️ ", unit);
  console.log("--------------------------");
  
  return res.json({
    ok: true,
    echo: {
      action: resourceAction,
      resourceName: name,
      resourceDescription: description,
      resourceAvailable: available,
      resourcePrice: price,
      resourcePriceUnit: unit,
    },
  });
});


// --- Fallback 404 for unknown API routes ---
app.use("/api", (_req, res) => { //maybe?
  return res.status(404).json({ error: "Not found" });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
