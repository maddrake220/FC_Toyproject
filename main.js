const saving_name = document.querySelector(".saving-name");
const saving_name2 = document.querySelector(".saving-name-2");
const saved_money = document.querySelector(".saved-money");
const saved_money2 = document.querySelector(".saved-money-2");
const account_name = document.querySelector(".account-name");
const progressBar1 = document.querySelector(".saving-list .progress-1");
const progressingBar1 = document.querySelector(".saving-list .progressing-1");
const progressBar2 = document.querySelector(".saving-list .progress-2");
const progressingBar2 = document.querySelector(".saving-list .progressing-2");
const transConEl = document.querySelector(".transaction-container");
const avatar = document.getElementById("avatarimg");

progressingBar1.style = "background-color: #ff5f00;";
progressingBar2.style = "background-color: #feb700";

const Url = "./bank.json";
fetch(Url)
  .then((res) => res.json())
  .then((obj) => start(obj));

function start(bank) {
  const { bankList } = bank;

  const bankList_sortedbyDate = bankList.sort(function (a, b) {
    return Math.abs(new Date(a.date) - new Date(b.date));
  });
  bankList_sortedbyDate.reverse();
  let compareDate = "";
  let ulNum = 0;
  let priceSum = 0;
  let spanNum = 0;

  // 날짜 관련
  const nowDate = new Date();
  const today = nowDate.toISOString().split("T")[0];
  const yesterdayDate = new Date(nowDate.setDate(nowDate.getDate() - 1));
  const yesterday = yesterdayDate.toISOString().split("T")[0];

  // 은행 입출금 내역
  bankList_sortedbyDate.map((v, i) => {
    if (v.date !== compareDate) {
      const divEl = document.createElement("div");
      const h3El = document.createElement("h3");
      const span = document.createElement("span");
      spanNum++;
      span.classList.add(`span-${spanNum}`);
      const ulEl = document.createElement("ul");
      ulNum++;
      ulEl.classList.add(`ul-${ulNum}`);
      h3El.innerText =
        today === v.date ? "오늘" : yesterday === v.date ? "어제" : v.date;
      if (ulNum !== 1) {
        const span = document.querySelector(`.span-${spanNum - 1}`);
        span.innerText =
          priceSum <= 0 ? `${Math.abs(priceSum)}원 지출` : `${priceSum}원 수입`;
      }
      transConEl.appendChild(divEl);
      divEl.appendChild(h3El);
      divEl.appendChild(span);
      transConEl.appendChild(ulEl);

      priceSum = 0;
    }

    const liEl = document.createElement("li");
    const ul = transConEl.querySelector(`.ul-${ulNum}`);
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    span1.innerText = v.history;
    span2.innerText = v.price;
    if (v.income === "in") {
      span2.classList.add("orange");
      priceSum += v.price;
    } else if (v.income === "out") {
      priceSum -= v.price;
    }

    ul.appendChild(liEl);
    liEl.appendChild(span1);
    liEl.appendChild(span2);
    if (bankList_sortedbyDate.length - 1 === i) {
      const lastSpan = document.querySelector(`.span-${spanNum}`);
      lastSpan.innerText =
        priceSum <= 0 ? `${Math.abs(priceSum)}원 지출` : `${priceSum}원 수입`;
    }
    compareDate = v.date;
  });
}

const slider = document.querySelector(".saving-list");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});

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
      avatar.src = "./images/avatar.png";
      break;
    case 1:
      account_name.innerText = "의민이 계좌";
      saving_name.innerText = "게임기^^";
      saving_name2.innerText = "기부실천!";
      saved_money.innerText = "142,200원";
      saved_money2.innerText = "82,200원";
      progressingBar1.style = "background-color: #55ACEE;";
      progressingBar2.style = "background-color: #005F59";
      avatar.src = "./images/avatar2.png";
      break;
    case 2:
      account_name.innerText = "할머니 계좌";
      saving_name.innerText = "딸 냉장고";
      saving_name2.innerText = "아들 컴퓨터";
      saved_money.innerText = "545,200원";
      saved_money2.innerText = "432,00원";
      progressingBar1.style = "background-color: #0A73C3;";
      progressingBar2.style = "background-color: #EEBA00";
      avatar.src = "./images/avatar3.png";
      break;
    default:
  }
};
