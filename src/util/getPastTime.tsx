// import moment from 'moment'

// const CONFIG_NEW: {[Key: string]: any} = {
//   future: 'in %s',
//   past: '%s',
//   s: '1s ago',
//   ss: '%ss',
//   m: '1m ago',
//   mm: '%dm',
//   h: '1h ago',
//   hh: '%dh',
//   d: '1d ago',
//   dd: '%dd',
//   M: '1mo ago',
//   MM: '%dmo',
//   y: '1y ago',
//   yy: '%dyr',
// }

// export default function getPastTime(timestamp: string) {
//   if (!timestamp) {
//     return ''
//   }
//   moment.updateLocale('en', { relativeTime: CONFIG_NEW })
//   return moment(timestamp).fromNow()
// }
// const periods = {
//   month: 30 * 24 * 60 * 60 * 1000,
//   week: 7 * 24 * 60 * 60 * 1000,
//   day: 24 * 60 * 60 * 1000,
//   hour: 60 * 60 * 1000,
//   minute: 60 * 1000
// };

export default function getPastTime(timestamp: any) {

  switch (typeof timestamp) {
    case 'number':
      break;
    case 'string':
      timestamp = +new Date(timestamp);
      break;
    case 'object':
      if (timestamp.constructor === Date) timestamp = timestamp.getTime();
      break;
    default:
      timestamp = +new Date();
  }
  const time_formats = [
    [60, 'secs', 1], // 60
    [120, '1 min ago', '1 min from now'], // 60*2
    [3600, 'mins', 60], // 60*60, 60
    [7200, '1 hr ago', '1 hr from now'], // 60*60*2
    [86400, 'hrs', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'd', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  let seconds = (+new Date() - timestamp) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  let i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return timestamp;
}
