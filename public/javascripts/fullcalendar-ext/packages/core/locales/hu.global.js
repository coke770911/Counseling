/*!
FullCalendar Core v6.1.4
Docs & License: https://fullcalendar.io
(c) 2023 Adam Shaw
*/
(function (index_js) {
  'use strict'

  const locale = {
    code: 'hu',
    week: {
      dow: 1,
      doy: 4 // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'vissza',
      next: 'előre',
      today: 'ma',
      year: 'Év',
      month: 'Hónap',
      week: 'Hét',
      day: 'Nap',
      list: 'Lista'
    },
    weekText: 'Hét',
    allDayText: 'Egész nap',
    moreLinkText: 'további',
    noEventsText: 'Nincs megjeleníthető esemény'
  }

  index_js.globalLocales.push(locale)
})(FullCalendar)
