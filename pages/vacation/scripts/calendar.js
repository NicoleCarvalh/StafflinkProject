document.addEventListener('DOMContentLoaded', function () {
  var calendar = $('#calendar').fullCalendar({
    selectable: true,
    selectHelper: true,
    defaultView: 'month',
    views: {
      list: { buttonText: 'Lista' }
    },
    header: {
      left: 'title prev , next,',
      center: '',
      right: 'today , month , listMonth'
    },
    select: function(start, end) {
      var title = prompt('Evento para registrar:');
      if (title) {
        var eventData = {
          title: title,
          start: start.format(),
          end: end.format()
        };
        calendar.fullCalendar('renderEvent', eventData, true);
        saveEventsToLocalStorage();
      }
      calendar.fullCalendar('unselect');
    },
    eventClick: function(calEvent, jsEvent, view) {
      var deleteEvent = confirm('Tem certeza que deseja excluir esse evento?');
      if (deleteEvent) {
        calendar.fullCalendar('removeEvents', calEvent._id);
        saveEventsToLocalStorage();
      }
    },
    events: loadEventsFromLocalStorage(),
    locale: 'pt-br' 
  });

  function saveEventsToLocalStorage() {
    var events = calendar.fullCalendar('clientEvents').map(function(event) {
      return {
        title: event.title,
        start: event.start.format(),
        end: event.end.format()
      };
    });
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }

  function loadEventsFromLocalStorage() {
    var storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }
});