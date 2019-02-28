// @flow

import type { Coin, Network } from '../types'
import ApiInsight from '../apiinsight'

const thiscoin: Coin = 'ltc'

/**
 * Default LTC mainnet insight node url
 */
export const LTC_LITECORE_MAINNET_URL = 'https://insight.litecore.io/api'

/**
 * Default LTC testnet insight node url
 */
export const LTC_LITECORE_TESTNET_URL = 'https://testnet.litecore.io/api'

/**
 * API for LTC Insight nodes
 * @param {string} url Insight API URL
 */
export class LtcInsightApi extends ApiInsight {
  constructor(network?: Network, url?: string) {
    const defaultNetwork: Network = network || 'mainnet'
    const defaultUrl: string =
      defaultNetwork === 'mainnet'
        ? LTC_LITECORE_MAINNET_URL
        : LTC_LITECORE_TESTNET_URL
    super(thiscoin, network, url || defaultUrl)
  }
}
