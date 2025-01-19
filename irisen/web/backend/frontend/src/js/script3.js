document.getElementById("toggleButton").addEventListener("click", function() {
    var content = document.getElementById("hiddenContent");
    if (content.style.display === "none") {
        content.style.display = "block";
        this.textContent = "펼치기/접기"; // 버튼 텍스트 변경
    } else {
        content.style.display = "none";
        this.textContent = "펼치기/접기"; // 버튼 텍스트 다시 변경
    }
});