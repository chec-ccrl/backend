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
};
