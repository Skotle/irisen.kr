window.onload = function() {
    const userInfo = document.getElementById("user-info");
    
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {    
        userInfo.innerHTML = "<p>로그인된 사용자 : 아이디</p>";

    } 
    else {
        userInfo.innerHTML = '<a href="login">로그인</a>';
        console.log("로그인 되지 않음 from script2.js"); 
    }
};