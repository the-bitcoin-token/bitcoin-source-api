// @flow

import BitcoinSource from 'bitcoinsource'

import type { OutputId, Txo, TransactionId } from './types'

const { Address, Transaction } = BitcoinSource

/**
 * Rest API interface that all supported chains must implement
 */
export interface Api {
  /**
   * Retrieves the given address' history.
   * @throws a {@link ApiError} if the request cannot be completed.
   */
  getAddress(address: Address): Promise<Object>;

  /**
   * Retrieves the given address' balance in satoshis.
   * @throws a {@link ApiError} if the request cannot be completed.
   */
  getBalance(address: Address): Promise<number>;

  /**
   * Sends a transaction for broadcasting
   * @returns the resulting transaction id
   * @throws a {@link ApiError} if the request cannot be completed.
   */
  sendTransaction(transaction: Transaction): Promise<TransactionId>;

  getBlock(hashOrHeight: string | number): Promise<Object>;
  getBlockHash(height: number): Promise<string>;
  getLastBlockHash(): Promise<string>;
  getRawBlock(hashOrHeight: string | number): Promise<string>;
  getTransaction(txId: string): Promise<Object>;
  getRawTransaction(txId: string): Promise<Object>;

  /**
   * Retrieves the given address' unspent outputs (UTXO set).
   * @throws a {@link ApiError} if the request cannot be completed.
   */
  getUtxos(address: Address): Promise<Array<Txo>>;

  getTxo(outputId: OutputId): Promise<Txo>;
}
