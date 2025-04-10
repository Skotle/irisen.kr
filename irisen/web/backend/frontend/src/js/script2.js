
window.onload = function() {
    const userInfo = document.getElementById("user-info");
    
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
        userInfo.innerHTML = `
            <h1>로그인된 사용자 : 아이디</h1>
            <a href="#" id="logout-link" style="margin-left:20px">로그아웃</a>
        `;
        document.getElementById("logout-link").addEventListener("click", (event) => {
            event.preventDefault(); // 기본 동작 방지 (페이지 이동 X)
            localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
            window.location.reload(); // 페이지 새로고침
        });
    } 
    else {
        userInfo.innerHTML = '<a href="login">로그인</a>';
        console.log("로그인 되지 않음 from script2.js"); 
    }
};
// /board 전용