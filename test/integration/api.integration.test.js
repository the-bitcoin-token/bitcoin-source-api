// @flow

import { Address, Block, Mnemonic, Transaction } from 'bitcoinsource'
import { BchInsightApi, BCH_BLOCKDOZER_TESTNET_URL, BCH_BLOCKDOZER_MAINNET_URL } from '../../src'
import { BsvInsightApi, BSV_TESTNET_URL, BSV_MAINNET_URL } from '../../src'
import { testdata } from './testdata'

//TODO: code review
testdata.forEach(({ 
    name, network, mnemonic, api, testAddress, txId, genesisBlockHash, genesisBlockContents,
    getBlockHash, getRawBlockHash, getRawBlockContents, addressCountMinimum,
    txOutput }) => {
  describe(name, () => {
    describe('getAddress', () => {
      it('Should retrieve information about the test address', async () => {
        const res = await api.getAddress(testAddress)
        expect(res).toBeDefined()
        expect(res.addrStr).toBe(testAddress.toString())
        expect(res.balance).toBeDefined()
        expect(res.transactions).toBeDefined()
        expect(res.transactions.length).toBeGreaterThanOrEqual(addressCountMinimum)
      })
    })

    describe('getBalance', () => {
      it('Should retrieve the balance of the test address', async () => {
        const res = await api.getBalance(testAddress)
        expect(res).toBeDefined()
        expect(res).toBeGreaterThan(0)
      })
    })

    describe('getBlock', () => {
      it('Should retrieve the block for a given block hash', async () => {
        const res = await api.getBlock(getBlockHash)
        expect(res).toBeDefined()
        expect(res.hash).toBe(getBlockHash)
      })

      it('Should retrieve the block for a given block number', async () => {
        const res = await api.getBlock(1)
        expect(res).toBeDefined()
        expect(res.hash).toBe(genesisBlockHash)
      })
    })

    describe('getBlockHash', () => {
      it('Should retrieve the block hash for a given block height', async () => {
        const res = await api.getBlockHash(1)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res.length).toBe(64)
        expect(res).toBe(genesisBlockHash)
      })
    })

    describe('getLastBlockHash', () => {
      it('Should retrieve the latest block for a given block hash', async () => {
        const res = await api.getLastBlockHash()
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res.length).toBe(64)
      })
    })

    //TODO: not working on bsv because depends on rawblock
    describe('getRawBlock', () => {
      it.skip('Should retrieve the raw block for a given block hash', async () => {
        const res = await api.getRawBlock(getRawBlockHash)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res).toBe(getRawBlockContents)
      })

      it.skip('Should retrieve the block for a given block height', async () => {
        const res = await api.getRawBlock(1)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res).toBe(genesisBlockContents)
      })

      //TODO: not working on bsv because depends on rawblock
      it.skip('Should parse a block to JSON', async () => {
        const res = await api.getRawBlock(getRawBlockHash)
        const blockBuf = Buffer.from(res, 'hex')
        const block = Block.fromBuffer(blockBuf)
        expect(block).toBeDefined()
        expect(block.header).toBeDefined()
        expect(block.transactions).toBeDefined()
      })
    })

    describe('getTransaction', () => {
      it('Should retrieve the transaction json for a given id', async () => {
        const res = await api.getTransaction(txId)
        expect(res).toBeDefined()
        expect(res.txid).toBe(txId)
        expect(res.blockhash).toBeDefined()
        expect(res.version).toBeDefined()
        expect(res.locktime).toBeDefined()
        expect(res.vin).toBeDefined()
        expect(res.vin.length).toBeGreaterThan(0)
        expect(res.vin[0].vout).toBeDefined()
        expect(res.vin[0].scriptSig).toBeDefined()
        expect(res.vin[0].sequence).toBeDefined()
        expect(res.vout).toBeDefined()
        expect(res.vout.length).toBeGreaterThan(0)
        expect(res.vout[0].value).toBeDefined()
        expect(res.vout[0].n).toBeDefined()
        expect(res.vout[0].scriptPubKey).toBeDefined()
        expect(res.confirmations).toBeDefined()
        expect(res.time).toBeDefined()
        expect(res.blocktime).toBeDefined()
      })
    })

    describe('getRawTransaction', () => {
      it('Should retrieve the raw transaction for a given transaction id', async () => {
        const res = await api.getRawTransaction(txId)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res.length).toBeGreaterThan(60)
      })
    })

    describe('getUtxos', () => {
      it('Should retrieve the utxo set of the first test address', async () => {
        const res = await api.getUtxos(testAddress)
        expect(res).toBeDefined()
        expect(res.length).toBeGreaterThan(0)
        expect(res[0].spent).toBe(false)
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
      it('Should return a transaction output', async () => {
        const res = await api.getTxo({
          txId: txOutput.txId,
          outputNumber: txOutput.outputNumber
        })
        expect(res.spent).toBeDefined()
        expect(res.address).toBe(txOutput.address)
        expect(res.txId).toBe(txOutput.txId)
        expect(res.vout).toBe(txOutput.outputNumber)
        expect(res.scriptPubKey).toBe(txOutput.scriptPubKey)
        expect(res.amount).toBe(txOutput.amount)
        expect(res.satoshis).toBe(txOutput.satoshis)
        expect(res.height).toBe(txOutput.height)
        expect(res.confirmations).toBeGreaterThan(txOutput.confirmations)
      })
    })

    //todo: code review
    if (mnemonic) {
      describe('sendTransaction', () => {
        it('Should build and broadcast a transaction', async () => {
          const hdPrivateKey = Mnemonic(mnemonic).toHDPrivateKey()
          const derived = hdPrivateKey.derive("m/44'/0'/0'/1/0")
          const address = derived.publicKey.toAddress(network)
          //mvZa3E4GsfYBtGxiyuRrFha7CDPpWziEZS from "m/44'/0'/0'/0/1/0"
          //mr5DbotZmtZqCeu3sGxcdj3NbaMiPdQXq8 from "m/44'/0'/0'/1/0"
          const amount = Transaction.DUST_AMOUNT * 2
          const fee = Transaction.FEE_SECURITY_MARGIN
          //todo, wallet.getUtxos, filter by amount+fee
          const utxos = (await api.getUtxos(address)).map(u => (
            { txId: u.txId, outputIndex: u.vout, address: u.address, 
            script: u.scriptPubKey, satoshis: u.satoshis })
          )

          const transaction = new Transaction()
            .from(utxos)
          //why split outputs?
            .to(address, amount)
          //transaction.addOutput(address, amount / 2)
            .change(address)
            .sign(derived.privateKey)

          expect(transaction).toBeDefined()
          expect(transaction.isFullySigned()).toBe(true)
          expect(Array.isArray(transaction.inputs)).toBe(true)
          expect(transaction.inputs.length).toBeGreaterThan(0)
          expect(Array.isArray(transaction.outputs)).toBe(true)
          expect(transaction.outputs.length).toBeGreaterThan(0)
          const res = await api.sendTransaction(transaction)
          expect(res).toBeDefined()
          expect(res.txId).toBeDefined()
          console.log(res.txId)
        })
      })
    }
  })
})
