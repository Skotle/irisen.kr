import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config(); // .env 파일 로드

const __dirname = path.resolve();
const app = express();
const port = 8080;

// console.log(__dirname);

app.use(express.static("frontend"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";

// 사용자 데이터 로드 함수
const getUsers = () => {
    const data = fs.readFileSync("DB.json");
    return JSON.parse(data).users;
};

// ✅ 로그인 API (JWT 발급)
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // JWT 생성
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        res.json({ success: true, message: "Success", token });
    } else {
        res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." });
    }
});

// ✅ JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ success: false, message: "토큰이 필요합니다." });

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "유효하지 않은 토큰입니다." });

        req.user = user; // 검증된 사용자 정보 저장
        next();
    });
};

// ✅ 보호된 API (인증된 사용자만 접근 가능)
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ success: true, message: "인증된 사용자만 접근 가능합니다.", user: req.user });
});

// ✅ HTML 페이지 제공
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/home.html");
});

app.get("/board/all", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/board.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/sign.html");
});

// ✅ 서버 실행
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
