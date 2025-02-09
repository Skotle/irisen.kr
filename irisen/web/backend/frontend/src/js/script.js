document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(users => {
          if (users.length > 0) {
              document.getElementById("message").innerText = "로그인 성공!";
              // 로그인 성공 후 페이지 이동 예시
              // window.location.href = "dashboard.html";
          } else {
              document.getElementById("message").innerText = "아이디 또는 비밀번호가 틀렸습니다.";
          }
      })
      .catch(error => console.error("Error:", error));
});
