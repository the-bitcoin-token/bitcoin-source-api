// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import ApiInsight from './apiinsight'
import type { Coin, Network } from './types'

/**
 * Default BCH mainnet insight node url
 */
export const BCH_BLOCKDOZER_MAINNET_URL = 'https://bch.blockdozer.com/api'

/**
 * Default BCH testnet insight node url
 */
export const BCH_BLOCKDOZER_TESTNET_URL = 'https://tbch.blockdozer.com/api'

export const Urls = [
  {
    isDefault: true,
    name: 'BCH_BLOCKDOZER_MAINNET_URL',
    network: 'mainnet',
    url: BCH_BLOCKDOZER_MAINNET_URL
  },
  {
    isDefault: true,
    name: 'BCH_BLOCKDOZER_TESTNET_URL',
    network: 'testnet',
    url: BCH_BLOCKDOZER_TESTNET_URL
  }
]

const thiscoin: Coin = 'bch'

/**
 * API for BCH Insight nodes
 * @param {string} url Insight API URL
 */
export class BchInsightApi extends ApiInsight {
  constructor(network: Network, url: string) {
    let foundurl = url
    if (!foundurl) {
      const searchNetwork = network || 'mainnet'
      const found = Urls.find(u => u.network === searchNetwork)
      if (found) {
        foundurl = found.url
      } else {
        throw new Error(`Cannot find any url for bch ${searchNetwork}`)
      }
    }
    super('bch', network, foundurl)
  }
}
