// Formattatore data dei messaggi
const formatDate = (currentDate) => {
  currentDate = new Date(currentDate);
  let date = ("0" + currentDate.getDate()).slice(-2);
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let year = currentDate.getFullYear();
  let messageDate = date + "/" + month + "/" + year;
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
  "inline-flex justify-center rounded-md border border-transparent bg-black px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-zinc-800";

const buttonSecondaryClasses =
  "inline-flex justify-center rounded-md border border-black px-3 py-2 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-zinc-100";

export {
  formatDate,
  formatUserName,
  buttonPrimaryClasses,
  buttonSecondaryClasses,
};
