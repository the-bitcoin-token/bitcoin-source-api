// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */
import axios from 'axios'
import { Address, Transaction } from 'bitcoinsource'
import { IInsightApi, IInsightApiBasic } from './api'
import ApiError from './error'
import type {
  Coin,
  Network,
  OutputId,
  TransactionId,
  Txo
} from './types'
import { removeDuplicates, renameProperty, unwrapAxiosResponse } from './util'

/**
 * Base class for implementing Api
 */
export default class ApiInsightBase implements IInsightApiBasic {
  _url: string
  _coin: Coin
  _network: Network

  /**
   *
   * @param {string} url Insight API URL
   */
  constructor(coin: Coin, network?: Network, url: string) {
    this._coin = coin
    this._network = network || 'mainnet'
    this._url = url
    if (!url) {
      throw new Error(`Url parameter is required`)
    }
  }

  get url(): string {
    return this._url
  }

  get coin(): Coin {
    return this._coin
  }

  get network(): Network {
    return this._network
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

  async getBlockHash(height: number): Promise<string> {
    const blockHashInfo = await this._get(`/block-index/${height}`)
    return blockHashInfo.blockHash
  }

  async getLastBlockHash(): Promise<string> {
    const blockHashInfo = await this._get(`/status?q=getLastBlockHash`)
    return blockHashInfo.lastblockhash
  }

  getTransaction(txId: string): Promise<Object> {
    return this._get(`/tx/${txId}`)
  }

  async getRawTransaction(txId: string): Promise<Object> {
    const transactionInfo = await this._get(`/rawtx/${txId}`)
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
    const output = transaction.vout[outputId.outputIndex]
    // op_return output does not have an addresses key
    const address = (output.scriptPubKey.addresses || [''])[0]
    const { txId } = outputId
    const vout = outputId.outputIndex
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
