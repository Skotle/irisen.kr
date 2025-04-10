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
