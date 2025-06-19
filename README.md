# WebSocket-Cursor-Room

A real-time collaborative cursor tracking app using Node.js, Express, and WebSockets. Users can see each other's cursor movements in a shared room, with each cursor assigned a unique color.

## Features
- Real-time cursor sharing between multiple users
- Unique color assigned to each user's cursor
- Simple front-end served via Express
- WebSocket server for low-latency communication

## Project Structure
```
WebSocket-Cursor-Room/
├── src/
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── index.html
│   ├── server.js
│   └── utils/
│       └── utils.js
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/WebSocket-Cursor-Room.git
   cd WebSocket-Cursor-Room
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory to override default ports if needed:
```
PORT=3000      # HTTP server port (default: 3000)
WS_PORT=3200   # WebSocket server port (default: 3200)
```

### Running the App
Start both the HTTP and WebSocket servers:
```bash
npm start
```
- The HTTP server will serve the front-end at [http://localhost:3000](http://localhost:3000) (or your specified `PORT`).
- The WebSocket server will listen on port 3200 (or your specified `WS_PORT`).

## How It Works
- Open the app in multiple browser windows/tabs.
- Move your mouse: your cursor position is broadcast to all connected clients in real time.
- When a user leaves, their cursor is removed from others' screens.

## Code Overview
- `src/server.js`: Main server file (Express + WebSocket logic)
- `src/utils/utils.js`: Utility functions (e.g., message formatting, color generation)
- `src/public/`: Static front-end files

## License
MIT 