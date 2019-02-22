// @flow

import type { ApiConfiguration } from './types'
import { BCH_BLOCKDOZER_MAINNET_URL, BCH_BLOCKDOZER_TESTNET_URL } from './bch'
import { BSV_BCHSVEXPLORER_MAINNET_URL } from './bsv'

export const urls: Array<ApiConfiguration> = [
  { coin: 'bsv', network: 'mainnet', url: BSV_BCHSVEXPLORER_MAINNET_URL },
  { coin: 'bch', network: 'mainnet', url: BCH_BLOCKDOZER_MAINNET_URL },
  { coin: 'bch', network: 'testnet', url: BCH_BLOCKDOZER_TESTNET_URL }
  // { coin: 'btc', network: 'mainnet', url: BTC_MAINNET_URL },
  // { coin: 'btc', network: 'testnet', url: BTC_TESTNET_URL }
]

/**
 * Gets a ApiConfiguration containing a url
 * @param {*} config
 */
export const getConfigurationWithUrlFrom = (config: ApiConfiguration) => {
  if (config.url) {
    return config
  }
  // TODO: handle re-search if no network is passed then default to mainnet
  const found = urls.find(
    u => u.coin === config.coin && u.network === (config.network || 'mainnet')
  )
  // TODO: handle multiple matches
  if (found) {
    return found
  }
  throw new Error(
    `could not find a url for coin ${config.coin} on ${(
      config.network || ''
    ).toString()}`
  )
}
