console.log("calendar.js загружен и выполняется");

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxhLNqZcw1ccAMnNjMSXyJZXgfKnAUgDd1QhatKUEj3oi_Fbv2G-KQ_33QhP7P4U0arXA/exechttps://script.google.com/macros/s/AKfycbxhLNqZcw1ccAMnNjMSXyJZXgfKnAUgDd1QhatKUEj3oi_Fbv2G-KQ_33QhP7P4U0arXA/exec';

async function fetchEvents() {
 console.log("Функция fetchEvents запущена");
 try {
     const response = await fetch(GOOGLE_SCRIPT_URL);
     const data = await response.json();
     console.log("Данные получены:", data);
     return data.GoogleSheetData;
 } catch (error) {
     console.error("Ошибка при загрузке событий:", error);
     return [];
 }
}

// Пример инициализации календаря для теста
document.addEventListener('DOMContentLoaded', () => {
 console.log("DOM загружен, инициализация календаря начинается");
 // Вызов функций для отображения календаря
});