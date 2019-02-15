// @flow

import {
  BchInsightApi,
  BCH_BLOCKDOZER_MAINNET_URL,
  BCH_BLOCKDOZER_TESTNET_URL
} from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(BchInsightApi).toBeDefined()
    expect(BCH_BLOCKDOZER_MAINNET_URL).toBeDefined()
    expect(BCH_BLOCKDOZER_TESTNET_URL).toBeDefined()
  })
})
