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
  return !user
    ? ""
    : user.name && user.surname
    ? user.name + " " + user.surname
    : user.username;
}

const buttonPrimaryClasses =
  "flex justify-center rounded-md border border-transparent bg-black px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600";

const buttonSecondaryClasses =
  "flex justify-center rounded-md border border-zinc-800 px-3 py-2 text-lg font-semibold leading-6 text-zinc-800 shadow-sm hover:bg-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600";

export {
  formatDate,
  formatUserName,
  buttonPrimaryClasses,
  buttonSecondaryClasses,
};
