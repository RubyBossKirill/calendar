const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9oTWXGn4iLk31HNntvq8gYIoq_DrjiwBCW7gzXIQgFbAiJhr1JbRMBedP3QIh2es3BA/exec';

async function fetchEvents() {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        return data.GoogleSheetData;
    } catch (error) {
        console.error("Ошибка при загрузке событий:", error);
        return [];
    }
}

// Проверка, находится ли дата (в формате DD.MM.YYYY HH:MM) в заданном диапазоне
function isDateInRange(currentDate, startDateStr, endDateStr) {
 // Разбиваем строки на части и создаем объекты Date для диапазона
 const [startDay, startMonth, startYear] = startDateStr.split(' ')[0].split('.').map(Number);
 const [endDay, endMonth, endYear] = endDateStr.split(' ')[0].split('.').map(Number);
 const startDate = new Date(startYear, startMonth - 1, startDay);
 const endDate = new Date(endYear, endMonth - 1, endDay);

 // Логируем, чтобы проверить корректность дат
 console.log("Проверка даты:", { currentDate, startDate, endDate, startDateStr, endDateStr });

 return currentDate >= startDate && currentDate <= endDate;
}


class Calendar {
    constructor(events) {
        this.events = events;
        this.selectedDate = null;
        this.renderCalendar();
    }

    renderCalendar() {
        const calendarEl = document.getElementById('color-calendar');
        calendarEl.innerHTML = '';

        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();

        // Заголовок календаря
        const header = document.createElement('h2');
        header.innerText = `${year}-${String(month + 1).padStart(2, '0')}`;
        calendarEl.appendChild(header);

        // Отрисовка дней месяца
        for (let day = 1; day <= 30; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.innerText = day;

            // Создаем дату для текущего дня
            const currentDate = new Date(year, month, day);

            // Проверка на события
            const dayEvents = this.events.filter(event => {
                return isDateInRange(currentDate, event.start, event.end);
            });

            if (dayEvents.length > 0) {
                dayEl.classList.add('has-event');
            }

            // Добавим обработчик клика по дню
            dayEl.addEventListener('click', () => {
                this.selectDate(dayEl);
                this.showEvents(dayEvents);
            });

            calendarEl.appendChild(dayEl);
        }
    }

    selectDate(dayEl) {
        // Снимем выделение с предыдущей выбранной даты
        if (this.selectedDate) {
            this.selectedDate.classList.remove('selected-day');
        }

        // Установим новое выделение
        this.selectedDate = dayEl;
        this.selectedDate.classList.add('selected-day');
    }

    showEvents(events) {
        const eventsDisplay = document.querySelector('.events-display');
        eventsDisplay.innerHTML = '';

        if (events.length > 0) {
            events.forEach(event => {
                const eventEl = document.createElement('div');
                eventEl.className = 'event';
                eventEl.innerHTML = `
                    <strong>${event.name}</strong><br>
                    <em>Начало: ${event.start}</em><br>
                    <em>Окончание: ${event.end}</em><br>
                    ${event.desc}<br>
                    <a href="${event.url}" target="_blank">Подробнее</a>
                `;
                eventsDisplay.appendChild(eventEl);
            });
        } else {
            eventsDisplay.innerHTML = '<p>Нет событий на выбранный день</p>';
        }
    }
}

async function initCalendar() {
    const events = await fetchEvents();
    new Calendar(events);
}
