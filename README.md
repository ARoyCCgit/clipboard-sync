# Clipboard Sync

Realtime cross-device clipboard synchronization system built with Electron, React, Node.js, and Socket.io.

## Features

- Realtime clipboard sync
- QR-based device pairing
- Electron desktop application
- Mobile responsive PWA
- Clipboard history
- WebSocket communication
- Cross-device synchronization
- Tray application support
- Modern Tailwind UI

---

## Architecture

Desktop Electron App
↓
Socket.io Server
↓
React Mobile Client

---

## Tech Stack

### Frontend
- React
- Vite
- TailwindCSS
- Socket.io Client

### Backend
- Node.js
- Express
- Socket.io

### Desktop
- Electron
- Clipboardy

---

## Screenshots

Add screenshots here later.

---

## Installation

# Clone Repository

```bash
git clone https://github.com/ARoyCCgit/clipboard-sync.git

````
---

## Start Server

```bash
cd server
npm install
node server.js
```

---

## Start Mobile Client

```bash
cd mobile-client
npm install
npm run dev
```
## Screenshot
#Desktop App: <img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/fb183a77-a601-4b0d-95c7-5175879ee369" />
#Mobile : <img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/24955b7b-21ae-4072-add9-0969c6e8ad1d" />


---

## Start Desktop App

```bash
cd desktop-agent
npm install
npm start
```

---

# Usage

1. Start backend server
2. Start mobile frontend
3. Start Electron desktop app
4. Scan QR code using phone
5. Mobile connects automatically
6. Copy text on desktop
7. Clipboard syncs instantly to mobile
8. Paste synced text anywhere on phone

---

# Current Capabilities

- Realtime clipboard sync
- QR-based device pairing
- Clipboard history
- Cross-device communication
- Mobile responsive UI
- Session-based websocket communication
- Dynamic local IP generation
- Electron desktop support

---

# Future Improvements

- End-to-end encryption
- File transfer support
- Image clipboard sync
- Cloud deployment
- Multi-device synchronization
- Authentication system
- Clipboard search
- AI clipboard assistant
- Native Android/iOS apps

---

# Deployment Plans

## Frontend
- Vercel
- Netlify

## Backend
- Railway
- Render
- VPS deployment

---

# Learning Outcomes

This project helped learn:

- WebSocket communication
- Realtime systems architecture
- Electron desktop development
- React frontend architecture
- QR code pairing systems
- Socket.io room management
- Clipboard automation
- Cross-device communication
- Event-driven programming

---

# Known Limitations

- Currently works only on same WiFi network
- Supports text sync only
- No authentication implemented yet
- No persistent database yet

---

# Author

Arnab Roy

---

# License

MIT
