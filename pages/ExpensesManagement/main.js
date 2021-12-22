const Url = "../../common/bank.json";
fetch(Url)
  .then((res) => res.json())
  .then((obj) => start(obj));

const getBankList_groupbyDate = (list) => {
  const backList_groupbyDate = [];
  const tempArr = [];
  let sumofPrice = 0;
  list.map((value, index) => {
    if (index === 0) {
      isNewDate = value.date;
    }
    if (value.date !== isNewDate) {
      backList_groupbyDate.push([sumofPrice, ...tempArr]);
      isNewDate = value.date;
      tempArr.length = 0;
      sumofPrice = 0;
    }
    sumofPrice += value.price;
    tempArr.push({ ...value });
    if (index === list.length - 1) {
      backList_groupbyDate.push([sumofPrice, ...tempArr]);
    }
  });
  return backList_groupbyDate;
};
function start(bank) {
  const { bankList } = bank;

  const bankList_sortedbyDate = bankList.sort(function (a, b) {
    return Math.abs(new Date(a.date) - new Date(b.date));
  });

  const filterdList = bankList_sortedbyDate.filter((v) => {
    return v.income === "out" && v.date.slice(0, 7) === "2021-09";
  });
  // price list group by date
  const bankList_groupbyDate = getBankList_groupbyDate(filterdList);
  const sumofPriceList = bankList_groupbyDate.map((v) => v[0]);
  // date list
  const uniqed = _.uniqBy(filterdList, "date");
  const uniqed_filtedList = uniqed.map((v) => v.date);
  const ctx = document.getElementById("myChart").getContext("2d");
  // chart
  const myChart = new Chart(ctx, {
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
          max: 500000,
          min: 0,
          ticks: {
            stepSize: 0.5,
          },
        },
      },
    },
  });
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
