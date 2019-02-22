// @flow
/* eslint no-param-reassign: "off" */

import type { ApiConfiguration } from './types'
import { BsvInsightApi } from './bsv'
// import { BtcInsightApi, BTC_MAINNET_URL, BTC_TESTNET_URL } from './btc'
import { BchInsightApi } from './bch'
import { getConfigurationWithUrlFrom } from './insighturls'

export default class Insight {
  static create(config: ApiConfiguration) {
    const urlConfig = getConfigurationWithUrlFrom(config)
    const foundUrl = urlConfig.url || ''
    const foundNetwork = urlConfig.network || 'mainnet'
    let api
    switch (config.coin) {
      case 'bch':
        api = new BchInsightApi(foundNetwork, foundUrl)
        break
      case 'bsv':
        api = new BsvInsightApi(foundNetwork, foundUrl)
        break
      default:
        throw new Error(`unknown coin! ${config.coin}`)
    }
    return api
  }
}
