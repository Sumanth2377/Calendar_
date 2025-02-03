const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month, lastDate).getDay();
  const prevLastDate = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = firstDay; i > 0; i--) {
    datesHtml += `<li class="inactive">${prevLastDate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let isToday =
      i === today.getDate() && month === today.getMonth() && year === today.getFullYear()
        ? "today"
        : "";
    datesHtml += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDay; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - lastDay + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev") {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
    } else {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }

    renderCalendar(currentMonth, currentYear);
  });
});

renderCalendar(currentMonth, currentYear);
