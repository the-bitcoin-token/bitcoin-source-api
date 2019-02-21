// @flow

import { Block, Mnemonic, Transaction } from 'bitcoinsource'
import { testdata } from './testdata'
import { renameProperty } from '../../src/util'

testdata.forEach(
  ({
    name,
    skipTests,
    mnemonic,
    api,
    testAddress,
    txId,
    genesisBlockHash,
    genesisBlockContents,
    getBlockHash,
    getRawBlockHash,
    getRawBlockContents,
    addressCountMinimum,
    txOutput
  }) => {
    describe(name, () => {
      describe('getAddress', () => {
        it('Should retrieve information about the test address', async () => {
          const res = await api.getAddress(testAddress)
          expect(res).toBeDefined()
          expect(res.addrStr).toBe(testAddress.toString())
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
            addressCountMinimum
          )
        })
      })

      describe('getBalance', () => {
        it('Should retrieve the balance of the test address', async () => {
          const res = await api.getBalance(testAddress)
          expect(res).toBeDefined()
          expect(res).toBeGreaterThan(0)
        })
      })

      const testIfBlock = typeof api.getBlock === 'function' ? it : it.skip
      describe('getBlock', () => {
        testIfBlock(
          'Should retrieve the block for a given block hash',
          async () => {
            const res = await api.getBlock(getBlockHash)
            expect(res).toBeDefined()
            expect(res.hash).toBe(getBlockHash)
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
          },
          10000
        )

        testIfBlock(
          'Should retrieve the block for a given block number',
          async () => {
            const res = await api.getBlock(1)
            expect(res).toBeDefined()
            expect(res.hash).toBe(genesisBlockHash)
          },
          10000
        )
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

      const testIfRawBlock =
        typeof api.getRawBlock === 'function' ? it : it.skip
      describe('getRawBlock', () => {
        testIfRawBlock(
          'Should retrieve the raw block for a given block hash',
          async () => {
            const res = await api.getRawBlock(getRawBlockHash)
            expect(res).toBeDefined()
            expect(res.indexOf(' ')).toBe(-1)
            expect(res).toBe(getRawBlockContents)
          },
          9000
        )

        testIfRawBlock(
          'Should retrieve the block for a given block height',
          async () => {
            const res = await api.getRawBlock(1)
            expect(res).toBeDefined()
            expect(res.indexOf(' ')).toBe(-1)
            expect(res).toBe(genesisBlockContents)
          },
          9000
        )

        testIfRawBlock(
          'Should parse a block to JSON',
          async () => {
            const res = await api.getRawBlock(getRawBlockHash)
            const blockBuf = Buffer.from(res, 'hex')
            const block = Block.fromBuffer(blockBuf)
            expect(block).toBeDefined()
            expect(block.header).toBeDefined()
            expect(block.transactions).toBeDefined()
          },
          9000
        )
      })

      describe('getTransaction', () => {
        it('Should retrieve the transaction json for a given id', async () => {
          const res = await api.getTransaction(txId)
          expect(res).toBeDefined()
          expect(res.txid).toBe(txId)
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
          expect(res[0].height).toBeDefined()
          expect(res[0].confirmations).toBeDefined()
        }, 9000)
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

      // some tests are skipped because not all api methods are valid on all coins
      // for example, BSV large blocks might not be appropriate for downloading through insight api
      const testIfNotSkip = nameOfTest =>
        typeof skipTests === 'undefined' || !skipTests.includes(nameOfTest)
          ? it
          : it.skip

      describe('sendTransaction', () => {
        testIfNotSkip('sendTransaction')(
          'Should build and broadcast a transaction',
          async () => {
            const hdPrivateKey = Mnemonic(mnemonic).toHDPrivateKey()
            const derived = hdPrivateKey.derive("m/44'/0'/0'/1/0")
            const address = derived.publicKey.toAddress(api.network)
            const amount = Transaction.DUST_AMOUNT
            const utxos = (await api.getUtxos(address)).map(u =>
              renameProperty(
                'vout',
                'outputIndex',
                renameProperty('script', 'scriptPubKey', u)
              )
            )

            const transaction = new Transaction()
              .from(utxos)
              .to(address, amount)
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
          }
        )
      })
    })
  }
)
