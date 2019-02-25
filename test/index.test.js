// @flow

import {
  Insight,
  bch,
  bsv,
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL,
  BsvInsightApi,
  BSV_BCHSVEXPLORER_MAINNET_URL
} from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(BchInsightApi).toBeDefined()
    expect(BCH_BLOCKDOZER_MAINNET_URL).toBeDefined()
    expect(BCH_BLOCKDOZER_TESTNET_URL).toBeDefined()
    expect(BsvInsightApi).toBeDefined()
    expect(BSV_BCHSVEXPLORER_MAINNET_URL).toBeDefined()
    expect(Insight).toBeDefined()
  })
  it('should create bch api', () => {
    expect(bch()).toBeDefined()
  })
  it('should create bsv api', () => {
    expect(bsv()).toBeDefined()
  })
})
