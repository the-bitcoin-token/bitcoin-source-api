// @flow

import { Block, Mnemonic, Transaction, Address, crypto  } from 'bitcoinsource'
import Insight from '../../src'
import data from './testdata'
import { renameProperty } from '../../src/util'
import ApiInsight from '../../src/apiinsight'

data.forEach(testdata => {
  const api = Insight.create(
    testdata.apiconfig.coin,
    testdata.apiconfig.network,
    testdata.apiconfig.url
  )

  const ifRunTest = (testName, func) =>
    testdata.runWhen(api, testName)
      ? describe(testName, func)
      : describe.skip(testName, func)

  describe(testdata.name, () => {
    describe('testing testdata', () => {
      it('must conform to a test input object that we are expecting', () => {
        expect(testdata).toBeDefined()
        expect(api).toBeDefined()
        expect(testdata.apiconfig.coin).toBeDefined()
        expect(testdata.apiconfig.network).toBeDefined()
        expect(testdata.runWhen).toBeDefined()
      })
    })

    ifRunTest('getAddress', () => {
      it('Should retrieve information about the test address', async () => {
        const res = await api.getAddress(
          new Address(testdata.testAddress, testdata.apiconfig.network)
        )
        expect(res).toBeDefined()
        expect(res.addrStr).toBe(testdata.testAddress)
        expect(res.balance).toBeDefined()
        expect(res.balanceSat).toBeDefined()
        expect(res.totalReceived).toBeDefined()
        expect(res.totalReceivedSat).toBeDefined()
        expect(res.totalSent).toBeDefined()
        expect(res.totalSentSat).toBeDefined()
        expect(res.unconfirmedBalance).toBeDefined()
        expect(res.unconfirmedBalanceSat).toBeDefined()
        expect(res.unconfirmedTxApperances).toBeDefined()
        expect(res.txApperances).toBeDefined()
        expect(res.transactions).toBeDefined()
        expect(res.transactions.length).toBeGreaterThanOrEqual(
          testdata.addressCountMinimum
        )
      }, 9000)
    })

    ifRunTest('getBalance', () => {
      it('Should retrieve the balance of the test address', async () => {
        const res = await api.getBalance(
          new Address(testdata.testAddress, testdata.apiconfig.network)
        )
        expect(res).toBeDefined()
        expect(res).toBeGreaterThan(0)
      }, 9000)
    })

    ifRunTest('getBlock', () => {
      // $FlowFixMe
      const fullapi: ApiInsight = api
      it('Should retrieve the block for a given block hash', async () => {
        const res = await fullapi.getBlock(testdata.getBlockHash)
        expect(res).toBeDefined()
        expect(res.hash).toBe(testdata.getBlockHash)
        expect(res.size).toBeGreaterThan(0)
        expect(res.height).toBeGreaterThan(0)
        expect(res.version).toBeGreaterThan(0)
        expect(res.merkleroot).toBeDefined()
        expect(res.tx).toBeDefined()
        expect(res.time).toBeGreaterThan(0)
        expect(res.nonce).toBeGreaterThan(0)
        expect(res.bits).toBeDefined()
        expect(res.difficulty).toBeGreaterThan(0)
        expect(res.chainwork).toBeDefined()
        expect(res.confirmations).toBeGreaterThan(0)
        expect(res.previousblockhash).toBeDefined()
        expect(res.nextblockhash).toBeDefined()
        expect(res.reward).toBeDefined()
        expect(res.isMainChain).toBeDefined()
        // expect(res.poolInfo).toBeDefined()
      }, 10000)

      it('Should retrieve the block for a given block number', async () => {
        const res = await fullapi.getBlock(1)
        expect(res).toBeDefined()
        expect(res.hash).toBe(testdata.genesisBlockHash)
      }, 10000)
    })

    ifRunTest('getBlockHash', () => {
      it('Should retrieve the block hash for a given block height', async () => {
        const res = await api.getBlockHash(1)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res.length).toBe(64)
        expect(res).toBe(testdata.genesisBlockHash)
      })
    })

    ifRunTest('getLastBlockHash', () => {
      it('Should retrieve the latest block for a given block hash', async () => {
        const res = await api.getLastBlockHash()
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res.length).toBe(64)
      })
    })

    ifRunTest('getRawBlock', () => {
      // $FlowFixMe
      const fullapi: ApiInsight = api
      it('Should retrieve the raw block for a given block hash', async () => {
        const res = await fullapi.getRawBlock(testdata.getRawBlockHash)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res).toBe(testdata.getRawBlockContents)
      }, 9000)

      it('Should retrieve the block for a given block height', async () => {
        const res = await fullapi.getRawBlock(1)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res).toBe(testdata.genesisBlockContents)
      }, 9000)

      it('Should parse a block to JSON', async () => {
        const res = await fullapi.getRawBlock(testdata.getRawBlockHash)
        const blockBuf = Buffer.from(res, 'hex')
        const block = Block.fromBuffer(blockBuf)
        expect(block).toBeDefined()
        expect(block.header).toBeDefined()
        expect(block.transactions).toBeDefined()
      }, 9000)
    })

    ifRunTest('getTransaction', () => {
      it('Should retrieve the transaction json for a given id', async () => {
        const res = await api.getTransaction(testdata.txId)
        expect(res).toBeDefined()
        expect(res.txid).toBe(testdata.txId)
        expect(res.version).toBeDefined()
        expect(res.locktime).toBeDefined()
        expect(res.vin).toBeDefined()
        expect(res.vin.length).toBeGreaterThan(0)
        expect(res.vin[0].txid).toBeDefined()
        expect(res.vin[0].n).toBeDefined()
        expect(res.vin[0].vout).toBeDefined()
        expect(res.vin[0].scriptSig).toBeDefined()
        expect(res.vin[0].addr).toBeDefined()
        expect(res.vin[0].sequence).toBeDefined()
        expect(res.vin[0].value).toBeDefined()
        expect(res.vin[0].valueSat).toBeDefined()
        expect(res.vout).toBeDefined()
        expect(res.vout.length).toBeGreaterThan(0)
        expect(res.vout[0].value).toBeDefined()
        expect(res.vout[0].n).toBeDefined()
        expect(res.vout[0].scriptPubKey).toBeDefined()
        expect(res.vout[0].spentTxId).toBeDefined()
        expect(res.vout[0].spentIndex).toBeDefined()
        expect(res.vout[0].spentHeight).toBeDefined()
        expect(res.blockhash).toBeDefined()
        expect(res.blockheight).toBeDefined()
        expect(res.confirmations).toBeDefined()
        expect(res.time).toBeDefined()
        expect(res.blocktime).toBeDefined()
        expect(res.valueOut).toBeDefined()
        // expect(res.size).toBeDefined()
        expect(res.valueIn).toBeDefined()
        expect(res.fees).toBeDefined()
      })
      it('Should retrieve the transaction json for a coinbase tx', async () => {
        const res = await api.getTransaction(testdata.coinbaseTxId)
        expect(res).toBeDefined()
        expect(res.txid).toBe(testdata.coinbaseTxId)
        expect(res.version).toBeDefined()
        expect(res.locktime).toBeDefined()
        expect(res.vin).toBeDefined()
        expect(res.vin.length).toBe(1)
        expect(res.vin[0].coinbase).toBeDefined()
        expect(res.vin[0].txid).toBeUndefined()
        expect(res.vin[0].n).toBeDefined()
        expect(res.vin[0].vout).toBeUndefined()
        expect(res.vin[0].scriptSig).toBeUndefined()
        expect(res.vin[0].addr).toBeUndefined()
        expect(res.vin[0].sequence).toBeDefined()
        expect(res.vin[0].value).toBeUndefined()
        expect(res.vin[0].valueSat).toBeUndefined()
        expect(res.vout).toBeDefined()
        expect(res.vout.length).toBeGreaterThan(0)
        expect(res.vout[0].value).toBeDefined()
        expect(res.vout[0].n).toBeDefined()
        expect(res.vout[0].scriptPubKey).toBeDefined()
        expect(res.vout[0].spentTxId).toBeDefined()
        expect(res.vout[0].spentIndex).toBeDefined()
        expect(res.vout[0].spentHeight).toBeDefined()
        expect(res.blockhash).toBeDefined()
        expect(res.blockheight).toBeDefined()
        expect(res.confirmations).toBeDefined()
        expect(res.time).toBeDefined()
        expect(res.blocktime).toBeDefined()
        expect(res.valueOut).toBeDefined()
        expect(res.isCoinBase).toBeTruthy()
        expect(res.valueIn).toBeUndefined()
        expect(res.fees).toBeUndefined()
      })
    })

    ifRunTest('getRawTransaction', () => {
      it('Should retrieve the raw transaction for a given transaction id', async () => {
        const res = await api.getRawTransaction(testdata.txId)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res.length).toBeGreaterThan(60)
      })
    })

    ifRunTest('getUtxos', () => {
      it('Should retrieve the utxo set of the first test address', async () => {
        const res = await api.getUtxos(
          new Address(testdata.testAddress, testdata.apiconfig.network)
        )
        expect(res).toBeDefined()
        expect(res.length).toBeGreaterThan(0)
        expect(res[0].spent).toBe(false)
        expect(res[0].address).toBeDefined()
        expect(res[0].txId).toBeDefined()
        expect(res[0].vout).toBeDefined()
        expect(res[0].scriptPubKey).toBeDefined()
        expect(res[0].amount).toBeDefined()
        expect(res[0].satoshis).toBeDefined()
        // height can be undefined if tx is not confirmed!
        // expect(res[0].height).toBeDefined()
        expect(res[0].confirmations).toBeDefined()
      }, 15000)
    })

    ifRunTest('getTxo', () => {
      it('Should return a transaction output', async () => {
        const res = await api.getTxo({
          txId: testdata.txOutput.txId,
          outputIndex: testdata.txOutput.outputIndex
        })
        expect(res.spent).toBeDefined()
        expect(res.address).toBe(testdata.txOutput.address)
        expect(res.txId).toBe(testdata.txOutput.txId)
        expect(res.vout).toBe(testdata.txOutput.outputIndex)
        expect(res.scriptPubKey).toBe(testdata.txOutput.scriptPubKey)
        expect(res.amount).toBe(testdata.txOutput.amount)
        expect(res.satoshis).toBe(testdata.txOutput.satoshis)
        expect(res.height).toBe(testdata.txOutput.height)
        expect(res.confirmations).toBeGreaterThan(
          testdata.txOutput.confirmations
        )
      })
    })

    ifRunTest('sendTransaction', () => {
      it('should build and broadcast a transaction', async () => {
        const hdPrivateKey = Mnemonic(testdata.mnemonic).toHDPrivateKey()
        const derived = hdPrivateKey.derive("m/44'/0'/0'/1/0")
        const address = derived.publicKey.toAddress(testdata.apiconfig.network)
        const amount = Transaction.DUST_AMOUNT
        const utxos = (await api.getUtxos(address)).map(u =>
          renameProperty(
            'vout',
            'outputIndex',
            renameProperty('script', 'scriptPubKey', u)
          )
        )
        const sigtype =
          api.coin === 'btc'
            ? crypto.Signature.SIGHASH_ALL
            : crypto.Signature.SIGHASH_ALL | crypto.Signature.SIGHASH_FORKID

        const transaction = new Transaction()
          .from(utxos)
          .to(address, amount)
          .change(address)
          .sign(derived.privateKey, sigtype)

        expect(transaction).toBeDefined()
        expect(transaction.isFullySigned()).toBe(true)
        expect(Array.isArray(transaction.inputs)).toBe(true)
        expect(transaction.inputs.length).toBeGreaterThan(0)
        expect(Array.isArray(transaction.outputs)).toBe(true)
        expect(transaction.outputs.length).toBeGreaterThan(0)
        const res = await api.sendTransaction(transaction)
        expect(res).toBeDefined()
        expect(res.txId).toBeDefined()
        console.log(`Broadcasted ${api.coin} ${api.network}: ${res.txId}`)
      })
    })
  })
})
