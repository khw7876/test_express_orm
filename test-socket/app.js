const express = require("express");
const Http = require("http");
const socketIo = require("socket.io");

const app = express();
const http = Http.createServer(app);

const io = socketIo(http, {
    cors : {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

http.listen(3000, () => {
    console.log("3000번 포트로 서버가 켜졌습니다");
});

io.on("connection", (socket) => {
    console.log("연결이 되었습니다.");

    // socket.seod를 하게 되면 customEvent로 가게 된다.
    socket.send("소켓 데이터 연결");

    socket.emit("customEventName", "새로운 이벤트")
});

