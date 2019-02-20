// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import { ApiBaseMinimal } from './apibase'

/**
 * Default BSV mainnet insight node url
 */
export const BSV_MAINNET_URL = 'https://bchsvexplorer.com/api'

/**
 * Default BSV testnet insight node url
 */
export const BSV_TESTNET_URL = ''

/**
 * API for BSV Insight nodes
 * @param {string} url Insight API URL
 */
export class BsvInsightApi extends ApiBaseMinimal {
}
