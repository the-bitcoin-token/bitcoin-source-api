// @flow

import { Address, Block } from 'bitcoinsource'
import { BchInsightApi, BCH_BLOCKDOZER_TESTNET_URL, BCH_BLOCKDOZER_MAINNET_URL } from '../../src'
import { BsvInsightApi, BSV_TESTNET_URL, BSV_MAINNET_URL } from '../../src'

const TEST_APIS = [
  {
    name: 'BCH Testnet',
    api: new BchInsightApi(BCH_BLOCKDOZER_TESTNET_URL),
    testAddress: new Address('my9uLPBr38a4ayEkaZfcaiQArwTzYSho3y'),
    addressCountMinimum: 900,
    txId: '82dcd699b019c90f9a77f1002a006d7fccb242fa7e85f9273b33b7e49544749f',
    genesisBlockHash: '00000000b873e79784647a6c82962c70d228557d24a747ea4d1b8bbe878e1206',
    genesisBlockContents: '0100000043497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000bac8b0fa927c0ac8234287e33c5f74d38d354820e24756ad709d7038fc5f31f020e7494dffff001d03e4b6720101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0e0420e7494d017f062f503253482fffffffff0100f2052a010000002321021aeaf2f8638a129a3156fbe7e5ef635226b0bafd495ff03afe2c843d7e3a4b51ac00000000',
    getBlockHash: '000000000000024814d19116110a8924450852316e47f3d0e668c800bcc77f0c',
    getRawBlockHash: '000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943',
    getRawBlockContents: '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5494dffff001d1aa4ae180101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000',
    txOutput: {
      txId: '288c1488e51281a551067abece9b23e8776f2d82b6e5b43bb81fc6dcac6acfe0',
      outputNumber: 0,
      address: 'mxpsNXm5YRFzDpjjUDvbDKWZNexxRg1sWo',
      scriptPubKey: '76a914bddd842b249decd2527558a0bdd31be830830f4b88ac',
      amount: 0.001,
      satoshis: 100000,
      height: 1251081,
      confirmations: 4666
    }
  },
  {
    name: 'BCH Mainnet',
    api: new BchInsightApi(BCH_BLOCKDOZER_MAINNET_URL),
    testAddress: new Address('1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1'),
    addressCountMinimum: 15,
    txId: '766a4a171acaea360823d6feeb020c899ed582c12e8919bbe7610ade47b51e9b',
    genesisBlockHash: '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
    genesisBlockContents: '010000006fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e61bc6649ffff001d01e362990101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000',
    getBlockHash: '000000001aeae195809d120b5d66a39c83eb48792e068f8ea1fea19d84a4278a',
    getRawBlockHash: '000000001aeae195809d120b5d66a39c83eb48792e068f8ea1fea19d84a4278a',
    getRawBlockContents: '010000008e0fe627641104e55f51a736f19b4246ff5cf2830d82c6317b51450800000000608398e4ae4d57758ad0054900534d957e64cb8d50924e0f28e51e8a6fd6f127baa5c04b15112a1cb2787c030101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff080415112a1c02c100ffffffff0100f2052a01000000434104a9d6840fdd1497b3067b8066db783acf90bf42071a38fe2cf6d2d8a04835d0b5c45716d8d6012ab5d56c7824c39718f7bc7486d389cd0047f53785f9a63c0c9dac00000000',
    txOutput: {
      txId: '9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
      outputNumber: 0,
      address: '1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1',
      scriptPubKey: '41047211a824f55b505228e4c3d5194c1fcfaa15a456abdf37f9b9d97a4040afc073dee6c89064984f03385237d92167c13e236446b417ab79a0fcae412ae3316b77ac',
      amount: 50,
      satoshis: 5000000000,
      height: 2,
      confirmations: 500000
    }
  },
  // {
  //   name: 'BSV Testnet',
  //   api: new BsvInsightApi(BSV_TESTNET_URL),
  //   testAddress: new Address('my9uLPBr38a4ayEkaZfcaiQArwTzYSho3y')
  //  }
  {
    name: 'BSV Mainnet',
    api: new BsvInsightApi(BSV_MAINNET_URL),
    testAddress: new Address('1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1'),
    addressCountMinimum: 15,
    txId: '766a4a171acaea360823d6feeb020c899ed582c12e8919bbe7610ade47b51e9b',
    genesisBlockHash: '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
    genesisBlockContents: '010000006fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e61bc6649ffff001d01e362990101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000',
    getBlockHash: '00000000000000000697ca261949e47a95ec51ce34d49f51a563a0819be683f3',
    getRawBlockHash: '000000001aeae195809d120b5d66a39c83eb48792e068f8ea1fea19d84a4278a',
    getRawBlockContents: '010000008e0fe627641104e55f51a736f19b4246ff5cf2830d82c6317b51450800000000608398e4ae4d57758ad0054900534d957e64cb8d50924e0f28e51e8a6fd6f127baa5c04b15112a1cb2787c030101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff080415112a1c02c100ffffffff0100f2052a01000000434104a9d6840fdd1497b3067b8066db783acf90bf42071a38fe2cf6d2d8a04835d0b5c45716d8d6012ab5d56c7824c39718f7bc7486d389cd0047f53785f9a63c0c9dac00000000',
    txOutput: {
      txId: '9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
      outputNumber: 0,
      address: '1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1',
      scriptPubKey: '41047211a824f55b505228e4c3d5194c1fcfaa15a456abdf37f9b9d97a4040afc073dee6c89064984f03385237d92167c13e236446b417ab79a0fcae412ae3316b77ac',
      amount: 50,
      satoshis: 5000000000,
      height: 2,
      confirmations: 500000
    }
  }
]

TEST_APIS.forEach(({ 
    name, api, testAddress, txId, genesisBlockHash, genesisBlockContents,
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
        const hash = getBlockHash
        const res = await api.getBlock(hash)
        expect(res).toBeDefined()
        expect(res.hash).toBe(hash)
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
      it('Should retrieve the raw block for a given block hash', async () => {
        const res = await api.getRawBlock(getRawBlockHash)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res).toBe(getRawBlockContents)
      })

      it('Should retrieve the block for a given block height', async () => {
        const res = await api.getRawBlock(1)
        expect(res).toBeDefined()
        expect(res.indexOf(' ')).toBe(-1)
        expect(res).toBe(genesisBlockContents)
      })

      //TODO: not working on bsv because depends on rawblock
      it('Should parse a block to JSON', async () => {
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
        const outputId = {
          txId: txOutput.txId,
          outputNumber: txOutput.outputNumber
        }
        const res = await api.getTxo(outputId)
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
        const res = await api.sendTransaction(transaction)
        expect(res).toBeDefined()
        expect(res.txId).toBeDefined()
      })
    })
    */
  })
})
