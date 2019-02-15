// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import axios from 'axios'
import BitcoinSource from 'bitcoinsource'
import BitcoinSourceApiError from './error'
import type { OutputId, TransactionId, Txo } from './types'
import { removeDuplicates, renameProperty, unwrapAxiosResponse } from './util'

const { Address, Transaction } = BitcoinSource

// API constants
const BITCOIN_NETWORK = 'testnet'
const BLOCK_EXPLORER_URL =
  BITCOIN_NETWORK === 'testnet'
    ? 'https://tbch.blockdozer.com/api'
    : 'https://bch.blockdozer.com/api'

/**
 * Executes a get request to the given route. Throws a {@link BitcoinSourceApiError} if the
 * request or the communication fails.
 *
 * @throws {BitcoinSourceApiError}
 */
export const _get = async (
  route: string,
  baseUrl: string = BLOCK_EXPLORER_URL
): Promise<any> => unwrapAxiosResponse(axios.get(`${baseUrl}${route}`))

/**
 * Executes a post request to the given route with the given data as body.
 * Throws a {@link BitcoinSourceApiError} if the request or the communication fails.
 *
 * @returns {*}
 * @throws {BitcoinSourceApiError}
 */
export const _post = async (
  route: string,
  data: Object,
  baseUrl: string = BLOCK_EXPLORER_URL
): Promise<any> => unwrapAxiosResponse(axios.post(`${baseUrl}${route}`, data))

/* ---- Blockchain Api ---- */

/**
 * Retrieves the given address' history, or throws a {@link BitcoinSourceApiError} if the
 * request cannot be completed.
 *
 * @throws {BitcoinSourceApiError}
 */
export const getAddress = async (address: Address): Promise<Object> =>
  _get(`/addr/${address.toString()}`)

/**
 * Retrieves the given address' balance in satoshis, or throws a
 * {@link BitcoinSourceApiError} if the request cannot be completed.
 *
 * @throws {BitcoinSourceApiError}
 */
export const getBalance = async (address: Address): Promise<number> => {
  const { balanceSat, unconfirmedBalanceSat } = await getAddress(address)
  return balanceSat + unconfirmedBalanceSat
}

/**
 * Sends a raw, hex-encoded transaction for broadcasting. Returns the resulting
 * transaction's id, or throws a {@link BitcoinSourceApiError} if the request cannot be
 * completed.
 *
 * @throws {BitcoinSourceApiError}
 */
export const sendTransaction = async (
  transaction: Transaction
): Promise<TransactionId> => {
  const res = await _post('/tx/send', { rawtx: transaction.toString() })
  return renameProperty('txid', 'txId', res)
}

async function hashOrHeightToHash(
  hashOrHeight: string | number
): Promise<string> {
  if (typeof hashOrHeight === 'string') {
    return Promise.resolve(hashOrHeight)
  } else if (typeof hashOrHeight === 'number') {
    const hashInfo = await _get(`/block-index/${hashOrHeight}`)
    return hashInfo.blockHash
  }
  throw new Error('input to RestClient.getBlock must be a string or a number')
}

export const getBlock = async (
  hashOrHeight: string | number
): Promise<Object> => {
  const hash = await hashOrHeightToHash(hashOrHeight)
  return _get(`/block/${hash}`)
}

export const getBlockHash = async (height: number): Promise<string> => {
  const blockHashInfo = await _get(`/block-index/${height}`)
  return blockHashInfo.blockHash
}

export const getLastBlockHash = async (): Promise<string> => {
  const blockHashInfo = await _get(`/status?q=getLastBlockHash`)
  return blockHashInfo.lastblockhash
}

export const getRawBlock = async (
  hashOrHeight: string | number
): Promise<string> => {
  const hash = await hashOrHeightToHash(hashOrHeight)
  const blockInfo = await _get(`/rawblock/${hash}`)
  return blockInfo.rawblock
}

export const getTransaction = async (txId: string): Promise<Object> =>
  _get(`/tx/${txId}`)

export const getRawTransaction = async (txId: string): Promise<Object> => {
  const transactionInfo = await _get(`/rawtx/${txId}`)
  return transactionInfo.rawtx
}

/**
 * Retrieves the given address' unspent outputs(UTXO set), or throws a
 * {@link BitcoinSourceApiError} if the request cannot be completed.
 *
 * @throws {BitcoinSourceApiError}
 */
export const getUtxos = async (address: Address): Promise<Array<Txo>> => {
  const addressString = address.toString()
  const explorerUtxos = await _get(`/addr/${addressString}/utxo`)
  const utxos = explorerUtxos.map(utxo => renameProperty('txid', 'txId', utxo))

  // the insight api might return a list with duplicates we need to eliminate
  const deDuplicatedUtxso = removeDuplicates(utxos)
  return deDuplicatedUtxso.map(utxo => {
    utxo.spent = false
    return utxo
  })
}

export const getTxo = async (outputId: OutputId): Promise<Txo> => {
  const transaction = await getTransaction(outputId.txId)
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
