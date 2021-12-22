const Url = "../../common/bank.json";
fetch(Url)
  .then((res) => res.json())
  .then((obj) => start(obj));

const getBankList_groupbyDate = (list, sortby = "date") => {
  const backList_groupby = [];
  const tempArr = [];
  let sumofPrice = 0;
  list.map((value, index) => {
    if (index === 0) {
      isNewOne = sortby === "date" ? value.date : value.classify;
    }
    switch (sortby) {
      case "date":
        if (value.date !== isNewOne) {
          backList_groupby.push([sumofPrice, ...tempArr]);
          isNewOne = value.date;
          tempArr.length = 0;
          sumofPrice = 0;
        }
        break;
      case "classify":
        if (value.classify !== isNewOne) {
          backList_groupby.push([sumofPrice, ...tempArr]);
          isNewOne = value.classify;
          tempArr.length = 0;
          sumofPrice = 0;
        }
        break;
      default:
        if (value.date !== isNewOne) {
          backList_groupby.push([sumofPrice, ...tempArr]);
          isNewOne = sortby === "date" ? value.date : value.classify;
          tempArr.length = 0;
          sumofPrice = 0;
        }
    }

    sumofPrice += value.price;
    tempArr.push({ ...value });
    if (index === list.length - 1) {
      backList_groupby.push([sumofPrice, ...tempArr]);
    }
  });
  return backList_groupby;
};
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
  const bankList_groupbyDate = getBankList_groupbyDate(filterdList);

  const bankList_groupbyClassify = getBankList_groupbyDate(
    filterdList_classify,
    "classify"
  );

  const sumofPriceList_classify = bankList_groupbyClassify.map((v) => v[0]);
  // price list group by date
  const sumofPriceList = bankList_groupbyDate.map((v) => v[0]);
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
    ulEl.appendChild(liEl);

    liEl.appendChild(imgEl);
    liEl.appendChild(span_name);
    liEl.appendChild(span_amount);
  }
}

const slider = document.querySelector(".chartjs");
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
