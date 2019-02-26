// @flow
import type { Network } from './types'

import Insight from './insight'

function bch(network?: Network, url?: string) {
  return Insight.create('bch', network, url)
}

function bsv(network?: Network, url?: string) {
  return Insight.create('bsv', network, url)
}

export { Insight, bsv, bch }
