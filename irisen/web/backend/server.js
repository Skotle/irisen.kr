import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // .env 파일 로드




const __dirname = path.resolve();
const app = express();
const port = 3000;

app.use(express.static("frontend"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_key";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_key";
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m"; // 15분
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d"; // 7일

let refreshTokens = []; // Refresh Token 저장 배열

// 사용자 데이터 로드 함수
const getUsers = () => {
    const data = fs.readFileSync("DB.json");
    return JSON.parse(data).users;
};

// ✅ 로그인 API (Access & Refresh Token 발급)
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Access Token 생성
        const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });

        // Refresh Token 생성
        const refreshToken = jwt.sign({ id: user.id, username: user.username }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
        refreshTokens.push(refreshToken); // 저장

        res.json({ success: true, accessToken, refreshToken });
    } else {
        res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." });
    }
});

// ✅ JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ success: false, message: "토큰이 필요합니다." });

    jwt.verify(token.split(" ")[1], ACCESS_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "유효하지 않은 토큰입니다." });

        req.user = user; // 검증된 사용자 정보 저장
        next();
    });
};

// ✅ Access Token 재발급 (Refresh Token 사용)
app.post("/refresh", (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ success: false, message: "유효하지 않은 리프레시 토큰입니다." });
    }

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "리프레시 토큰이 만료되었습니다." });

        // 새 Access Token 발급
        const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });

        res.json({ success: true, accessToken });
    });
});

// ✅ 로그아웃 (Refresh Token 삭제)
app.post("/logout", (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.json({ success: true, message: "로그아웃 성공" });
});

// ✅ 보호된 API (인증된 사용자만 접근 가능)
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ success: true, message: "인증된 사용자만 접근 가능합니다.", user: req.user });
});

// 일반 경로 (2)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/home.html");
});

app.get("/board", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/board.html");
});
//ㄴ
app.get("/board/ID", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/board.html");
});
app.get("/board/write/ID", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/writeform.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/sign.html");
});
app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/profile.html");
});
app.get("/profile/edit", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/profile_edit.html");
});


///

app.get("/profile/:username", (req, res) => {
    const { username } = req.params;
    const users = getUsers();
    const user = users.find(u => u.username === username);

    if (user) {
        const profile = {
            name: user.isPublic?.name ? user.name : "비공개",
            bio: user.isPublic?.bio ? user.bio : "비공개",
            profileImage: user.isPublic?.profileImage ? user.profileImage : "default.jpg"
        };

        res.json({ success: true, profile });
    } else {
        res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }
});



// 게시글 API
app.get("/getPosts", async (req, res) => {
    await db.read();
    res.json(db.data.posts);
});

app.post("/addPost", async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ success: false, message: "제목과 내용을 입력해주세요." });
    }

    await db.read();
    const newPost = { id: Date.now(), title, content };
    db.data.posts.push(newPost);
    await db.write();

    res.json({ success: true, post: newPost });
});





// ✅ 서버 실행 (5)
app.listen(port, () => {
    console.log(`✅ 서버 실행: http://localhost:${port}`);
});
