// @flow

import Insight from './insight'
import type { ApiConfiguration } from './types'

import {
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL
} from './coins/bch'

import { BsvInsightApi, BSV_BCHSVEXPLORER_MAINNET_URL } from './coins/bsv'

function bch(config: ApiConfiguration) {
  return Insight.create({ ...config, coin: 'bch' })
}

function bsv(config: ApiConfiguration) {
  return Insight.create({ ...config, coin: 'bsv' })
}

export {
  Insight,
  bsv,
  bch,
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL,
  BsvInsightApi,
  BSV_BCHSVEXPLORER_MAINNET_URL
}
