import jwtDecode from "jwt-decode";
window.onload = function() {
    const userInfo = document.getElementById("user-info");
    
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        userInfo.innerHTML = `
            <h1>로그인된 사용자 : ${decodedToken.username}</h1>
            <a href="#" id="logout-link">로그아웃</a>
        `;
    } 
    else {
        userInfo.innerHTML = '<a href="login">로그인</a>';
        console.log("로그인 되지 않음 from script2.js"); 
    }
};
