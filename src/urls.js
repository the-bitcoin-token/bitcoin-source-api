// @flow
/* eslint-disable prefer-destructuring */

import type { ApiUrl, Coin, Network } from './types'
/**
 * global object for holding named api urls
 *
 */

export const Urls: ApiUrl[] = []

/**
 * Finds a url by coin and network, returns the defaul url if there is one
 * @param {Coin} coin
 * @param {Network} network
 */
export const findUrl = (coin: Coin, network: Network) => {
  let foundUrl: ApiUrl
  const found = Urls.filter(u => u.coin === coin && u.network === network)
  if (found.length === 1) {
    foundUrl = found[0]
  } else {
    // found multiple candidates, find any default
    const foundDefault = found.filter(u => u.isDefault)
    if (foundDefault) {
      foundUrl = foundDefault[0]
    }
    // no defaults, just return the first one
    foundUrl = found[0]
  }
  return foundUrl
}
