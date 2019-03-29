// @flow

import type { Coin, Network } from '../types'
import ApiInsight from '../apiinsight'

const thiscoin: Coin = 'btc'

/**
 * Default BTC mainnet insight node url
 */
export const BTC_BITPAY_MAINNET_URL = 'https://insight.bitpay.com/api'

/**
 * Default BTC testnet insight node url
 */
export const BTC_BITPAY_TESTNET_URL = 'https://test-insight.bitpay.com/api'

/**
 * API for BTC Insight nodes
 * @param {string} url Insight API URL
 */
export class BtcInsightApi extends ApiInsight {
  constructor(network?: Network, url?: string) {
    const defaultNetwork: Network = network || 'mainnet'
    const defaultUrl: string =
      defaultNetwork === 'mainnet' ? BTC_BITPAY_MAINNET_URL : BTC_BITPAY_TESTNET_URL
    super(thiscoin, network, url || defaultUrl)
  }
}
