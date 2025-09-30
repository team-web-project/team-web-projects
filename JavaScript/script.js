const fortune = document.getElementById("draw");
const result = document.getElementById("result");

const fortuneslip = ["大吉", "中吉", "小吉", "吉", "末吉", "半吉", "凶"];
fortune.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 7);
  result.textContent = fortuneslip[random];
});
