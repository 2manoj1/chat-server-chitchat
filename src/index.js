const app = require("express")();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const port = process.env.PORT || 3001;

app.use(cors())
app.get("/", (req, res) => {
    res.json({ hi: "hello manoj" });
});

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log(msg);
        io.emit("chat message", msg);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running`);
});
