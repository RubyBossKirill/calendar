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

 // Инициализация календаря
 const calendar = new Calendar({
     id: "#color-calendar",
     theme: "basic",
     primaryColor: "#f39c12",
     headerColor: "#f39c12",
     textColor: "#fff",
     weekdaysColor: "#fff",
     dateChanged: (currentDate) => {
         const dateStr = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
         showEvents(dateStr);
     }
 });

 // Массив событий (замените на вашу логику получения событий)
 const events = [
     { date: "01.11.2024", title: "Событие 1", description: "Описание события 1" },
     { date: "02.11.2024", title: "Событие 2", description: "Описание события 2" },
 ];

 // Функция для отображения событий
 function showEvents(date) {
     const dailyEvents = events.filter(event => event.date === date);
     const eventListContainer = document.getElementById("event-list");
     eventListContainer.innerHTML = dailyEvents.length > 0
         ? dailyEvents.map(event => `<div><strong>${event.title}</strong><p>${event.description}</p></div>`).join("")
         : "<strong>Нет событий на выбранный день.</strong>";
 }

 console.log("Календарь инициализирован");
});

