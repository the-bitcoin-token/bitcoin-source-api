// @flow

export type OutputId = {|
  txId: string,
  outputIndex: number
|}

export type TransactionId = {|
  txId: string
|}

export type Txo = {|
  address: string,
  txId: string,
  vout: number,
  scriptPubKey: string,
  amount: number,
  satoshis: number,
  height: number,
  confirmations: number,
  spent: boolean
|}

/**
 * Coins that have been tested with the API
 */
export type Coin = 'bch' | 'bsv' | 'btc' | 'ltc'

/**
 * Coin Networks
 */
export type Network = 'mainnet' | 'testnet'
