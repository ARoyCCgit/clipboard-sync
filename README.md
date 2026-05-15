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

---
## Start Server
cd server
npm install
node server.js

##Start Mobile Client
cd mobile-client
npm install
npm run dev

## Start Electron Desktop App
cd desktop-agent
npm install
npm start