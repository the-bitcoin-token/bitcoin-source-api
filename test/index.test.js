// @flow

import {
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL,
  BsvInsightApi,
  BSV_MAINNET_URL,
  BSV_TESTNET_URL
} from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(BchInsightApi).toBeDefined()
    expect(BCH_BLOCKDOZER_MAINNET_URL).toBeDefined()
    expect(BCH_BLOCKDOZER_TESTNET_URL).toBeDefined()
    expect(BsvInsightApi).toBeDefined()
    expect(BSV_MAINNET_URL).toBeDefined()
    expect(BSV_TESTNET_URL).toBeDefined()
  })
})
