// @flow

import { Insight } from './insight'
//import { Coin, Network } from './types'

import {
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL
} from './bch'

import { BsvInsightApi, BSV_MAINNET_URL, BSV_TESTNET_URL } from './bsv'

export {
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL,
  BsvInsightApi,
  BSV_MAINNET_URL,
  BSV_TESTNET_URL,

  Insight
  // bch: new Insight({ coin: Coin.bch }),
  // bch(config): () => {new Insight(config)},
  // bsv: new Insight({ coin: Coin.bsv }),
  // bsv(config): () => {new Insight(config)},
}
