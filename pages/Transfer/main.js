const seletedItem = document.querySelectorAll(".account-item");
const scContainer = document.querySelector(".search-account-container");
seletedItem.forEach((v) =>
  v.addEventListener("click", () => {
    console.log(v);
    const id = v.getAttribute("id");
    scContainer.innerHTML = `
    <div id=${id} class="account-item book-marked">${v.innerHTML}</div>
    <div class="expense-input-container"><input ></input><span>원</span></div>
    <div class="current-account-balance">생활비 계좌 : <span>1,752,900</span> 에서</div>
    <div class="number-keypad">
      <div value=1><span>1</span></div>
      <div value=2><span>2</span></div>
      <div value=3><span>3</span></div>
      <div value=4><span>4</span></div>
      <div value=5><span>5</span></div>
      <div value=6><span>6</span></div>
      <div value=7><span>7</span></div>
      <div value=8><span>8</span></div>
      <div value=9><span>9</span></div>
      <div value=0><span>0</span></div>
      <div value=00><span>00</span></div>
      <div value="backspace"><span class="backspace"></span></div>
    </div>
    <button class="transfer-confirm">다음</button>
  `;
    const bookmark = document.querySelectorAll(".bookmark");
    bookmark.forEach((v) => (v.style.display = "none"));
    const numberkeypad = document.querySelectorAll(".number-keypad div");
    const transferConfirm = document.querySelector(".transfer-confirm");
    const expenseInputContainer = document.querySelector(
      ".expense-input-container input"
    );
    let str = "";
    numberkeypad.forEach((v) =>
      v.addEventListener("click", () => {
        const value = v.getAttribute("value");
        if (value === "backspace") {
          str = str.slice(0, -1);
          expenseInputContainer.setAttribute("value", str);
          if (str === "") {
            transferConfirm.style.display = "none";
          }
        } else {
          transferConfirm.style.display = "block";
          str += `${value}`;
          expenseInputContainer.setAttribute("value", str);
        }
      })
    );
  })
);
