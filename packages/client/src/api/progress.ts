import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import './progress.css'

let count = 0

export function start() {
  count += 1

  if (count === 1) {
    nprogress.start()
  }
}

export function done() {
  count -= 1

  if (count === 0) {
    nprogress.done()
  }
}
