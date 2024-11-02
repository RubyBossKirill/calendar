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

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM загружен и обработчик событий запущен");

    const events = await fetchEvents();
    const calendarEvents = events.map(event => ({
        start: event.startDate,
        end: event.endDate,
        name: event.title,
        description: event.description,
        url: event.url
    }));

    // Инициализация календаря
    new Calendar({
        id: '#color-calendar',
        calendarSize: 'large',
        eventsData: calendarEvents,
        theme: 'basic',
        dateChanged: (currentDate, events) => {
            console.log("Текущая дата:", currentDate);
            console.log("События в эту дату:", events);
            const eventList = document.getElementById('event-list');
            eventList.innerHTML = "";  // Очистка списка событий
            events.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.className = "event";
                eventElement.innerHTML = `
                    <p><strong>Название:</strong> ${event.name}</p>
                    <p><strong>Описание:</strong> ${event.description}</p>
                    <p><strong>URL:</strong> <a href="${event.url}" target="_blank">${event.url}</a></p>
                    <hr>
                `;
                eventList.appendChild(eventElement);
            });
        }
    });
});
