// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import { Address, Transaction } from 'bitcoinsource'
import { Api } from './api'
import { ApiBase } from './apibase'
import ApiError from './error'
import type { OutputId, TransactionId, Txo } from './types'
import { removeDuplicates, renameProperty } from './util'

/**
 * Default BCH mainnet insight node url
 */
export const BCH_BLOCKDOZER_MAINNET_URL = 'https://bch.blockdozer.com/api'

/**
 * Default BCH testnet insight node url
 */
export const BCH_BLOCKDOZER_TESTNET_URL = 'https://tbch.blockdozer.com/api'

/**
 * API for BCH Insight nodes
 * @param {string} url Insight API URL
 */
export class BchInsightApi extends ApiBase implements Api {

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
    const blockInfo = await this._get(`/rawblock/${hash}`)
    return blockInfo.rawblock
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
