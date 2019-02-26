// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import { Address } from 'bitcoinsource'
import type { Coin, Network } from '../types'
import { Urls } from '../urls'
import ApiInsight from '../apiinsight'
import { removeDuplicates, renameProperty, unwrapAxiosResponse } from '../util'

const thiscoin: Coin = 'bch'

/**
 * Default BCH mainnet insight node url
 */
export const BCH_BLOCKDOZER_MAINNET_URL = 'https://bch.blockdozer.com/api'

/**
 * Default BCH testnet insight node url
 */
export const BCH_BLOCKDOZER_TESTNET_URL = 'https://tbch.blockdozer.com/api'

// Urls.push({
//   isDefault: true,
//   name: 'BCH_BLOCKDOZER_MAINNET_URL',
//   coin: thiscoin,
//   network: 'mainnet',
//   url: BCH_BLOCKDOZER_MAINNET_URL
// })
// Urls.push({
//   isDefault: true,
//   name: 'BCH_BLOCKDOZER_TESTNET_URL',
//   coin: thiscoin,
//   network: 'testnet',
//   url: BCH_BLOCKDOZER_TESTNET_URL
// })

Urls.push({
  isDefault: false,
  name: 'BCH_BITPAY_MAINNET_URL',
  coin: thiscoin,
  network: 'mainnet',
  url: 'https://bch-insight.bitpay.com/api'
})
Urls.push({
  isDefault: false,
  name: 'BCH_BITPAY_TESTNET_URL',
  coin: thiscoin,
  network: 'testnet',
  url: 'https://test-bch-insight.bitpay.com/api'
})

/**
 * API for BCH Insight nodes
 * @param {string} url Insight API URL
 */
export class BchInsightApi extends ApiInsight {
  _addressFormat: string

  get addressFormat():string { this._addressFormat }
  set addressFormat(value) {
    this._addressFormat = value
  }

  constructor(network: Network, url: string) {
    super(thiscoin, network, url)
  }

  getAddress(address: Address): Promise<Object> {
    //bch api may expect cashaddr format
    return this._get(`/addr/${address.toString(this._addressFormat || 'legacy')}`)
  }

  async getUtxos(address: Address): Promise<Array<Txo>> {
    //bch api may expect cashaddr format
    const addressString = address.toString(this._addressFormat || 'legacy')
    const explorerUtxos = await this._get(`/addr/${addressString}/utxo`)
    const utxos = explorerUtxos.map(utxo =>
      renameProperty('txid', 'txId', utxo)
    )

    // { outputIndex: 0,
    //   scriptPubKey: '76a91473cb587449d1772aa702293911686c3e20957ecc88ac',
    //   txId:
    //    'd2e39d4c775afaaa238950b38b638d2e4115216c4b9b29436a7025647c10f4a7',
    //   address: 'qpeukkr5f8ghw248qg5njytgdslzp9t7esun7vaq60',
    //   amount: 0.00001092,
    //   satoshis: 1092,
    //   height: 1286603,
    //   confirmations: 1190,
    //   spent: false }

    // the insight api might return a list with duplicates we need to eliminate
    const deDuplicatedUtxso = removeDuplicates(utxos)
    // address in cashaddr format but build transaction needs legacy format
    return deDuplicatedUtxso.map(utxo => {
      utxo.spent = false
      utxo.temp = `${(this._network === 'testnet' ? 'bchtest:' : 'bitcoincash:' )}${utxo.address}`
      utxo.plain = new Address(`${utxo.address}`, this._network, 'pubkeyhash')
      utxo.legacy = Address.fromString(
        `${(this._network === 'testnet' ? 'bchtest:' : 'bitcoincash:' )}${utxo.address}`,
        this._network,
        Address.PayToPublicKeyHash,
        Address.CashAddrFormat
      ).toString(
        this._addressFormat || 'legacy'
      ).replace('bchtest:','').replace('bitcoincash:','')
      return utxo
    })
  }

}
