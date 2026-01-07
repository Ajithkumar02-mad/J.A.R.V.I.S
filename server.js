require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


/* ---------------- MIDDLEWARE ---------------- */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "jarvis_fallback_secret",
    resave: false,
    saveUninitialized: false
  })
);

/* ---------------- PASSWORD SETUP ---------------- */

let PASSWORD_HASH = null;

(async () => {
  if (!process.env.JARVIS_PASSWORD) {
    console.error("❌ JARVIS_PASSWORD missing in .env");
    process.exit(1);
  }

  PASSWORD_HASH = await bcrypt.hash(process.env.JARVIS_PASSWORD, 10);
  console.log("🔐 Password loaded & hashed");
})();

/* ---------------- AUTH MIDDLEWARE ---------------- */

function requireLogin(req, res, next) {
  if (req.session.loggedIn) return next();
  res.redirect("/login");
}

/* ---------------- ROUTES ---------------- */

// LOGIN PAGE
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// LOGIN HANDLER
app.post("/login", async (req, res) => {
  const { password } = req.body;

  if (!PASSWORD_HASH) {
    return res.send("❌ Password not configured");
  }

  const ok = await bcrypt.compare(password, PASSWORD_HASH);
  if (!ok) {
    return res.status(401).send("❌ Wrong password");
  }

  req.session.loggedIn = true;
  res.redirect("/");
});

// LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// 🔒 FORCE LOCK (used by auto-lock & button)
app.post("/lock", (req, res) => {
  req.session.destroy(() => {
    res.json({ locked: true });
  });
});

// ===== J.A.R.V.I.S AI CHAT =====
app.post("/api/jarvis-chat", requireLogin, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are J.A.R.V.I.S, a smart personal AI assistant for Ajith. Be concise, helpful, and futuristic."
        },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (err) {
    console.error("❌ JARVIS AI ERROR:", err.message);
    res.status(500).json({ error: "AI backend error" });
  }
});



// PROTECTED MAIN APP
app.get("/", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ---------------- STATIC FILES ---------------- */
app.use(express.static(path.join(__dirname, "public")));

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`🤖 J.A.R.V.I.S running at http://localhost:${PORT}`);
});
