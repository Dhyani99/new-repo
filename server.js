const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Serve your static files (HTML, CSS, JS)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Handle vote events
  socket.on("vote", (option) => {
    // Update the poll results
    const pollResults = {};
    for (const option in pollResults) {
      pollResults[option]++;
    }

    // Emit the updated poll results to all users
    io.emit("vote", pollResults);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
