const currentDate = document.querySelector(".month");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".fa-sharp");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // get first day of month
  const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(); // get last day of month
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // get last date of month
  const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // get last date of last month

  let liTag = "";

  // creating li for previous month's last days
  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  // creating li for current month's days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const isToday =
      i === date.getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
        ? "active"
        : "";

    const day = i >= 1 && i <= 9 ? "0" + i : i; // add 0 as prefic when number < 9
    liTag += `<li class="${isToday}">${day}</li>`;
  }

  // creating li for next month's first days
  // Sunday's index is 6
  for (let i = lastDayOfMonth; i < 6; i++) {
    let item = i - lastDayOfMonth + 1;
    item = item >= 1 && item <= 9 ? "0" + item : item; // add 0 as prefic when number < 9
    liTag += `<li class="inactive">${item}</li>`;
  }

  currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
  daysTag.innerHTML = liTag;
};

// initially render calender
renderCalendar();

prevNextIcon.forEach((icon) => {
  // add a click event listener to left and right arrow
  icon.addEventListener("click", () => {
    currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

    if (currentMonth < 0 || currentMonth > 11) {
      date = new Date(currentYear, currentMonth);
      // new Date(2022, 12) equals to Jan 2023 and new Date(2022, -1) equals to Dec 2021
      currentYear = date.getFullYear(); // updating current year
      currentMonth = date.getMonth(); // updating current month
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});
