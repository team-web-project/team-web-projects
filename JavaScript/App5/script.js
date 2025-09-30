const nameTextArea = document.getElementById("name");
const dateSelectArea = document.getElementById("date");
const timeSelectArea = document.getElementById("time");
const peopleCountArea = document.getElementById("person");
const registerButton = document.getElementById("register");

const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeBtn = document.getElementById("closeBtn");

const reservationList = document.getElementById("rList");

// errorModal.style.display = "none";

registerButton.addEventListener("click", () => {
  const name = nameTextArea.value;
  const date = dateSelectArea.value;
  const time = timeSelectArea.value;
  const people = peopleCountArea.value;

  const message = createMessage(name, date, time, people);
  if (message === "登録しました") {
    addList(name, date, time, people);
    printMessage(message);
  } else {
    printMessage(message);
  }
});
function createMessage(name, date, time, people) {
  //メッセージを選択する関数
  if (!name) return "名前を入力してください";
  if (!date) return "予約日を入力してください";
  if (!time) return "予約時間を入力してください";
  if (!people) return "人数を入力してください";
  if (people < 1) return "人数は1人以上にしてください";
  return "登録しました";
}
function addList(name, date, time, people) {
  //一覧に追加するための関数
  const row = document.createElement("tr");
  const rname = document.createElement("td");
  rname.textContent = name;
  const rdate = document.createElement("td");
  rdate.textContent = date;
  const rtime = document.createElement("td");
  rtime.textContent = time;
  const rpeople = document.createElement("td");
  rpeople.textContent = people;
  const rdelete = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.classList.add("deleteBtn");

  deleteButton.addEventListener("click", () => {
    row.remove();
  });
  rdelete.appendChild(deleteButton);
  row.appendChild(rname);
  row.appendChild(rdate);
  row.appendChild(rtime);
  row.appendChild(rpeople);
  row.appendChild(rdelete);
  reservationList.appendChild(row);

  nameTextArea.value = "";
  dateSelectArea.value = "";
  timeSelectArea.value = "";
  peopleCountArea.value = "";
}
function printMessage(msg) {
  //メッセージを出力する関数
  errorMessage.textContent = msg;
  errorModal.style.display = "flex";
}
closeBtn.addEventListener("click", () => {
  errorModal.style.display = "none";
});
