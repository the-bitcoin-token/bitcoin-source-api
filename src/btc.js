// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import { ApiInsight } from './apibase'

/**
 * Default BTC mainnet insight node url
 */
export const BTC_MAINNET_URL = 'https://insight.bitpay.com/api'

/**
 * Default BTC testnet insight node url
 */
export const BTC_TESTNET_URL = 'https://test-insight.bitpay.com/api'

/**
 * API for BTC Insight nodes
 * @param {string} url Insight API URL
 */
export class BtcInsightApi extends ApiInsight {}
