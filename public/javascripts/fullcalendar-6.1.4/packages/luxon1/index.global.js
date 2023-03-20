/*!
FullCalendar Luxon 1 Plugin v6.1.4
Docs & License: https://fullcalendar.io/docs/luxon1
(c) 2023 Adam Shaw
*/
FullCalendar.Luxon = (function (exports, core, luxon, internal) {
  'use strict'

  function toLuxonDateTime (date, calendar) {
    if (!(calendar instanceof internal.CalendarImpl)) {
      throw new Error('must supply a CalendarApi instance')
    }
    const { dateEnv } = calendar.getCurrentData()
    return luxon.DateTime.fromJSDate(date, {
      zone: dateEnv.timeZone,
      locale: dateEnv.locale.codes[0]
    })
  }
  function toLuxonDuration (duration, calendar) {
    if (!(calendar instanceof internal.CalendarImpl)) {
      throw new Error('must supply a CalendarApi instance')
    }
    const { dateEnv } = calendar.getCurrentData()
    return luxon.Duration.fromObject(Object.assign(Object.assign({}, duration), { locale: dateEnv.locale.codes[0] }))
  }
  // Internal Utils
  function luxonToArray (datetime) {
    return [
      datetime.year,
      datetime.month - 1,
      datetime.day,
      datetime.hour,
      datetime.minute,
      datetime.second,
      datetime.millisecond
    ]
  }
  function arrayToLuxon (arr, timeZone, locale) {
    return luxon.DateTime.fromObject({
      zone: timeZone,
      locale,
      year: arr[0],
      month: arr[1] + 1,
      day: arr[2],
      hour: arr[3],
      minute: arr[4],
      second: arr[5],
      millisecond: arr[6]
    })
  }

  class LuxonNamedTimeZone extends internal.NamedTimeZoneImpl {
    offsetForArray (a) {
      return arrayToLuxon(a, this.timeZoneName).offset
    }

    timestampToArray (ms) {
      return luxonToArray(luxon.DateTime.fromMillis(ms, {
        zone: this.timeZoneName
      }))
    }
  }

  function formatWithCmdStr (cmdStr, arg) {
    const cmd = parseCmdStr(cmdStr)
    if (arg.end) {
      const start = arrayToLuxon(arg.start.array, arg.timeZone, arg.localeCodes[0])
      const end = arrayToLuxon(arg.end.array, arg.timeZone, arg.localeCodes[0])
      return formatRange(cmd, start.toFormat.bind(start), end.toFormat.bind(end), arg.defaultSeparator)
    }
    return arrayToLuxon(arg.date.array, arg.timeZone, arg.localeCodes[0]).toFormat(cmd.whole)
  }
  function parseCmdStr (cmdStr) {
    const parts = cmdStr.match(/^(.*?)\{(.*)\}(.*)$/) // TODO: lookbehinds for escape characters
    if (parts) {
      const middle = parseCmdStr(parts[2])
      return {
        head: parts[1],
        middle,
        tail: parts[3],
        whole: parts[1] + middle.whole + parts[3]
      }
    }
    return {
      head: null,
      middle: null,
      tail: null,
      whole: cmdStr
    }
  }
  function formatRange (cmd, formatStart, formatEnd, separator) {
    if (cmd.middle) {
      const startHead = formatStart(cmd.head)
      const startMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator)
      const startTail = formatStart(cmd.tail)
      const endHead = formatEnd(cmd.head)
      const endMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator)
      const endTail = formatEnd(cmd.tail)
      if (startHead === endHead && startTail === endTail) {
        return startHead +
                    (startMiddle === endMiddle ? startMiddle : startMiddle + separator + endMiddle) +
                    startTail
      }
    }
    const startWhole = formatStart(cmd.whole)
    const endWhole = formatEnd(cmd.whole)
    if (startWhole === endWhole) {
      return startWhole
    }
    return startWhole + separator + endWhole
  }

  const plugin = core.createPlugin({
    name: '@fullcalendar/luxon',
    cmdFormatter: formatWithCmdStr,
    namedTimeZonedImpl: LuxonNamedTimeZone
  })

  core.globalPlugins.push(plugin)

  exports.default = plugin
  exports.toLuxonDateTime = toLuxonDateTime
  exports.toLuxonDuration = toLuxonDuration

  Object.defineProperty(exports, '__esModule', { value: true })

  return exports
})({}, FullCalendar, luxon, FullCalendar.Internal)
