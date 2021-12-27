import { getBankList_groupby } from "../../components/getBankList_groupby";
import { sliderX } from "../../components/sliderX";
const Url =
  "https://raw.githubusercontent.com/maddrake220/team_toyproject/main/bankData.json";
fetch(Url)
  .then((res) => res.json())
  .then((obj) => start(obj));

function start(bank) {
  const { bankList } = bank;

  const bankList_sortedbyDate = bankList.sort(function (a, b) {
    return Math.abs(new Date(a.date) - new Date(b.date));
  });
  const bankList_sortedbyClassify = _.sortBy(bankList, "classify");

  // 9월이면서 지출인 data만 filter
  const filterdList = bankList_sortedbyDate.filter((v) => {
    return v.income === "out" && v.date.slice(0, 7) === "2021-09";
  });

  const filterdList_classify = bankList_sortedbyClassify.filter((v) => {
    return v.income === "out" && v.date.slice(0, 7) === "2021-09";
  });
  const bankList_groupbyDate = getBankList_groupby(filterdList);

  const bankList_groupbyClassify = getBankList_groupby(
    filterdList_classify,
    "classify"
  );

  const sumofPriceList_classify = bankList_groupbyClassify.map((v) =>
    Math.abs(v[0])
  );
  // price list group by date
  const sumofPriceList = bankList_groupbyDate.map((v) => Math.abs(v[0]));
  // date list
  const uniqed = _.uniqBy(filterdList, "date");
  const uniqed_filtedList = uniqed.map((v) => v.date.slice(8, 10));
  // classify list
  const uniqed_classify = _.sortedUniqBy(filterdList_classify, "classify");
  const uniqed_filtedList_classify = uniqed_classify.map((v) => v.classify);

  const ctx = document.getElementById("ChartbyDate").getContext("2d");
  // chartbyDate
  new Chart(ctx, {
    data: {
      labels: uniqed_filtedList, // by date
      datasets: [
        {
          type: "bar",
          label: "# of Votes",
          data: sumofPriceList, // price sum
          backgroundColor: "green",
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        y: {
          max: 300000,
          min: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
  // chartPattern
  const ctxx = document.getElementById("ChartPattern").getContext("2d");

  new Chart(ctxx, {
    data: {
      labels: uniqed_filtedList_classify,
      datasets: [
        {
          type: "doughnut",
          data: sumofPriceList_classify,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  const ulEl = document.querySelector(".MonthReport-list");
  for (let i = 0; i < uniqed_filtedList_classify.length; i++) {
    const liEl = document.createElement("li");
    const span_name = document.createElement("span");
    const span_amount = document.createElement("span");
    const imgEl = document.createElement("img");
    span_name.innerText = uniqed_filtedList_classify[i];
    span_amount.innerText = `${sumofPriceList_classify[i]}원`;
    imgEl.src = `../../images/chartitem_${i + 1}.png`;
    imgEl.classList.add(`img-${i + 1}`);
    ulEl.appendChild(liEl);
    liEl.appendChild(imgEl);
    liEl.appendChild(span_name);
    liEl.appendChild(span_amount);
  }
}

const slider = document.querySelector(".chartjs");
sliderX(slider);
