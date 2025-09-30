const inputTextArea = document.getElementById("inputarea");
const deadLine = document.getElementById("deadLine");
const status = document.getElementById("status");
const overview = document.getElementById("overview");

const addButton = document.getElementById("addBtn");
const deleteButton = document.getElementById("delete");
const content = document.getElementById("taskList");

addButton.addEventListener("click", () => {
  const taskText = inputTextArea.value;
  const Deadline = deadLine.value;
  const Status = status.value;
  const Overview = overview.value;

  const li = document.createElement("tr");
  li.innerHTML = `
  <td>${taskText}</td>
  <td>${Deadline}</td>
  <td>${Status}</td>
  <td>${Overview}</td>
  <td><button class="deleteBtn">削除</button></td>
  <td><button class="editBtn">編集</button></td>
`;
  document.getElementById("taskList").appendChild(li);

  inputTextArea.value = "";
  deadLine.value = "";
  status.value = "";
  overview.value = "";

  li.querySelector(".deleteBtn").addEventListener("click", () => {
    li.remove();
  });
});
