// @flow

import {
  Insight,
  bch,
  bsv,
  btc,
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL,
  BsvInsightApi,
  BSV_MAINNET_URL
} from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(BchInsightApi).toBeDefined()
    expect(BCH_BLOCKDOZER_MAINNET_URL).toBeDefined()
    expect(BCH_BLOCKDOZER_TESTNET_URL).toBeDefined()
    expect(BsvInsightApi).toBeDefined()
    expect(BSV_MAINNET_URL).toBeDefined()
    expect(Insight).toBeDefined()
    expect(bch).toBeDefined()
    expect(bsv).toBeDefined()
    expect(btc).toBeDefined()
  })
  it('bch should create', () => {
    const api = bch()
    expect(api).toBeDefined()
    expect(api.coin).toBe('bch')
  })
  it('bsv should create', () => {
    const api = bsv()
    expect(api).toBeDefined()
    expect(api.coin).toBe('bsv')
  })
  it('btc should create', () => {
    const api = btc()
    expect(api).toBeDefined()
    expect(api.coin).toBe('btc')
  })
})
