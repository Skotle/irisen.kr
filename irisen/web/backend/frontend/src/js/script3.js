window.onload = function() {
    const userInfo = document.getElementById("profile-space");
    
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
        userInfo.innerHTML = `
        `;
        document.getElementById("logout-link").addEventListener("click", (event) => {
            event.preventDefault(); // 기본 동작 방지 (페이지 이동 X)
            localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
            window.location.reload(); // 페이지 새로고침
        });
    } 
    else {
        userInfo.innerHTML = '';
        console.log("로그인 되지 않음 from script2.js"); 
    }
};