// @flow

import Insight from '../src/insight'
import { IInsightApiBasic } from '../src/api'
import ApiInsightBase from '../src/apiinsightbase'
import ApiInsight from '../src/apiinsight'
import {
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL
} from '../src/coins/bch'
import { BSV_BCHSVEXPLORER_MAINNET_URL } from '../src/coins/bsv'

describe('insight', () => {
  it('should create bsv default', () => {
    const bsv = Insight.create({ coin: 'bsv' })
    expect(bsv).toBeDefined()
    expect(bsv).toBeInstanceOf(ApiInsightBase)
    expect((bsv: IInsightApiBasic)).toBeDefined()
    expect(bsv.coin).toBe('bsv')
    expect(bsv.network).toBe('mainnet')
    expect(bsv.url).toBe(BSV_BCHSVEXPLORER_MAINNET_URL)
  })
  it('should create bsv mainnet', () => {
    const bsv = Insight.create({ coin: 'bsv', network: 'mainnet' })
    expect(bsv).toBeDefined()
    expect(bsv).toBeInstanceOf(ApiInsightBase)
    expect((bsv: IInsightApiBasic)).toBeDefined()
    expect(bsv.coin).toBe('bsv')
    expect(bsv.network).toBe('mainnet')
    expect(bsv.url).toBe(BSV_BCHSVEXPLORER_MAINNET_URL)
  })
  it('should error because there is no bsv testnet yet', () => {
    expect(() => {
      Insight.create({ coin: 'bsv', network: 'testnet' })
    }).toThrow()
  })
  it('should create bsv with custom url', () => {
    const bsv = Insight.create({
      coin: 'bsv',
      url: 'https://ireallyknowwhatiamdoing.ipromise.com'
    })
    expect(bsv).toBeDefined()
    expect(bsv).toBeInstanceOf(ApiInsightBase)
    expect((bsv: IInsightApiBasic)).toBeDefined()
    expect(bsv.coin).toBe('bsv')
    expect(bsv.network).toBe('mainnet')
    expect(bsv.url).toBe('https://ireallyknowwhatiamdoing.ipromise.com')
  })

  it('should create bch default', () => {
    const bch = Insight.create({ coin: 'bch' })
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('mainnet')
    expect(bch.url).toBe(BCH_BLOCKDOZER_MAINNET_URL)
  })
  it('should create bch mainnet', () => {
    const bch = Insight.create({ coin: 'bch', network: 'mainnet' })
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('mainnet')
    expect(bch.url).toBe(BCH_BLOCKDOZER_MAINNET_URL)
  })
  it('should create bch testnet', () => {
    const bch = Insight.create({ coin: 'bch', network: 'testnet' })
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('testnet')
    expect(bch.url).toBe(BCH_BLOCKDOZER_TESTNET_URL)
  })
  it('should create bch with custom url', () => {
    const bch = Insight.create({
      coin: 'bch',
      url: 'https://ireallyknowwhatiamdoing.ipromise.com'
    })
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('mainnet')
    expect(bch.url).toBe('https://ireallyknowwhatiamdoing.ipromise.com')
  })
})
