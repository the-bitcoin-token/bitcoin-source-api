// @flow

import { Address, Transaction } from 'bitcoinsource'
import type { OutputId, Txo, TransactionId, Coin, Network } from './types'

/**
 * Rest API interface that all supported chains must implement
 * @interface
 */
export interface IInsightApiBasic {

  /**
   * the coin that the api manages
   */
  coin: Coin;

  /**
   * network
   */
  network: Network;

  /**
   * url string should always be passed through constructor
   */
  +url: string;

  /**
   * Retrieves a given address' history.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getAddress(address: Address): Promise<Object>;

  /**
   * Retrieves a given address' balance in satoshis.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getBalance(address: Address): Promise<number>;

  /**
   * Sends a transaction for broadcasting.
   * @returns the resulting transaction id
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  sendTransaction(transaction: Transaction): Promise<TransactionId>;

  /**
   * Retrieves the hash of a block from its height.
   * @param {*} height Block height
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getBlockHash(height: number): Promise<string>;

  /**
   * Retrives the hash of the latest block.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getLastBlockHash(): Promise<string>;

  /**
   * Retrieves a JSON-formatted transaction from its hash
   * @param {string} txId Transaction hash
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getTransaction(txId: string): Promise<Object>;

  /**
   * Retrieves a hex-formatted transaction given its hash
   * @param {*} txId Transaction hash
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getRawTransaction(txId: string): Promise<Object>;

  /**
   * Retrieves a given address' unspent outputs (UTXO set).
   * @param {Address} address Address whose UTXOs to retrieve
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getUtxos(address: Address): Promise<Array<Txo>>;

  /**
   * Gets a transaction output given an output id.
   * @param {OutputId} outputId Transaction id and output index
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   */
  getTxo(outputId: OutputId): Promise<Txo>;
}

/**
 * Rest API interface that all defines a complete implementation
 * @interface
 */
export interface IInsightApi extends IInsightApiBasic {
  /**
   * Retrieves a json-formatted block from its hash or height.
   * @param {string | number} hashOrHeight Hash or height of the block
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApi
   */
  getBlock(hashOrHeight: string | number): Promise<Object>;

  /**
   * Retrives a hex-formatted block given its hash or height.
   * @param {string | number} hashOrHeight Hash or height of the block
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApi
   */
  getRawBlock(hashOrHeight: string | number): Promise<string>;
}
