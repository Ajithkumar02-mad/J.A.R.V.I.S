🤖 J.A.R.V.I.S – Personal AI Productivity Assistant
J.A.R.V.I.S is a secure, personal AI-powered productivity system inspired by Iron Man’s assistant.
It combines task management, study planning, time tracking, calendar visualization, and an AI chat console — all protected with authentication and auto-lock security.

This project is built as a personal app, designed to run locally with full backend security.

✨ Key Features
🔐 Security
Password-protected login

Encrypted password storage (bcrypt)

Session-based authentication

Auto-lock after inactivity (1 minute)

Manual lock button (Power icon)

.env protected secrets (not pushed to GitHub)

⏱ Work Timer & Analytics
HH : MM : SS : MS timer

Start / Pause / Stop / Reset

Daily / Weekly / Monthly work graphs

Calendar-linked work history

Clear work history option

📅 Calendar & Planning
Task-based calendar view

Daily task breakdown

Work-time graph per date

Study plans & events integration

📚 Productivity Modules
Tasks manager

Study planner

Progress tracker

Library (Books & PDFs)

AI Console

🧠 J.A.R.V.I.S AI Console
Chat-based AI interaction

Command detection (open calendar, study, progress, etc.)

Secure backend API integration

Sound effects for interactions

🔊 UI & Experience
Futuristic HUD-style interface

Panel animations

Sound effects for actions

Fully responsive layout

🛠 Tech Stack
Frontend
HTML5

CSS3 (custom futuristic UI)

Vanilla JavaScript

Backend
Node.js

Express.js

Express-session

bcrypt

dotenv

Storage
LocalStorage (frontend state)

IndexedDB (tasks & study data)

Session cookies (auth)

📂 Project Structure
pgsql
Copy code
J.A.R.V.I.S/
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── jarvis.html
│   ├── calendar.html
│   ├── tasks.html
│   ├── study.html
│   ├── progress.html
│   ├── library.html
│   ├── styles.css
│   ├── sounds.js
│   └── sounds/
│       ├── startup.mp3
│       ├── send.mp3
│       ├── reply.mp3
│       ├── panel-open.mp3
│       └── panel-close.mp3
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── .env   (ignored)
🚀 Getting Started (Local Setup)
1️⃣ Clone the repository
bash
Copy code
git clone https://github.com/Ajithkumar02-mad/J.A.R.V.I.S.git
cd J.A.R.V.I.S
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create .env file
env
Copy code
SESSION_SECRET=your_session_secret
APP_PASSWORD=your_password
OPENAI_API_KEY=your_api_key
⚠️ Never push .env to GitHub.

4️⃣ Start the server
bash
Copy code
npm start
5️⃣ Open in browser
arduino
Copy code
http://localhost:3000
🔑 Authentication Flow
App opens → Login page

Enter password

Session created

Access J.A.R.V.I.S dashboard

Auto-lock after inactivity OR manual lock

Redirects back to login

🧪 Security Notes
Passwords are hashed using bcrypt

Sessions expire on logout / auto-lock

.env, API keys, secrets are ignored via .gitignore

Designed for personal use

📱 Future Plans
Android app (Capacitor / TWA)

Offline-first mode

Voice commands

Cloud sync (optional)

Multi-user profiles

👤 Author
Ajith Kumar
Aspiring AI Engineer & Full Stack Developer
Building projects with learning-first mindset 🚀

📜 License
This project is for personal and educational use.