const currentDate = document.querySelector(".month"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".fa-sharp ");

let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


let renderCalender = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(), // get first day of month
    lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(), // get last date of month
    lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(), // get last day of month
    lastDateOfLastMonth = new Date(currentYear, currentMonth , 0).getDate(); // get last date of last month

    let liTag = " ";

    // creating li for previous months last days
    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth -i + 1}</li>`;
    }

    // creating li for current months days
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active" : "";
        if(i>=1 && i<=9)
            i = "0"+i;
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // creating li for previous months first days
    // sunday's index is 6
    for (let i = lastDayOfMonth; i < 6; i++) {
        let item = i - lastDayOfMonth + 1;
        if(item>=1 && item<=9)
            item = "0"+item;
        liTag += `<li class="inactive">${item}</li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
}
renderCalender();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currentMonth = icon.id == "prev" ? currentMonth - 1 : currentMonth + 1;

        if(currentMonth < 0 || currentMonth >11)
        {
            date = new Date(currentYear, currentMonth);
            // new Date(2022, 12) equals to jan 2023 and new Date(2022, -1) equals to dec 2021
            currentYear = date.getFullYear(); // updating current year 
            currentMonth = date.getMonth(); // updating current month
        }
        else
        {
            date = new Date();
        }

        renderCalender();
    })
});