const uuidv4 = require("uuid/v4");

module.exports = {
  generateId: () => uuidv4(),
  alphaNumericId: (length) => {
    let result = "";
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },
  getValueOfPercentage: (value, percentage) => (value * percentage) / 100,
  median: (arr) => {
    const mid = Math.floor(arr.length / 2);
    const sortedArr = arr.sort((a, b) => a - b);

    if (arr.length % 2 === 0) {
      return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    } else {
      return sortedArr[mid];
    }
  },
};
