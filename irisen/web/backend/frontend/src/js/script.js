async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        //const response = await fetch("https://irisen-com.onrender.com/login", {
        const response = await fetch(`http://localhost:3000/login`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // 로그인 성공 시
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            // 로그인 성공 메시지 출력
            message.style.color = "green";
            message.innerHTML = "로그인 성공!";

            // 로그인 후 다른 페이지로 이동
            window.location.href = "/"; // 예: /home 페이지로 이동
        } else {
            message.style.color = "red";
            message.innerHTML = data.message;
        }
    } catch (error) {
        console.error("로그인 오류:", error);
        message.style.color = "red";
        message.innerHTML = "서버와 연결할 수 없습니다.";
    }
}
/*
let isLogin = true;

function toggleForm() {
    const title = document.getElementById("form-title");
    const actionButton = document.getElementById("action-button");
    const toggleLink = document.getElementById("toggle-link");
    const message = document.getElementById("message");

    isLogin = !isLogin;

    if (isLogin) {
        title.textContent = "로그인";
        actionButton.textContent = "로그인";
        actionButton.setAttribute("onclick", "login()");
        toggleLink.textContent = "회원가입";
        message.textContent = "";
    } else {
        title.textContent = "회원가입";
        actionButton.textContent = "가입하기";
        actionButton.setAttribute("onclick", "signup()");
        toggleLink.textContent = "로그인";
        message.textContent = "";
    }
}

async function signup() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    // 유효성 검사
    if (!username || !password) {
        message.textContent = "아이디와 비밀번호를 모두 입력해주세요.";
        return;
    }

    // 중복 검사
    const existing = await fetch(`http://localhost:3000/users?username=${username}`);
    const users = await existing.json();
    if (users.length > 0) {
        message.style.color = "red";
        message.innerHTML = "이미 존재하는 아이디입니다.";
        return;
    }

    // 저장
    const response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            pass: password
        })
    });

    if (response.ok) {
        message.style.color = "green";
        message.innerHTML = "가입 성공!";
        toggleForm();
    } else {
        message.style.color = "red";
        message.innerHTML = "가입 실패";
    }
}
async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    const response = await fetch(`http://localhost:3000/users?username=${username}&pass=${password}`);
    const users = await response.json();

    if (users.length > 0) {
        message.style.color = "green";
        message.innerHTML = "로그인 성공!";
        // localStorage 등 활용 가능
        window.location.href = "/";
    } else {
        message.style.color = "red";
        message.innerHTML = "아이디 또는 비밀번호가 틀렸습니다.";
    }
}
*/