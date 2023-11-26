import {
  getAllVacations
} from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";
allUtils.access()

allUtils.sideMenu()
allUtils.notes()



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
      if(allUtils.getLocalData("user").access.sector != "Recursos Humanos"){
        return;
      }
      var title = prompt('Evento para registrar:');
      if (title) {
        var eventData = {
          title: title,
          start: start.format(),
          end: end.format()
        };
        calendar.fullCalendar('renderEvent', eventData, true);
        registerEvent();
      }
      calendar.fullCalendar('unselect');
      console.log(eventData)
    },
    eventClick: function(calEvent, jsEvent, view) {
      if(allUtils.getLocalData("user").access.sector != "Recursos Humanos"){
        return;
      }
      var deleteEvent = confirm('Tem certeza que deseja excluir esse evento?');
      if (deleteEvent) {
        calendar.fullCalendar('removeEvents', calEvent._id);
        registerEvent();
      }
    },
    events: listEvents(),
    locale: 'pt-br' 
  });

  function registerEvent() {
    var events = calendar.fullCalendar('clientEvents').map(function(event) {
      return {
        title: event.title,
        start: event.start.format(),
        end: event.end.format()
      };
    });
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }

  function listEvents() {
    var storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }
});