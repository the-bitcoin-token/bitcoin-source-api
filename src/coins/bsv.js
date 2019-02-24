// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import type { Coin, Network } from '../types'
import { Urls } from '../urls'
import ApiInsightBase from '../apiinsightbase'

const thiscoin: Coin = 'bsv'

/**
 * Default BSV mainnet insight node url
 */
export const BSV_BCHSVEXPLORER_MAINNET_URL = 'https://bchsvexplorer.com/api'

Urls.push({
  isDefault: true,
  name: 'BSV_BCHSVEXPLORER_MAINNET_URL',
  coin: thiscoin,
  network: 'mainnet',
  url: BSV_BCHSVEXPLORER_MAINNET_URL
})

/**
 * API for BSV Insight nodes
 * @param {string} url Insight API URL
 */
export class BsvInsightApi extends ApiInsightBase {
  constructor(network: Network, url: string) {
    super(thiscoin, network, url)
  }
}
