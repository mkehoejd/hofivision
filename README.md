HOFIVISION

A unified messaging terminal built with Electron, React, and Xterm.js — designed to consolidate communication across platforms (starting with Facebook Messenger, Instagram, Reverb, Gmail, and more coming soon).

 

⸻

🔧 Setup Instructions

Prerequisites
	•	Node.js v18+
	•	npm
	•	Electron v27+

Local Development

# Clone the repo
git clone https://github.com/mkehoejd/hofivision.git
cd hofivision

# Install dependencies
npm install

# Run dev server for frontend (React)
npm run dev

# In a separate terminal, launch Electron
npm start

Webhook Server (for Facebook Messenger)

# Start webhook server
node src/api/webhook.js

To expose locally via ngrok:

ngrok http 3000


⸻

🔐 Privacy Policy

You can find our privacy policy at:
https://github.com/mkehoejd/hofivision/privacyPolicy

⸻

🧪 Meta App Review - Testing Credentials

Integration Access Instructions:
	1.	Log in to Facebook
	2.	Open Messenger and send a message to the linked Facebook Page
	3.	Message is forwarded to the local webhook server
	4.	Displayed in the HOFIVISION terminal under the inbox command

Testing Commands:
	•	help: show all available commands
	•	inbox: display collected messages
	•	sendfb USER_ID MESSAGE: send outbound message

Test User Credentials can be provided upon request. Contact: support@yourbusinessdomain.com

⸻

✨ Features
	•	Terminal-inspired UI styled like macOS Terminal
	•	Rotating boot theme colors
	•	Real-time message capture via webhook
	•	Command-based messaging interface
	•	Easy plug-and-play extension to other platforms

⸻

📦 Folder Structure

src/
├── api/              # Webhook and API handlers
├── data/             # Internal data & message queue
├── assets/           # Fonts, icons, etc.
├── MessagingTerminal.jsx # React terminal component


⸻

🚀 Roadmap
	•	Facebook Messenger integration
	•	Instagram DMs
	•	Reverb Inbox
	•	Gmail thread capture
	•	Unified search and command palette

⸻

🧠 Credits

Developed by Marcus Kehoe — designed for pros who don’t want to juggle 27 open tabs to stay caught up.

⸻

📜 License

MIT
