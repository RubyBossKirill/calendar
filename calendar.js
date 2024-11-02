// URL вашего Google Apps Script для получения данных из Google Sheets
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

class Calendar {
    constructor(events) {
        this.events = events;
        this.selectedDate = null; // Переменная для хранения выбранной даты
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

            // Проверка на события
            const dayEvents = this.events.filter(event => {
                const eventDate = new Date(event.start).getDate();
                return eventDate === day;
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

async function initCalendar() {
    const events = await fetchEvents();
    new Calendar(events);
}
