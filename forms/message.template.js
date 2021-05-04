const moment = require("moment");

function messageTemplate(username, text) {
  return {
    username,
    text,
    time: moment().format("hh:mm"),
  };
}

module.exports = messageTemplate;
