// @flow

import type { Coin, Network } from '../types'
import ApiInsight from '../apiinsight'

const thiscoin: Coin = 'zec'

/**
 * Default BTC mainnet insight node url
 */
export const ZEC_Z_MAINNET_URL = 'https://zcash.blockexplorer.com/api'

/**
 * Default BTC testnet insight node url
 */
export const ZEC_Z_TESTNET_URL = 'https://explorer.testnet.z.cash/api'

/**
 * API for ZCASH Insight nodes
 * @param {string} url Insight API URL
 */
export class ZecInsightApi extends ApiInsight {
  constructor(network?: Network, url?: string) {
    const defaultNetwork: Network = network || 'mainnet'
    const defaultUrl: string =
      defaultNetwork === 'mainnet' ? ZEC_Z_MAINNET_URL : ZEC_Z_TESTNET_URL
    super(thiscoin, network, url || defaultUrl)
  }
}
