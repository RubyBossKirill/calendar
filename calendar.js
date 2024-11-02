console.log("calendar.js загружен и выполняется");

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywJ7rlB3zPYSbDGeNlb80XcPJMEYFNCQ8sSeuzbz-PtZ_ct_yg4vNRBROXOv89QQa8rA/exec';

// Хранение загруженных событий
let events = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Функция для загрузки событий из Google Sheets
async function fetchEvents() {
    console.log("Запуск fetchEvents");
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        events = data.GoogleSheetData.map(event => ({
            date: event.date || "", // Ожидаем формат "DD.MM.YYYY HH:MM"
            title: event.title,
            description: event.description
        }));
        console.log("Данные событий загружены (получено из Google Sheets):", events);
    } catch (error) {
        console.error("Ошибка при загрузке событий:", error);
    }
}

// Функция для отображения событий на выбранную дату
function showEvents(date) {
    console.log(`Фильтрация событий на выбранную дату: ${date}`);
    const dailyEvents = events.filter(event => event.date.startsWith(date)); // Сравниваем только дату без времени
    console.log("Отфильтрованные события:", dailyEvents);

    const eventListContainer = document.getElementById("event-list");

    if (dailyEvents.length > 0) {
        eventListContainer.innerHTML = dailyEvents
            .map((event, index) => `<div><strong>${index + 1}. ${event.title}</strong><p>- ${event.description}</p></div>`)
            .join("");
    } else {
        eventListContainer.innerHTML = "<strong>Нет событий на выбранный день.</strong>";
    }
}

// Функция для отображения календаря
function renderCalendar(month, year) {
    const calendarContainer = document.getElementById("custom-calendar");
    calendarContainer.innerHTML = ""; 

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Отображаем месяц и год
    document.getElementById("month-year").textContent = new Date(year, month).toLocaleString("ru-RU", {
        month: "long",
        year: "numeric"
    });

    // Заполняем пустые клетки до начала месяца
    for (let i = 0; i < firstDay; i++) {
        calendarContainer.appendChild(document.createElement("div"));
    }

    // Заполняем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${day.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.classList.add("calendar-day");

        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add("today");
        }

        dayElement.addEventListener("click", () => {
            document.querySelectorAll("#custom-calendar .selected").forEach(el => el.classList.remove("selected"));
            dayElement.classList.add("selected");
            showEvents(dateStr); 
        });

        calendarContainer.appendChild(dayElement);
    }
}

// Функции для переключения месяца
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

// Основной код, выполняющийся после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM загружен и обработчик событий запущен");
    
    // Назначаем обработчики событий для кнопок переключения
    document.getElementById("prev-month").addEventListener("click", prevMonth);
    document.getElementById("next-month").addEventListener("click", nextMonth);

    // Загрузка событий и инициализация календаря
    fetchEvents().then(() => {
        renderCalendar(currentMonth, currentYear);
    });

    console.log("Календарь инициализирован и ожидает данные");
});
