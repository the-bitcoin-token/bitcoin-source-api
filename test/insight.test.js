// @flow
/* eslint-disable no-new */

import Insight from '../src/insight'
import { IInsightApiBasic } from '../src/api'
import ApiInsightBase from '../src/apiinsightbase'
import ApiInsight from '../src/apiinsight'

describe('insight', () => {
  it('should error because url not provided when creating unknown coin', () => {
    expect(() => {
      // $FlowFixMe
      Insight.create({ coin: 'myown', network: 'testnet', url: '' })
    }).toThrow()
  })

  it('should create bsv default', () => {
    const bsv = Insight.create('bsv')
    expect(bsv).toBeDefined()
    expect(bsv).toBeInstanceOf(ApiInsightBase)
    expect((bsv: IInsightApiBasic)).toBeDefined()
    expect(bsv.coin).toBe('bsv')
    expect(bsv.network).toBe('mainnet')
    expect(bsv.url.length).toBeGreaterThan(0)
  })
  it('should complain if no url passed in to base', () => {
    expect(() => {
      new ApiInsight('bsv', undefined, '')
    }).toThrow()
  })
  it('should create bsv mainnet', () => {
    const bsv = Insight.create('bsv', 'mainnet')
    expect(bsv).toBeDefined()
    expect(bsv).toBeInstanceOf(ApiInsightBase)
    expect((bsv: IInsightApiBasic)).toBeDefined()
    expect(bsv.coin).toBe('bsv')
    expect(bsv.network).toBe('mainnet')
    expect(bsv.url.length).toBeGreaterThan(0)
  })
  it('should error because there is no bsv testnet yet', () => {
    expect(() => {
      Insight.create('bsv', 'testnet')
    }).toThrow()
  })
  it('should create bsv with custom url', () => {
    const bsv = Insight.create(
      'bsv',
      undefined,
      'https://ireallyknowwhatiamdoing.ipromise.com'
    )
    expect(bsv).toBeDefined()
    expect(bsv).toBeInstanceOf(ApiInsightBase)
    expect((bsv: IInsightApiBasic)).toBeDefined()
    expect(bsv.coin).toBe('bsv')
    expect(bsv.network).toBe('mainnet')
    expect(bsv.url).toBe('https://ireallyknowwhatiamdoing.ipromise.com')
  })

  it('should create bch default', () => {
    const bch = Insight.create('bch')
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('mainnet')
    expect(bch.url.length).toBeGreaterThan(0)
  })
  it('should create bch mainnet', () => {
    const bch = Insight.create('bch', 'mainnet')
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('mainnet')
    expect(bch.url.length).toBeGreaterThan(0)
  })
  it('should create bch testnet', () => {
    const bch = Insight.create('bch', 'testnet')
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('testnet')
    expect(bch.url.length).toBeGreaterThan(0)
  })
  it('should create bch with custom url', () => {
    const bch = Insight.create(
      'bch',
      undefined,
      'https://ireallyknowwhatiamdoing.ipromise.com'
    )
    expect(bch).toBeDefined()
    expect(bch).toBeInstanceOf(ApiInsight)
    expect((bch: IInsightApiBasic)).toBeDefined()
    expect(bch.coin).toBe('bch')
    expect(bch.network).toBe('mainnet')
    expect(bch.url).toBe('https://ireallyknowwhatiamdoing.ipromise.com')
  })

  it('should create btc default', () => {
    const api = Insight.create('btc')
    expect(api).toBeDefined()
    expect(api.coin).toBe('btc')
    expect(api.network).toBe('mainnet')
    expect((api: IInsightApiBasic)).toBeDefined()
  })
  it('should create btc mainnet', () => {
    const api = Insight.create('btc', 'mainnet')
    expect(api).toBeDefined()
    expect(api.coin).toBe('btc')
    expect(api.network).toBe('mainnet')
    expect((api: IInsightApiBasic)).toBeDefined()
  })
  it('should create btc testnet', () => {
    const api = Insight.create('btc', 'testnet')
    expect(api).toBeDefined()
    expect(api.coin).toBe('btc')
    expect(api.network).toBe('testnet')
    expect((api: IInsightApiBasic)).toBeDefined()
  })
  it('should create btc with custom url', () => {
    const api = Insight.create(
      'btc',
      undefined,
      'https://ireallyknowwhatiamdoing.ipromise.com'
    )
    expect(api).toBeDefined()
    expect(api.coin).toBe('btc')
    expect(api.network).toBe('mainnet')
    expect(api.url).toBe('https://ireallyknowwhatiamdoing.ipromise.com')
    expect((api: IInsightApiBasic)).toBeDefined()
  })
})
