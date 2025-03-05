import jwt from 'jwt-decode';  // jwt-decode 라이브러리 임포트

window.onload = function() {
    const userInfo = document.getElementById("user-info");
    
    // 예시로 localStorage에서 아이디를 가져오는 코드
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        // 토큰이 있으면 로그인 상태
        userInfo.innerHTML = "로그인된 사용자: 아이디"; // 로그인된 아이디를 표시
    } else {
        // 토큰이 없으면 로그인 버튼 표시
        userInfo.innerHTML = '<a href="login">로그인</a>';
    }
};