// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */

import axios from 'axios'
import BitcoinSource from 'bitcoinsource'
import BitcoinSourceApiError from './error'
import type { OutputId, Txo, TransactionId } from './types'

const { Address, Transaction } = BitcoinSource

// API constants
const BITCOIN_NETWORK = 'testnet'
const BLOCK_EXPLORER_URL =
  BITCOIN_NETWORK === 'testnet'
    ? 'https://tbch.blockdozer.com/api'
    : 'https://bch.blockdozer.com/api'

/**
 * Executes an axios request and unwraps either the resulting response or error.
 * Throws a {@link BitcoinSourceApiError} if communication with the server fails or if the
 * request results in an error status code.
 *
 * @throws {BitcoinSourceApiError}
 */
export const _unwrap = async (request: Promise<any>): Promise<any> => {
  try {
    const response = await request
    return response.data
  } catch (error) {
    if (error.response) {
      const { status, statusText, data } = error.response
      const { method, url } = error.response.config || {
        method: 'unknown',
        url: 'unknown'
      }
      const requestData = error.response.config.data
      const message =
        data.error || (data.indexOf('Code:') !== -1 ? data : statusText)
      throw new BitcoinSourceApiError(`
Communication Error

status\t${status} ${statusText}
message\t${message}
request\t${method} ${url}${requestData ? `\ndata\t${requestData}` : ''}`)
    } else {
      throw new BitcoinSourceApiError(
        'Communication error',
        'Service unavailable.'
      )
    }
  }
}

function renameProp(
  oldProp: string,
  newProp: string,
  // $FlowFixMe
  { [oldProp]: old, ...others }: Object
) {
  return { [newProp]: old, ...others }
}

/**
 * Executes a get request to the given route. Throws a {@link BitcoinSourceApiError} if the
 * request or the communication fails.
 *
 * @throws {BitcoinSourceApiError}
 */
export const _get = async (
  route: string,
  baseUrl: string = BLOCK_EXPLORER_URL
): Promise<any> => _unwrap(axios.get(`${baseUrl}${route}`))

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
): Promise<any> => _unwrap(axios.post(`${baseUrl}${route}`, data))

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
  return renameProp('txid', 'txId', res)
}

/**
 * Removes duplicates from an array of utxos
 */
export const removeDuplicates = (array: Array<any>): Array<any> =>
  array.filter(
    (el, index, self) =>
      self.findIndex(t => t.txId === el.txId && t.vout === el.vout) === index
  )

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
  const utxos = explorerUtxos.map(utxo => renameProp('txid', 'txId', utxo))

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
