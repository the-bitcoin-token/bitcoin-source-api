// @flow

import { RestClient } from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(RestClient).toBeDefined()

    const {
      getAddress,
      getBalance,
      sendTransaction,
      getBlock,
      getBlockHash,
      getLastBlockHash,
      getRawBlock,
      getTransaction,
      getRawTransaction,
      getUtxos,
      getTxo
    } = RestClient

    expect(getAddress).toBeDefined()
    expect(getBalance).toBeDefined()
    expect(sendTransaction).toBeDefined()
    expect(getBlock).toBeDefined()
    expect(getBlockHash).toBeDefined()
    expect(getLastBlockHash).toBeDefined()
    expect(getRawBlock).toBeDefined()
    expect(getTransaction).toBeDefined()
    expect(getRawTransaction).toBeDefined()
    expect(getUtxos).toBeDefined()
    expect(getTxo).toBeDefined()
  })
})
