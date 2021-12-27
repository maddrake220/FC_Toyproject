import { sliderX } from "./components/sliderX";
import { getBankList_groupby } from "./components/getBankList_groupby";

const saving_name = document.querySelector(".saving-name");
const saving_name2 = document.querySelector(".saving-name-2");
const saved_money = document.querySelector(".saved-money");
const saved_money2 = document.querySelector(".saved-money-2");
const account_name = document.querySelector(".account-name");
const progressingBar1 = document.querySelector(".saving-list .progressing-1");
const progressingBar2 = document.querySelector(".saving-list .progressing-2");
const transConEl = document.querySelector(".transaction-container");
const avatar = document.getElementById("avatarimg");

progressingBar1.style = "background-color: #ff5f00;";
progressingBar2.style = "background-color: #feb700";

const Url =
  "https://raw.githubusercontent.com/maddrake220/team_toyproject/main/bankData.json";
fetch(Url)
  .then((res) => res.json())
  .then((obj) => start(obj))
  .catch((error) => console.log(error));

function start(bank) {
  const { bankList } = bank;
  const bankList_sortedbyDate = bankList.sort(function (a, b) {
    return Math.abs(new Date(a.date) - new Date(b.date));
  });

  bankList_sortedbyDate.reverse();
  const bankList_groubyDate = getBankList_groupby(bankList_sortedbyDate);

  // 날짜 관련
  const nowDate = new Date();
  const today = nowDate.toISOString().split("T")[0];
  const yesterdayDate = new Date(nowDate.setDate(nowDate.getDate() - 1));
  const yesterday = yesterdayDate.toISOString().split("T")[0];

  // 계좌 입출금 내역 부분
  bankList_groubyDate.map((v, i) => {
    const divEl = document.createElement("div");
    const h3El = document.createElement("h3");
    const span = document.createElement("span");
    const ulEl = document.createElement("ul");
    ulEl.classList.add(`ul-${i}`);
    h3El.innerText =
      today === v[1].date
        ? "오늘"
        : yesterday === v[1].date
        ? "어제"
        : v[1].date;
    span.innerText = v[0] <= 0 ? `${Math.abs(v[0])}원 지출` : `${v[0]}원 수입`;
    transConEl.appendChild(divEl);
    divEl.appendChild(h3El);
    divEl.appendChild(span);
    transConEl.appendChild(ulEl);
    v.map((value, index) => {
      if (index !== 0) {
        const liEl = document.createElement("li");
        const ul = transConEl.querySelector(`.ul-${i}`);
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");

        span1.innerText = value.history;
        span2.innerText = value.price;
        if (value.income === "in") {
          span2.classList.add("orange");
        }

        ul.appendChild(liEl);
        liEl.appendChild(span1);
        liEl.appendChild(span2);
      }
    });
  });
}
// sliderX
const slider = document.querySelector(".saving-list");
sliderX(slider);

// swiper
const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
});
swiper.on("slideChange", function () {
  savingChange(this.activeIndex);
});

const savingChange = (index) => {
  switch (index) {
    case 0:
      account_name.innerText = "생활비";
      saving_name.innerText = "여행가자!";
      saving_name2.innerText = "냉장고사기";
      saved_money.innerText = "842,200원";
      saved_money2.innerText = "142,200원";
      progressingBar1.style = "background-color: #ff5f00;";
      progressingBar2.style = "background-color: #feb700";
      avatar.src =
        "https://github.com/maddrake220/FC_Toyproject/blob/main/images/avatar.png?raw=true";
      break;
    case 1:
      account_name.innerText = "의민이 계좌";
      saving_name.innerText = "게임기^^";
      saving_name2.innerText = "기부실천!";
      saved_money.innerText = "142,200원";
      saved_money2.innerText = "82,200원";
      progressingBar1.style = "background-color: #55ACEE;";
      progressingBar2.style = "background-color: #005F59";
      avatar.src =
        "https://raw.githubusercontent.com/maddrake220/FC_Toyproject/main/images/avatar2.png";
      break;
    case 2:
      account_name.innerText = "할머니 계좌";
      saving_name.innerText = "딸 냉장고";
      saving_name2.innerText = "아들 컴퓨터";
      saved_money.innerText = "545,200원";
      saved_money2.innerText = "432,00원";
      progressingBar1.style = "background-color: #0A73C3;";
      progressingBar2.style = "background-color: #EEBA00";
      avatar.src =
        "https://github.com/maddrake220/FC_Toyproject/blob/main/images/avatar3.png?raw=true";
      break;
    default:
  }
};

// tran-container toggle하는 부분
const horizontalBarToggle = document.querySelector(".horizontal-bar");
const savingContainer = document.querySelector(".saving-container");
let isSpread = false;
horizontalBarToggle.addEventListener("click", () => {
  isSpread = !isSpread;
  if (isSpread) {
    savingContainer.classList.add("saving-container-spread");
    transConEl.style.height = "580px";
  } else {
    savingContainer.classList.remove("saving-container-spread");
    setTimeout(() => {
      transConEl.style.height = "340px";
    }, 1000);
  }
});
