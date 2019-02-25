/* eslint-disable no-unused-vars */
import { Address } from 'bitcoinsource'
import { Insight } from '../../src'
import ApiInsightBase from '../../src/apiinsightbase'
import ApiInsight from '../../src/apiinsight'
import bchmain from './bch.mainnet.testdata'
import bchtest from './bch.testnet.testdata'
import bsvmain from './bsv.mainnet.testdata'
import btctest from './btc.testnet.testdata'

// const testdata = [bchtest]
const testdata = [btctest, bchtest, bchmain, bsvmain]

export { testdata as default }
