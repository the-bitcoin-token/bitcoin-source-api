// @flow
/* eslint no-param-reassign: "off" */

// import { IInsightApiBasic } from './api'
import type { ApiConfiguration } from './types'
import { BsvInsightApi, BSV_MAINNET_URL } from './bsv'
import { BtcInsightApi, BTC_MAINNET_URL, BTC_TESTNET_URL } from './btc'
import {
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL
} from './bch'

export default class Insight {
  static create(config: ApiConfiguration) {
    const urlConfig = Insight.getConfigurationWithUrlFrom(config)
    if (!urlConfig) {
      throw new Error(
        'could not find a url. You need to find a insight site for your coin'
      )
    }
    const foundUrl = urlConfig.url || ''
    const foundNetwork = urlConfig.network || 'mainnet'
    let api
    switch (config.coin) {
      case 'bch':
        api = new BchInsightApi(foundUrl)
        api.network = foundNetwork
        break
      case 'bsv':
        api = new BsvInsightApi(foundUrl)
        api.network = foundNetwork
        break
      case 'btc':
        api = new BtcInsightApi(foundUrl)
        api.network = foundNetwork
        break
      default:
        throw new Error(`unknown coin`)
    }
    return api
  }

  /**
   * Gets a ApiConfiguration containing a url
   * @param {*} config
   */
  static getConfigurationWithUrlFrom(config: ApiConfiguration) {
    if (config.url) {
      return config
    }
    const urls: Array<ApiConfiguration> = [
      { coin: 'bsv', network: 'mainnet', url: BSV_MAINNET_URL },
      { coin: 'bch', network: 'mainnet', url: BCH_BLOCKDOZER_MAINNET_URL },
      { coin: 'bch', network: 'testnet', url: BCH_BLOCKDOZER_TESTNET_URL },
      { coin: 'btc', network: 'mainnet', url: BTC_MAINNET_URL },
      { coin: 'btc', network: 'testnet', url: BTC_TESTNET_URL }
    ]
    // TODO: handle re-search if no network is passed then default to mainnet
    const found = urls.find(
      u => u.coin === config.coin && (u.network === config.network || 'mainnet')
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
}
