/* const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxhLNqZcw1ccAMnNjMSXyJZXgfKnAUgDd1QhatKUEj3oi_Fbv2G-KQ_33QhP7P4U0arXA/exechttps://script.google.com/macros/s/AKfycbxhLNqZcw1ccAMnNjMSXyJZXgfKnAUgDd1QhatKUEj3oi_Fbv2G-KQ_33QhP7P4U0arXA/exec';*/

console.log("calendar.js загружен и выполняется");

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM загружен и обработчик событий запущен");

    const calendarContainer = document.getElementById('color-calendar');
    if (calendarContainer) {
        calendarContainer.textContent = "Календарь успешно загружен";
        console.log("Контейнер календаря найден и текст добавлен");

        try {
            console.log("Попытка загрузки данных событий");
            const response = await fetch(window.OneWayExcel);
            const data = await response.json();
            console.log("Данные событий загружены:", data);
            
            // Здесь можно добавить отображение данных, например:
            calendarContainer.textContent = `Загружено ${data.GoogleSheetData.length} событий`;
        } catch (error) {
            console.error("Ошибка при загрузке событий:", error);
        }
    } else {
        console.error("Контейнер календаря не найден!");
    }
});
