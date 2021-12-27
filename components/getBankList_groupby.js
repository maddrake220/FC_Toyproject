export const getBankList_groupby = (list, sortby = "date") => {
  const backList_groupby = [];
  const tempArr = [];
  let sumofPrice = 0;
  let isNewOne = "";
  list.map((value, index) => {
    if (index === 0) {
      isNewOne = sortby === "date" ? value.date : value.classify;
    }
    switch (sortby) {
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
    value.income === "in"
      ? (sumofPrice += value.price)
      : (sumofPrice -= value.price);

    tempArr.push({ ...value });
    if (index === list.length - 1) {
      backList_groupby.push([sumofPrice, ...tempArr]);
    }
  });
  return backList_groupby;
};
