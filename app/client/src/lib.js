// Formattatore data dei messaggi
const formatDate = (currentDate) => {
  currentDate = new Date(currentDate);
  let date = ("0" + currentDate.getDate()).slice(-2);
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let messageDate =
    date + "/" + month + "/" + year + " " + hours + ":" + minutes;
  return messageDate;
};

function formatUserName(user) {
  return user.name && user.surname
    ? user.name + " " + user.surname
    : user.username;
}

export { formatDate, formatUserName };

// const { formatDate } = require("../../client/lib");
