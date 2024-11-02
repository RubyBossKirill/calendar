console.log("calendar.js загружен и выполняется");

// URL вашего Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzAPgk2MuKzqItmBZfrwpyVeN0z3tikSfsJHowFywUC4GYsRE4jMDUllV-Se-sSIVBMKw/exec';

// Функция для загрузки данных событий из Google Sheets
async function fetchEvents() {
    console.log("Запуск fetchEvents");
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        console.log("Данные событий загружены:", data.GoogleSheetData);
        
        // Возвращаем данные событий
        return data.GoogleSheetData;
    } catch (error) {
        console.error("Ошибка при загрузке событий:", error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM загружен и обработчик событий запущен");

    const calendarContainer = document.getElementById('color-calendar');
    if (calendarContainer) {
        calendarContainer.textContent = "Календарь успешно загружен";
        console.log("Контейнер календаря найден и текст добавлен");

        // Явный вызов fetchEvents и обработка данных
        const events = await fetchEvents();
        
        if (events.length > 0) {
            calendarContainer.innerHTML = `<strong>Загружено ${events.length} событий:</strong><br><br>`;
            console.log("Полученные события:", events);

            // Структурное отображение событий с правильным порядком данных
            events.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.className = "event";
                eventElement.innerHTML = `
                    <p><strong>Дата:</strong> ${event.date}</p>
                    <p><strong>Название:</strong> ${event.title}</p>
                    <p><strong>Описание:</strong> ${event.description}</p>
                    <hr>
                `;
                calendarContainer.appendChild(eventElement);
            });
        } else {
            calendarContainer.textContent = "События не найдены";
        }
    } else {
        console.error("Контейнер календаря не найден!");
    }
});
