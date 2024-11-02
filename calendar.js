console.log("calendar.js загружен и выполняется");

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywJ7rlB3zPYSbDGeNlb80XcPJMEYFNCQ8sSeuzbz-PtZ_ct_yg4vNRBROXOv89QQa8rA/exec';

async function fetchEvents() {
    console.log("Запуск fetchEvents");
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        console.log("Данные событий загружены:", data.GoogleSheetData);
        
        return data.GoogleSheetData;
    } catch (error) {
        console.error("Ошибка при загрузке событий:", error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
 console.log("DOM загружен и обработчик событий запущен");

 // URL для API Google Sheets
 const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbwJ7rlB3zPYSbDGeNlb80XcPJMEYFNCQ8sSeuzbz-PtZ_ct_yg4vNRBROXOv89QQa8rA/exec';

 // Хранение загруженных событий
 let events = [];

 // Функция для загрузки событий из Google Sheets
 async function fetchEvents() {
     try {
         const response = await fetch(googleSheetsUrl);
         const data = await response.json();
         events = data.GoogleSheetData.map(event => ({
             date: event.date, // Ожидается формат "DD.MM.YYYY HH:MM"
             title: event.title,
             description: event.description
         }));
         console.log("Данные событий загружены:", events);
     } catch (error) {
         console.error("Ошибка при загрузке событий:", error);
     }
 }

 // Функция для отображения событий на выбранную дату
 function showEvents(date) {
     const dailyEvents = events.filter(event => event.date.startsWith(date));
     const eventListContainer = document.getElementById("event-list");

     if (dailyEvents.length > 0) {
         eventListContainer.innerHTML = dailyEvents
             .map((event, index) => `<div><strong>${index + 1}. ${event.title}</strong><p>- ${event.description}</p></div>`)
             .join("");
     } else {
         eventListContainer.innerHTML = "<strong>Нет событий на выбранный день.</strong>";
     }
 }

 // Устанавливаем текущую дату
 const today = new Date();
 const currentMonth = today.getMonth();
 const currentYear = today.getFullYear();

 // Функция для отображения календаря
 function renderCalendar(month, year) {
     const calendarContainer = document.getElementById("custom-calendar");
     calendarContainer.innerHTML = ""; // Очищаем предыдущий календарь

     const firstDay = new Date(year, month).getDay();
     const daysInMonth = new Date(year, month + 1, 0).getDate();

     // Заполняем пустые клетки до начала месяца
     for (let i = 0; i < firstDay; i++) {
         calendarContainer.appendChild(document.createElement("div"));
     }

     // Заполняем дни месяца
     for (let day = 1; day <= daysInMonth; day++) {
         const dateStr = `${day.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;
         const dayElement = document.createElement("div");
         dayElement.textContent = day;

         // Отмечаем сегодня
         if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
             dayElement.classList.add("today");
         }

         // Добавляем событие на клик
         dayElement.addEventListener("click", () => {
             document.querySelectorAll("#custom-calendar .selected").forEach(el => el.classList.remove("selected"));
             dayElement.classList.add("selected");
             showEvents(dateStr); // Передаем только дату без времени
         });

         calendarContainer.appendChild(dayElement);
     }
 }

 // Загрузка событий и инициализация календаря
 fetchEvents().then(() => {
     renderCalendar(currentMonth, currentYear);
 });

 console.log("Календарь инициализирован и ожидает данные");
});

