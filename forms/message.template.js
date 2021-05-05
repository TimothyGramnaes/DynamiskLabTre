const moment = require("moment");

function messageTemplate(username, text) {
  return {
    username,
    text,
    time: moment().format("HH:mm"),
  };
}

module.exports = messageTemplate;
