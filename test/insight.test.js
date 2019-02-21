// @flow

import type { Coin, Network } from '../src/types'
import { IInsightApiBasic, IInsightApi } from '../src/api'
import { Insight } from '../src/insight'
import { BCH_BLOCKDOZER_MAINNET_URL, BCH_BLOCKDOZER_TESTNET_URL } from '../src/bch'
import { BSV_MAINNET_URL, BSV_TESTNET_URL } from '../src/bsv'

describe('insight', () => {
    it('should create bsv default', () => {
        const bsv = Insight.create({ coin: 'bsv' })
        expect(bsv).toBeDefined()
        expect(bsv.coin).toBe('bsv')
        expect(bsv.network).toBe('mainnet')
        expect(bsv.url).toBe(BSV_MAINNET_URL)
        // $FlowFixMe
        expect(typeof bsv.getBlock === 'function').toBeFalsy()
        // $FlowFixMe
        expect(typeof bsv.getRawBlock === 'function').toBeFalsy()
    })
    it('should create bsv mainnet', () => {
        const bsv = Insight.create({ coin: 'bsv', network: 'mainnet' })
        expect(bsv).toBeDefined()
        expect(bsv.coin).toBe('bsv')
        expect(bsv.network).toBe('mainnet')
        expect(bsv.url).toBe(BSV_MAINNET_URL)
        // $FlowFixMe
        expect(typeof bsv.getBlock === 'function').toBeFalsy()
    })
    it('should create bsv testnet', () => {
        const bsv = Insight.create({ coin: 'bsv', network: 'testnet' })
        expect(bsv).toBeDefined()
        expect(bsv.coin).toBe('bsv')
        expect(bsv.network).toBe('testnet')
        expect(bsv.url).toBe(BSV_TESTNET_URL)
        // $FlowFixMe
        expect(typeof bsv.getBlock === 'function').toBeFalsy()
    })
    it('should create bsv with custom url', () => {
        const bsv = Insight.create({ coin: 'bsv', url: 'https://ireallyknowwhatiamdoing.ipromise.com' })
        expect(bsv).toBeDefined()
        expect(bsv.coin).toBe('bsv')
        expect(bsv.network).toBe('mainnet')
        expect(bsv.url).toBe('https://ireallyknowwhatiamdoing.ipromise.com')
        // $FlowFixMe
        expect(typeof bsv.getBlock === 'function').toBeFalsy()
    })

    it('should create bch default', () => {
        const bch = Insight.create({ coin: 'bch' })
        expect(bch).toBeDefined()
        expect(bch.coin).toBe('bch')
        expect(bch.network).toBe('mainnet')
        expect(bch.url).toBe(BCH_BLOCKDOZER_MAINNET_URL)
        // $FlowFixMe
        expect(typeof bch.getBlock === 'function').toBeTruthy()
        // $FlowFixMe
        expect(typeof bch.getRawBlock === 'function').toBeTruthy()
    })
    it('should create bch mainnet', () => {
        const bch = Insight.create({ coin: 'bch', network: 'testnet' })
        expect(bch).toBeDefined()
        expect(bch.coin).toBe('bch')
        expect(bch.network).toBe('testnet')
        expect(bch.url).toBe(BCH_BLOCKDOZER_TESTNET_URL)
        // $FlowFixMe
        expect(typeof bch.getBlock === 'function').toBeTruthy()
    })
    it('should create bch testnet', () => {
        const bch = Insight.create({ coin: 'bch', network: 'testnet' })
        expect(bch).toBeDefined()
        expect(bch.coin).toBe('bch')
        expect(bch.network).toBe('testnet')
        expect(bch.url).toBe(BCH_BLOCKDOZER_TESTNET_URL)
        // $FlowFixMe
        expect(typeof bch.getBlock === 'function').toBeTruthy()
    })
    it('should create bch with custom url', () => {
        const bch = Insight.create({ coin: 'bch', url: 'https://ireallyknowwhatiamdoing.ipromise.com' })
        expect(bch).toBeDefined()
        expect(bch.coin).toBe('bch')
        expect(bch.network).toBe('mainnet')
        expect(bch.url).toBe('https://ireallyknowwhatiamdoing.ipromise.com')
        // $FlowFixMe
        expect(typeof bch.getBlock === 'function').toBeTruthy()
    })

})