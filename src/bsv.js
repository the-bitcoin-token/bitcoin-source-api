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

/**
 * API for BSV Insight nodes
 * @param {string} url Insight API URL
 */
export class BsvInsightApi extends ApiInsightBase {
  constructor(network: Network, url: string) {
    super('bsv', network, url)
  }
}
