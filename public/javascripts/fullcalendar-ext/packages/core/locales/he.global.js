/*!
FullCalendar Core v6.1.4
Docs & License: https://fullcalendar.io
(c) 2023 Adam Shaw
*/
(function (index_js) {
  'use strict'

  const locale = {
    code: 'he',
    direction: 'rtl',
    buttonText: {
      prev: 'הקודם',
      next: 'הבא',
      today: 'היום',
      year: 'שנה',
      month: 'חודש',
      week: 'שבוע',
      day: 'יום',
      list: 'סדר יום'
    },
    allDayText: 'כל היום',
    moreLinkText: 'אחר',
    noEventsText: 'אין אירועים להצגה',
    weekText: 'שבוע'
  }

  index_js.globalLocales.push(locale)
})(FullCalendar)
