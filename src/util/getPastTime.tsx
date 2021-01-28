import moment from 'moment'

const CONFIG_NEW: {[Key: string]: any} = {
  future: 'in %s',
  past: '%s',
  s: '1s',
  ss: '%ss ago',
  m: '1m',
  mm: '%dm ago',
  h: '1h ago',
  hh: '%dh ago',
  d: '1d',
  dd: '%dd ago',
  M: '1mo',
  MM: '%dmo ago',
  y: '1y',
  yy: '%dyr ago',
}

export default function getPastTime(timestamp: string) {
  if (!timestamp) {
    return ''
  }
  moment.updateLocale('en', { relativeTime: CONFIG_NEW })
  return moment(timestamp).fromNow()
}
