// @flow

export type OutputId = {|
  txId: string,
  outputNumber: number
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
