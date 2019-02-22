// @flow
/* eslint-disable no-case-declarations */

import type { ApiConfiguration } from './types'
import ApiInsightBase from './apibase'
import ApiInsight from './apiinsight'
import { BsvInsightApi } from './bsv'
import { BchInsightApi } from './bch'

function configErrorMessage(config: ApiConfiguration): string {
  let errorMessage = ``
  if (!config.url) {
    errorMessage = `Provide a url to call for coin ${config.coin}`
  }
  return errorMessage
}

/**
 * create a configuration with default values
 * @param {ApiConfiguration} config
 */
function defaultConfiguration(config: ApiConfiguration) {
  return {
    coin: config.coin,
    network: config.network || 'mainnet',
    url: config.url || ''
  }
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
  static create(config: ApiConfiguration): ApiInsightBase {
    const defaultConfig = defaultConfiguration(config)
    let api: ApiInsightBase
    if (config.coin in knownCoins) {
      // if we know about the coin then return the concrete subclass
      api = new knownCoins[config.coin](
        defaultConfig.network,
        defaultConfig.url
      )
    } else {
      // otherwise, validate the config and return a generic api with the config applied
      const errMessage = configErrorMessage(config)
      if (errMessage) {
        throw new Error(errMessage)
      }
      api = new ApiInsight(
        defaultConfig.coin,
        defaultConfig.network,
        defaultConfig.url
      )
    }
    return api
  }
}
