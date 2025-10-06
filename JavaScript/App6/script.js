const getMessage = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const selectTo = document.getElementById("selectTo");

const chatArea = document.getElementById("chatArea");
const sendName = document.getElementById("sendName");
const getToAddress = document.getElementById("messageTo");
const addButton = document.getElementById("addButton");

const messageName = {};
const messageHistory = {};

let isComposing = false; // 変換中かどうか
let currentUser;

addButton.addEventListener("click", () => {
  const address = getToAddress.value;
  if (!address) {
    //宛先が未指定の場合何も返さない
    return;
  }
  addAddress(address);
});

function addAddress(address) {
  const container = document.createElement("div");
  const addressTag = document.createElement("button");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  addressTag.textContent = address;
  deleteButton.textContent = "削除";
  editButton.textContent = "編集";
  addressTag.classList.add("addressTag");
  deleteButton.classList.add("deleteBtn");
  editButton.classList.add("editBtn");

  if (!messageHistory[address]) {
    messageHistory[address] = [];
    container.appendChild(addressTag);
    container.appendChild(deleteButton);
    container.appendChild(editButton);
    selectTo.appendChild(container);
  }
  //   友達の選択ボタン
  addressTag.addEventListener("click", () => {
    sendName.textContent = address;
    currentUser = address;
    reload(currentUser);
  });
  //   トーク&友達削除ボタン
  deleteButton.addEventListener("click", () => {
    delete messageHistory[address];
    container.remove();
  });
  editButton.addEventListener("click", () => {
    getToAddress.value = address;
    addButton.onclick = () => {
      const newName = getToAddress.value;
      if (messageHistory[address]) {
        return;
      }
      if (newName && newName !== address) {
        messageHistory[newName] = messageHistory[address];
        delete messageHistory[address];
        addressTag.textContent = newName;
      }
    };
  });
}

// ユーザーが送信ボタンを押した時の処理
sendButton.addEventListener("click", async () => {
  const message = getMessage.value;
  const toUser = sendName.textContent;
  if (!message || !toUser) {
    return;
  }

  addMessage(message, toUser);
  await wait(2);
  aiMessage(toUser);
});

// 履歴から再読み込みする処理
function reload(current) {
  chatArea.innerHTML = "";

  if (!messageHistory[current] || messageHistory[current].length === 0) {
    return; //履歴がない時は終了
  }

  messageHistory[current].forEach((msg) => {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = msg.text;

    if (msg.sender === "me") {
      messageDiv.classList.add("my-message");
    } else {
      messageDiv.classList.add("ai-message");
    }

    chatArea.appendChild(messageDiv);
  });

  chatArea.scrollTop = chatArea.scrollTop;
}

// メッセージを出力する処理
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.classList.add("my-message");

  messageHistory[sender].push({ sender: "me", text: message });

  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight; //
  getMessage.value = "";
  getMessage.focus(); //フォーカスを入力欄に戻す
}

chatArea.scrollTo({
  top: chatArea.scrollHeight,
  behavior: "smooth",
});

// ランダムでメッセージを出力する処理
function aiMessage(sender) {
  const randomMessage = [
    "OK!",
    "了解",
    "行けたら行く",
    "なるほど！",
    "帰ります",
    "いってきます",
    "しゃーなし",
    "はーい",
    "そそ",
    "よろしく",
  ];
  const random = Math.floor(Math.random() * 9);
  const messageDiv = document.createElement("div");
  messageDiv.textContent = randomMessage[random];
  messageHistory[sender].push({ sender: "ai", text: randomMessage[random] });
  messageDiv.classList.add("ai-message");

  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight; //一番下へスクロールする
}

// Enterキーでメッセージ時を送信する処理
getMessage.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && !isComposing) {
    sendButton.click();
    getMessage.focus(); //フォーカスを入力欄に戻す
    getMessage.value = "";
  }
});

// 変換中か否かを判断する処理
getMessage.addEventListener("compositionstart", () => {
  isComposing = true; // 変換開始
});

// 変換中か否かを判断する処理
getMessage.addEventListener("compositionend", () => {
  isComposing = false; // 変換終了
});

// second秒処理を止める処理
async function wait(second) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * second));
}
