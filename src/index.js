// @flow

import Insight from './insight'
import type { ApiConfiguration } from './types'

import {
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL
} from './bch'

import { BsvInsightApi, BSV_MAINNET_URL } from './bsv'
// import { BtcInsightApi, BTC_MAINNET_URL, BTC_TESTNET_URL } from './btc'

function bch(config?: ApiConfiguration) {
  return Insight.create({ ...config, coin: 'bch' })
}

function bsv(config?: ApiConfiguration) {
  return Insight.create({ ...config, coin: 'bsv' })
}

function btc(config?: ApiConfiguration) {
  return Insight.create({ ...config, coin: 'btc' })
}

export {
  Insight,
  bsv,
  bch,
  btc,
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL,
  BsvInsightApi,
  BSV_MAINNET_URL
}
