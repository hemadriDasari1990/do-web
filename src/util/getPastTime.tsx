import moment from 'moment'

const CONFIG_NEW: {[Key: string]: any} = {
  future: 'in %s',
  past: '%s',
  s: '1s ago',
  ss: '%ss',
  m: '1m ago',
  mm: '%dm',
  h: '1h ago',
  hh: '%dh',
  d: '1d ago',
  dd: '%dd',
  M: '1mo ago',
  MM: '%dmo',
  y: '1y ago',
  yy: '%dyr',
}

export default function getPastTime(timestamp: string) {
  if (!timestamp) {
    return ''
  }
  moment.updateLocale('en', { relativeTime: CONFIG_NEW })
  return moment(timestamp).fromNow()
}
