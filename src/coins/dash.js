// @flow

import type { Coin, Network } from '../types'
import ApiInsight from '../apiinsight'

const thiscoin: Coin = 'dash'

/**
 * Default DASH mainnet insight node url
 */
export const DASH_EVO_MAINNET_URL = 'https://insight.dashevo.org/insight-api'

/**
 * Default BTC testnet insight node url
 */
export const DASH_EVO_TESTNET_URL =
  'https://testnet-insight.dashevo.org/insight-api'

/**
 * API for DASH Insight nodes
 * @param {string} url Insight API URL
 */
export class DashInsightApi extends ApiInsight {
  constructor(network?: Network, url?: string) {
    const defaultNetwork: Network = network || 'mainnet'
    const defaultUrl: string =
      defaultNetwork === 'mainnet' ? DASH_EVO_MAINNET_URL : DASH_EVO_TESTNET_URL
    super(thiscoin, network, url || defaultUrl)
  }
}
