document.getElementById("toggleButton").addEventListener("click", function() {
  var image = document.getElementById("toggleImage");
  if (image.style.display === "none") {
      image.style.display = "block";
      this.textContent = "눈깔 펼치기/접기";
  } else {
      image.style.display = "none";
      this.textContent = "눈깔 펼치기/접기";
  }
});