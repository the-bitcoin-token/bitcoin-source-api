/* eslint-disable no-unused-vars */
import { Address } from 'bitcoinsource'
import { Insight } from '../../src'
import ApiInsightBase from '../../src/apiinsightbase'
import ApiInsight from '../../src/apiinsight'
import bchmain from './bch.mainnet.testdata'
import bchtest from './bch.testnet.testdata'
import bsvmain from './bsv.mainnet.testdata'
import btctest from './btc.testnet.testdata'
import ltctest from './ltc.testnet.testdata'
import zectest from './zec.testnet.testdata'

const testdata = [zectest]
// const testdata = [bchtest, bchmain, bsvmain, btctest, ltctest]

export { testdata as default }
