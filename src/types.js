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

export type Coin = 'bch' | 'bsv' | 'btc' | 'ltc'

export type Network = 'mainnet' | 'testnet'

export type ApiConfiguration = {|
  coin: Coin,
  network?: Network,
  url?: string
|}
