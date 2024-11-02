const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGOi1ojnJpWjLSq69bkqCs1JkK1KwaLKnF0lNse2aPAwe3lGqllJMRxoCPMXzu2gIikQ/exec';

console.log("calendar.js загружен и выполняется");

// Функция для загрузки данных событий из Google Sheets
async function fetchEvents() {
    console.log("Запуск fetchEvents");
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        console.log("Ответ получен:", response);
        const data = await response.json();
        console.log("Данные событий загружены:", data);
        
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

        // Явный вызов fetchEvents и вывод результата
        const events = await fetchEvents();
        console.log("Полученные события:", events);
        
        // Проверка загрузки данных и их отображение
        if (events.length > 0) {
            calendarContainer.textContent = `Загружено ${events.length} событий`;
        } else {
            calendarContainer.textContent = "События не найдены";
        }
    } else {
        console.error("Контейнер календаря не найден!");
    }
});

