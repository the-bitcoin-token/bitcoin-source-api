// @flow

import type { Coin, Network } from './types'
import type { IInsightApiBasic } from './api'
import ApiInsightBase from './apiinsightbase'
import ApiInsight from './apiinsight'
import { BsvInsightApi } from './coins/bsv'
import { BchInsightApi } from './coins/bch'
import { BtcInsightApi } from './coins/btc'
import { LtcInsightApi } from './coins/ltc'

function configErrorMessage(coin: Coin, network: Network, url: string): string {
  let errorMessage = ``
  if (!url) {
    errorMessage = `Provide a url to call for coin ${coin}`
  }
  return errorMessage
}

// Add coin classes here so the factory will know how to create an API for them
const knownCoins = {
  bch: BchInsightApi,
  bsv: BsvInsightApi,
  btc: BtcInsightApi,
  ltc: LtcInsightApi
}

/**
 * The Insight class is a Factory that constructs an Insight Api object for the caller.
 * If passed a known coin then it creates a concrete class of that type.
 *  Example: Insight.create('bch', 'mainnet', 'http://localhost:3000')
 * If passed known coin then we can find reasonable defaults for network and url
 *  example: Insight.create('bch')
 * If passed an unknonwn coin then caller must also pass a url to give back a generic API implementation
 *  Example: Insight.create('mycoin', 'mainnet', 'http://localhost:3000')
 * If passed an unknown coin then caller must also pass a url
 *  Example: Insight.create('throwsErrorBecauseNoUrl')
 */
export default class Insight {
  static create(coin: Coin, network?: Network, url?: string): IInsightApiBasic {
    const defaultNetwork: Network = network || 'mainnet'
    const defaultUrl: string = url || ''
    let api: ApiInsightBase
    if (coin in knownCoins) {
      // if we know about the coin then return the concrete subclass
      api = new knownCoins[coin](defaultNetwork, defaultUrl)
    } else {
      // otherwise, validate the config and return a generic api with the config applied
      const errMessage = configErrorMessage(coin, defaultNetwork, defaultUrl)
      if (errMessage) {
        throw new Error(errMessage)
      }
      api = new ApiInsight(coin, defaultNetwork, defaultUrl)
    }
    return api
  }
}
