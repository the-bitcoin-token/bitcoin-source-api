// @flow

import BitcoinSource from 'bitcoinsource'

import type { OutputId, Txo, TransactionId } from './types'

const { Address, Transaction } = BitcoinSource

/**
 * Rest API interface that all supported chains must implement
 * @interface
 */
export interface Api {
  /**
   * Retrieves a given address' history.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getAddress(address: Address): Promise<Object>;

  /**
   * Retrieves a given address' balance in satoshis.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getBalance(address: Address): Promise<number>;

  /**
   * Sends a transaction for broadcasting.
   * @returns the resulting transaction id
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  sendTransaction(transaction: Transaction): Promise<TransactionId>;

  /**
   * Retrieves a block from its hash or height.
   * @param {string | number} hashOrHeight Hash or height of the block
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getBlock(hashOrHeight: string | number): Promise<Object>;

  /**
   * Retrieves the hash of a block from its height.
   * @param {*} height Block height
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getBlockHash(height: number): Promise<string>;

  /**
   * Retrives the hash of the latest block.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getLastBlockHash(): Promise<string>;

  /**
   * Retrives a hex-formatted block given its hash or height.
   * @param {string | number} hashOrHeight Hash or height of the block
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getRawBlock(hashOrHeight: string | number): Promise<string>;

  /**
   * Retrieves a JSON-formatted transaction from its hash
   * @param {string} txId Transaction hash
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getTransaction(txId: string): Promise<Object>;

  /**
   * Retrieves a hex-formatted transaction given its hash
   * @param {*} txId Transaction hash
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getRawTransaction(txId: string): Promise<Object>;

  /**
   * Retrieves a given address' unspent outputs (UTXO set).
   * @param {Address} address Address whose UTXOs to retrieve
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getUtxos(address: Address): Promise<Array<Txo>>;

  /**
   * Gets a transaction output given an output id.
   * @param {OutputId} outputId Transaction id and output index
   * @throws {ApiError} if the request cannot be completed.
   * @memberof Api
   */
  getTxo(outputId: OutputId): Promise<Txo>;
}
