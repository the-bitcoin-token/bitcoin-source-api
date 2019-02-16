// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import axios from 'axios'
import BitcoinSource from 'bitcoinsource'
import { Api } from './api'
import ApiError from './error'
import type { OutputId, TransactionId, Txo } from './types'
import { removeDuplicates, renameProperty, unwrapAxiosResponse } from './util'

const { Address, Transaction } = BitcoinSource

/**
 * Default BSV mainnet insight node url
 */
//api is not yet standard, everything inside a data key
export const BSV_MAINNET_BITINDEX_URL = 'https://www.bitindex.network/'
//bchsvexplorer very close to standard insight but missing /rawblock
export const BSV_MAINNET_URL = 'https://bchsvexplorer.com/api'

/**
 * Default BSV testnet insight node url
 */
export const BSV_TESTNET_URL = 'https://testnet.bitcoincloud.net/api'

/**
 * API for BSV Insight nodes
 * @param {string} url Insight API URL
 */
export class BsvInsightApi implements Api {
  _url: string

  constructor(url: string) {
    this._url = url
  }

  _get(route: string): Promise<any> {
    return unwrapAxiosResponse(axios.get(`${this._url}${route}`))
  }

  _post(route: string, data: Object): Promise<any> {
    return unwrapAxiosResponse(axios.post(`${this._url}${route}`, data))
  }

  async _hashOrHeightToHash(hashOrHeight: string | number): Promise<string> {
    if (typeof hashOrHeight === 'string') {
      return Promise.resolve(hashOrHeight)
    } else if (typeof hashOrHeight === 'number') {
      const hashInfo = await this._get(`/block-index/${hashOrHeight}`)
      return hashInfo.blockHash
    }
    throw new Error('input to getBlock must be a string or a number')
  }

  getAddress(address: Address): Promise<Object> {
    return this._get(`/addr/${address.toString()}`)
  }

  async getBalance(address: Address): Promise<number> {
    const { balanceSat, unconfirmedBalanceSat } = await this.getAddress(address)
    return balanceSat + unconfirmedBalanceSat
  }

  async sendTransaction(transaction: Transaction): Promise<TransactionId> {
    const res = await this._post('/tx/send', { rawtx: transaction.toString() })
    return renameProperty('txid', 'txId', res)
  }

  async getBlock(hashOrHeight: string | number): Promise<Object> {
    const hash = await this._hashOrHeightToHash(hashOrHeight)
    return this._get(`/block/${hash}`)
  }

  async getBlockHash(height: number): Promise<string> {
    const blockHashInfo = await this._get(`/block-index/${height}`)
    return blockHashInfo.blockHash
  }

  async getLastBlockHash(): Promise<string> {
    const blockHashInfo = await this._get(`/status?q=getLastBlockHash`)
    return blockHashInfo.lastblockhash
  }

  async getRawBlock(hashOrHeight: string | number): Promise<string> {
    const hash = await this._hashOrHeightToHash(hashOrHeight)
    //seems rawblock is not supported yet on any bsv explorer
    //closes seems to be https://bsv-chain.api.btc.com/v3/block/3
    const blockInfo = await this._get(`/rawblock/${hash}`)
    return blockInfo.rawblock
  }

  //TODO: code review. is adding async here ok?
  async getTransaction(txId: string): Promise<Object> {
    //raw tx for bchsvexplorer
    const transactionInfo = await this._get(`/tx/${txId}`)
    //add .data for bitindex
    return transactionInfo
  }

  async getRawTransaction(txId: string): Promise<Object> {
    //rawtx for bchsvexplorer, tx for bitindex
    const transactionInfo = await this._get(`/rawtx/${txId}`)
    //rawtx for bchsvexplorer, .data.hex for bitindex
    return transactionInfo.rawtx
  }

  async getUtxos(address: Address): Promise<Array<Txo>> {
    const addressString = address.toString()
    const explorerUtxos = await this._get(`/addr/${addressString}/utxo`)
    const utxos = explorerUtxos.map(utxo =>
      renameProperty('txid', 'txId', utxo)
    )

    // the insight api might return a list with duplicates we need to eliminate
    const deDuplicatedUtxso = removeDuplicates(utxos)
    return deDuplicatedUtxso.map(utxo => {
      utxo.spent = false
      return utxo
    })
  }

  async getTxo(outputId: OutputId): Promise<Txo> {
    const transaction = await this.getTransaction(outputId.txId)
    const output = transaction.vout[outputId.outputNumber]

    const address = output.scriptPubKey.addresses[0]
    const { txId } = outputId
    const vout = outputId.outputNumber
    const amount = parseFloat(output.value)
    const satoshis = amount * 1e8
    const height = transaction.blockheight
    const { confirmations } = transaction
    const spent = !!output.spentTxId
    const scriptPubKey = output.scriptPubKey.hex
    return {
      address,
      txId,
      vout,
      scriptPubKey,
      amount,
      satoshis,
      height,
      confirmations,
      spent
    }
  }
}
