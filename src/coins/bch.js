// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import type { Coin, Network } from '../types'
import { Urls } from '../urls'
import ApiInsight from '../apiinsight'

const thiscoin: Coin = 'bch'

/**
 * Default BCH mainnet insight node url
 */
export const BCH_BLOCKDOZER_MAINNET_URL = 'https://bch.blockdozer.com/api'

/**
 * Default BCH testnet insight node url
 */
export const BCH_BLOCKDOZER_TESTNET_URL = 'https://tbch.blockdozer.com/api'

Urls.push({
  isDefault: true,
  name: 'BCH_BLOCKDOZER_MAINNET_URL',
  coin: thiscoin,
  network: 'mainnet',
  url: BCH_BLOCKDOZER_MAINNET_URL
})
Urls.push({
  isDefault: true,
  name: 'BCH_BLOCKDOZER_TESTNET_URL',
  coin: thiscoin,
  network: 'testnet',
  url: BCH_BLOCKDOZER_TESTNET_URL
})

/**
 * API for BCH Insight nodes
 * @param {string} url Insight API URL
 */
export class BchInsightApi extends ApiInsight {
  constructor(network: Network, url: string) {
    super(thiscoin, network, url)
  }
}
