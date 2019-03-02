// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import type { Coin, Network } from '../types'
import ApiInsight from '../apiinsight'

const thiscoin: Coin = 'bch'

// Default BCH mainnet insight node url
export const BCH_BLOCKDOZER_MAINNET_URL = 'https://bch.blockdozer.com/api'

// Default BCH testnet insight node url
export const BCH_BLOCKDOZER_TESTNET_URL = 'https://tbch.blockdozer.com/api'

export const BCH_BITPAY_MAINNET_URL = 'https://bch-insight.bitpay.com/api'
export const BCH_BITPAY_TESTNET_URL = 'https://test-bch-insight.bitpay.com/api'

/**
 * API for BCH Insight nodes
 */
export class BchInsightApi extends ApiInsight {
  /**
   * Constructor for BCH API
   * @constructor
   * @param {string} network mainnet or testnet
   * @param {string} url Insight API URL endpoint
   */
  constructor(network?: Network, url?: string) {
    const defaultNetwork: Network = network || 'mainnet'
    const defaultUrl: string =
      defaultNetwork === 'mainnet'
        ? BCH_BLOCKDOZER_MAINNET_URL
        : BCH_BLOCKDOZER_TESTNET_URL
    super(thiscoin, network, url || defaultUrl)
  }
}
