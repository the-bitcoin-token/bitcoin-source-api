// @flow

import { Address, Block } from 'bitcoinsource'
import RestClient from '../../src'

const TEST_ADDRESS = new Address('my9uLPBr38a4ayEkaZfcaiQArwTzYSho3y')

describe('RestClient', () => {
  describe('getAddress', () => {
    it('Should retrieve information about the test address', async () => {
      const res = await RestClient.getAddress(TEST_ADDRESS)
      expect(res).toBeDefined()
      expect(res.transactions).toBeDefined()
      expect(res.transactions.length).toBeGreaterThan(900)
    })
  })

  describe('getBalance', () => {
    it('Should retrieve the balance of the test address', async () => {
      const res = await RestClient.getBalance(TEST_ADDRESS)
      expect(res).toBeDefined()
      expect(res).toBeGreaterThan(0)
    })
  })

  describe('getBlock', () => {
    it('Should retrieve the block for a given block hash', async () => {
      const hash =
        '000000000000024814d19116110a8924450852316e47f3d0e668c800bcc77f0c'
      const res = await RestClient.getBlock(hash)
      expect(res).toBeDefined()
      expect(res.hash).toBe(hash)
    })

    it('Should retrieve the block for a given block number', async () => {
      const res = await RestClient.getBlock(1)
      expect(res).toBeDefined()
      expect(res.hash).toBe(
        '00000000b873e79784647a6c82962c70d228557d24a747ea4d1b8bbe878e1206'
      )
    })
  })

  describe('getLastBlockHash', () => {
    it('Should retrieve the latest block for a given block hash', async () => {
      const res = await RestClient.getLastBlockHash()
      expect(res).toBeDefined()
    })
  })

  describe('getRawBlock', () => {
    it('Should retrieve the raw block for a given block hash', async () => {
      const res = await RestClient.getRawBlock(
        '000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943'
      )
      expect(res).toBeDefined()
      expect(res).toBe(
        '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5494dffff001d1aa4ae180101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000'
      )
    })

    it('Should retrieve the block for a given block height', async () => {
      const res = await RestClient.getRawBlock(1)
      expect(res).toBeDefined()
      expect(res).toBe(
        '0100000043497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000bac8b0fa927c0ac8234287e33c5f74d38d354820e24756ad709d7038fc5f31f020e7494dffff001d03e4b6720101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0e0420e7494d017f062f503253482fffffffff0100f2052a010000002321021aeaf2f8638a129a3156fbe7e5ef635226b0bafd495ff03afe2c843d7e3a4b51ac00000000'
      )
    })

    it('Should parse a block to JSON', async () => {
      const blockHash =
        '000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943'
      const res = await RestClient.getRawBlock(blockHash)
      const blockBuf = Buffer.from(res, 'hex')
      const block = Block.fromBuffer(blockBuf)
      expect(block).toBeDefined()
      expect(block.header).toBeDefined()
      expect(block.transactions).toBeDefined()
    })
  })

  describe('getTransaction', () => {
    it('Should retrieve the transaction for a given id', async () => {
      const txId =
        '82dcd699b019c90f9a77f1002a006d7fccb242fa7e85f9273b33b7e49544749f'
      const res = await RestClient.getTransaction(txId)
      expect(res).toBeDefined()
      expect(res.blockhash).toBeDefined()
    })
  })

  describe('getRawTransaction', () => {
    it('Should retrieve the raw transaction for a given block id', async () => {
      const txId =
        '82dcd699b019c90f9a77f1002a006d7fccb242fa7e85f9273b33b7e49544749f'
      const res = await RestClient.getRawTransaction(txId)
      expect(res).toBeDefined()
    })
  })

  describe('getUtxos', () => {
    it('Should retrieve the utxo set of the first test address', async () => {
      const res = await RestClient.getUtxos(TEST_ADDRESS)
      expect(res).toBeDefined()
      expect(res.length).toBeGreaterThan(0)
      expect(res[0].address).toBeDefined()
      expect(res[0].txId).toBeDefined()
      expect(res[0].vout).toBeDefined()
      expect(res[0].scriptPubKey).toBeDefined()
      expect(res[0].amount).toBeDefined()
      expect(res[0].satoshis).toBeDefined()
      expect(res[0].confirmations).toBeDefined()
    })
  })

  describe('getTxo', () => {
    it('Should return a txo', async () => {
      const outputId = {
        txId:
          '288c1488e51281a551067abece9b23e8776f2d82b6e5b43bb81fc6dcac6acfe0',
        outputNumber: 0
      }
      const res = await RestClient.getTxo(outputId)
      expect(res.address).toBe('mxpsNXm5YRFzDpjjUDvbDKWZNexxRg1sWo')
      expect(res.txId).toBe(
        '288c1488e51281a551067abece9b23e8776f2d82b6e5b43bb81fc6dcac6acfe0'
      )
      expect(res.vout).toBe(0)
      expect(res.scriptPubKey).toBe(
        '76a914bddd842b249decd2527558a0bdd31be830830f4b88ac'
      )
      expect(res.amount).toBe(0.001)
      expect(res.satoshis).toBe(100000)
      expect(res.height).toBe(1251081)
      expect(res.confirmations).toBeGreaterThan(4666)
    })
  })

  /*
  TODO: Setup private keys

  describe('sendTransaction', () => {
    it('Should build and broadcast a transaction', async () => {
      const wallet = new Wallet(getTestMnemonic())
      const address = wallet.getAddress()
      const amount = config.MIN_NON_DUST_AMOUNT * 2
      const fee = config.DEFAULT_FEE
      const utxos = await wallet.getUtxos(amount + fee)
      const privateKey = wallet.getPrivateKey()

      const transaction = new DataTransaction()
      utxos.forEach(utxo => transaction.from(utxo))
      transaction.toPkhOutput(new PkhOutputData(address, amount / 2))
      transaction.toPkhOutput(new PkhOutputData(address, amount / 2))
      transaction.change(address)
      transaction.sign(privateKey)

      expect(transaction).toBeDefined()
      expect(Array.isArray(transaction.inputs)).toBe(true)
      expect(transaction.inputs.length).toBeGreaterThan(0)
      expect(Array.isArray(transaction.outputs)).toBe(true)
      expect(transaction.outputs.length).toBeGreaterThan(0) // todo: 0 -> 1
      const res = await RestClient.sendTransaction(transaction)
      expect(res).toBeDefined()
      expect(res.txId).toBeDefined()
    })
  })
  */
})
