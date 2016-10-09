
function isWeekend(index, condition) {
  if (index >= condition) return true;
}

function afterDays(daysInMonth, preDays) {
  var
    days = daysInMonth + preDays,
    sumDays = days;

  while (true) {
    if (days%7 === 0 ) break;
    days++;
  }

  return days - sumDays;
};

function getLastDayOfMonth(year, month) {
  var date = new Date(year, month + 1, 0);
  return date.getDate();
}

function pullDays(date) {
  return (date.getDay() === 0) ? 7 : date.getDay();
}

function createTasksList(task, className) {
  var
    doc = document,
    div = doc.createElement("div"),
    ul = doc.createElement("ul"),
    close = doc.createElement("a");

  close.setAttribute("href", "#");
  close.classList.add(className + "__close");
  close.innerHTML = "&#10005;";


  div.classList.add(className);
  ul.classList.add(className + "__list");

  for (var i = 0; i < task.length; i++) {
    var li = doc.createElement("li");

    li.classList.add(className + "__item");
    li.innerHTML = task[i];
    ul.appendChild(li);
  }

  div.appendChild(ul);
  div.appendChild(close);

  close.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation()

    // console.log(this.parentElement);
    this.parentNode.classList.remove("open");
  });
  return div;
}

var tasks = [
  [2016, 7, 1, ["walk", "read", "drink"]],
  [2016, 7, 3, ["sleep", "play"]],
  [2016, 7, 0, ["sleep", "play"]],
  [2016, 7, 29, ["sleep", "play"]]
]

function createCalendar(id, year, month, tasksData) {
  var
    doc = document,
    elem = doc.getElementById(id),
    date = new Date(year, month),
    firstDayOfWeek = pullDays(date),
    currentDay = (new Date().getFullYear() === year && new Date().getMonth() === month) ? new Date().getDate() : null,
    daysOfWeek = ["Пт", "Вт", "Ср", "Чт", "Пн", "Сб", "Вс"],
    table = doc.createElement("table"),
    tBody = doc.createElement("tbody"),
    tHead = doc.createElement("thead"),
    thRow = doc.createElement("tr"),
    daysInMonth = getLastDayOfMonth(year, month),
    preDays = (firstDayOfWeek === 0) ? 0 : firstDayOfWeek - 1,
    afterD = afterDays(daysInMonth, preDays),
    allDays = preDays + daysInMonth + afterD,
    rows = Math.ceil(allDays / 7),
    store = {},
    options = {
      year: 'numeric',
      month: 'long',
    },
    titile = "<caption class='calendar__title'>"
              + "<span class='calendar__span'>" + date.toLocaleString("ru", options) + "</span>"
            "</caption>";

    tasksData = tasksData.filter(function(item) {
      return item[0] === year && item[1] == month;
    });

    for (var l = 0; l < tasksData.length; l++) {
      store[tasksData[l][2]] = tasksData[l][3];
    }

    table.className = "calendar";

    for (var i = 0; i < daysOfWeek.length; i++) {
      var th = document.createElement("th");

      th.innerHTML = daysOfWeek[i];
      if (isWeekend(i, 5)) th.className = "weekend";
      thRow.appendChild(th);
    }

    tHead.appendChild(thRow);

    var
      j = -preDays + 1,
      end = 8 - preDays,
      dayCount = 0;

    for (var k = 0; k < rows; k++) {
      var
        tr = document.createElement("tr"),
        count = 0;

      for (j; j < end; j++) {
        var td = doc.createElement("td");

        count++;

        if (j > 0 && j <= daysInMonth) {
          if (currentDay && currentDay - 1 === dayCount) td.classList.add("current-day");

          td.innerHTML = j;

          if (store[dayCount]) {
            var a = doc.createElement("a");
            a.setAttribute("href", "#");
            a.classList.add("clientTasks");
            a.innerHTML = store[dayCount].length;
            td.appendChild(a);
            td.appendChild(createTasksList(store[dayCount], "tasks-list"));
            td.addEventListener("click", function(e) {
              e.preventDefault();
              // console.log(this)
              this.querySelector(".tasks-list").classList.add("open");
            });
          }

          dayCount++;

        } else {
          td.classList.add("unactive");
        }
        if (isWeekend(count, 6)) td.classList.add("weekend");
        tr.appendChild(td);
      }
      tBody.appendChild(tr);

      end = end + 7;
    }

    table.innerHTML = titile;
    table.appendChild(tHead);
    table.appendChild(tBody);

  elem.appendChild(table);
}

createCalendar('calendar', 2016, 7, tasks);