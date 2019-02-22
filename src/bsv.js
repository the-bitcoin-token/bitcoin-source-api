// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import type { Network } from './types'
import ApiInsightBase from './apibase'

/**
 * Default BSV mainnet insight node url
 */
export const BSV_BCHSVEXPLORER_MAINNET_URL = 'https://bchsvexplorer.com/api'

export const Urls = [
  {
    isDefault: true,
    name: 'BSV_BCHSVEXPLORER_MAINNET_URL',
    network: 'mainnet',
    url: BSV_BCHSVEXPLORER_MAINNET_URL
  }
]

/**
 * API for BSV Insight nodes
 * @param {string} url Insight API URL
 */
export class BsvInsightApi extends ApiInsightBase {
  constructor(network: Network, url: string) {
    let foundurl = url
    if (!foundurl) {
      const searchNetwork = network || 'mainnet'
      const found = Urls.find(u => u.network === searchNetwork)
      if (found) {
        foundurl = found.url
      } else {
        throw new Error(`Cannot find any url for bsv ${searchNetwork}`)
      }
    }
    super('bsv', network, foundurl)
  }
}
