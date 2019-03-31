// @flow

import type { Address } from 'bitcoin-source'
import { Transaction } from 'bitcoin-source'
import type { Txo, TransactionId, Coin, Network } from './types'

const { OutputId } = Transaction

/**
 * REST API interface that all supported chains must implement.
 * @interface
 */
export interface IInsightApiBasic {
  /**
   * The coin that the api is configured for.
   */
  +coin: Coin;

  /**
   * The network that the api is configured for. (i.e. mainnet vs testnet)
   */
  +network: Network;

  /**
   * The url string for the REST API.
   */
  +url: string;

  /**
   * Retrieves a given address' history.
   * @throws {ApiError} If the request cannot be completed.
   * @memberof IInsightApiBasic Insight interface
   * @param {Address} address to get history for
   * @returns {Promise<Object>} Address balance and a list of transaction history for the address
   */
  getAddress(address: Address): Promise<Object>;

  /**
   * Retrieves a given address' balance in satoshis.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @param {Address} address to get balance of
   * @returns {Promise<number>} the balance of the address
   */
  getBalance(address: Address): Promise<number>;

  /**
   * Sends a transaction for broadcasting to the network.
   * @returns the resulting transaction id
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @param {Transaction} the transaction to send
   * @returns {Promise<TransactionId>} a json object with the TxId that was sent
   */
  sendTransaction(transaction: Transaction): Promise<TransactionId>;

  /**
   * Retrieves the hash of a block from its height.
   * @param {*} height Block height
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @param {number} Integer. The block height to get
   * @returns {Promise<string>} a hex string containing the block hash
   */
  getBlockHash(height: number): Promise<string>;

  /**
   * Retrives the hash of the latest block.
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @returns {Promise<string>} a hex string containing the block hash of the most recent block
   */
  getLastBlockHash(): Promise<string>;

  /**
   * Retrieves a JSON-formatted transaction from its hash.
   * @param {string} txId Transaction hash
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @returns {Promise<string>} a JSON object of the decoded transaction
   */
  getTransaction(txId: string): Promise<Object>;

  /**
   * Retrieves a hex-formatted transaction given its hash.
   * @param {string} txId Transaction hash
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @returns {Promise<string>} a hex string containing the transaction bytes
   */
  getRawTransaction(txId: string): Promise<Object>;

  /**
   * Retrieves a given address' unspent outputs (UTXO set).
   * @param {Address} address Address whose UTXOs are to be retrieved
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @returns {Promise<Array<Txo>>} An array of unspent transaction outputs (UTXO) for the address
   */
  getUtxos(address: Address): Promise<Array<Txo>>;

  /**
   * Gets a transaction output given an output id.
   * @param {OutputId} outputId a JSON object containing the Transaction Id and output index to get
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApiBasic
   * @returns {Promise<Txo>} A Transaction output
   */
  getTxo(outputId: OutputId): Promise<Txo>;
}

/**
 * A REST API interface that all Insight APIs should implement to be considered complete
 * @interface
 */
export interface IInsightApi extends IInsightApiBasic {
  /**
   * Retrieves a JSON-formatted block from its hash or height.
   * @param {string | number} hashOrHeight Hash or height of the block
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApi
   * @returns {Promise<Object>} a JSON object of the block contents
   */
  getBlock(hashOrHeight: string | number): Promise<Object>;

  /**
   * Retrives a hex-formatted block given its hash or height.
   * @param {string | number} hashOrHeight Hash or height of the block
   * @throws {ApiError} if the request cannot be completed.
   * @memberof IInsightApi
   * @returns {Promise<string>} a hex string of the block contents
   */
  getRawBlock(hashOrHeight: string | number): Promise<string>;
}
