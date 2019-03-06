// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import type { Coin, Network } from '../types'
import ApiInsightBase from '../apiinsightbase'

const thiscoin: Coin = 'bsv'

// Default BSV mainnet insight node url
export const BSV_BCHSVEXPLORER_MAINNET_URL = 'https://bchsvexplorer.com/api'

/**
 * API for BSV Insight nodes
 */
export class BsvInsightApi extends ApiInsightBase {
  /**
   * Constructor for BSV Insight API
   * @constructor
   * @param {string} network mainnet or testnet
   * @param {string} url Insight API URL
   */
  constructor(network?: Network, url?: string) {
    if (network === 'testnet' && !url) {
      throw new Error(
        'There is no default api url for BSV testnet. Please provide a url'
      )
    }
    const defaultNetwork: Network = network || 'mainnet'
    const defaultUrl: string = url || BSV_BCHSVEXPLORER_MAINNET_URL
    super(thiscoin, network, defaultUrl)
  }
}
