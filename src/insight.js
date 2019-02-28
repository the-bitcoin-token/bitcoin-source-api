// @flow

import type { Coin, Network } from './types'
import { IInsightApiBasic } from './api'
import ApiInsightBase from './apiinsightbase'
import ApiInsight from './apiinsight'
import { BsvInsightApi } from './coins/bsv'
import { BchInsightApi } from './coins/bch'

function configErrorMessage(coin: Coin, network: Network, url: string): string {
  let errorMessage = ``
  if (!url) {
    errorMessage = `Provide a url to call for coin ${coin}`
  }
  return errorMessage
}

/**
 * Register known coins here to let the factory know how to create them
 */
const knownCoins = {
  bch: BchInsightApi,
  bsv: BsvInsightApi
}

/**
 * Constructs an Insight Api object for the user
 * if passed a known coin then create a concrete class of that type
 *  example: Insight.create({coin:'bch', network:'mainnet', url:'localhost'})
 * if passed known coin then we can find reasonable defaults for network and url
 *  example: Insight.create({coin:'bch'})
 * if unknonwn coin then config must be "valid" to give back a generic base type
 *  example: Insight.create({coin:'mycoin', network:'mainnet', url:'localhost'})
 * if config is not valid then error
 *  example: Insight.create({coin:'throwsErrorBecauseNoUrl'})
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
