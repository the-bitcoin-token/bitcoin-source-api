// @flow

import RestClient from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(RestClient).toBeDefined()

    const {
      _unwrap,
      _get,
      _post,
      getAddress,
      getBalance,
      sendTransaction,
      removeDuplicates,
      getBlock,
      getBlockHash,
      getLastBlockHash,
      getRawBlock,
      getTransaction,
      getRawTransaction,
      getUtxos,
      getTxo
    } = RestClient

    expect(_unwrap).toBeDefined()
    expect(_get).toBeDefined()
    expect(_post).toBeDefined()
    expect(getAddress).toBeDefined()
    expect(getBalance).toBeDefined()
    expect(sendTransaction).toBeDefined()
    expect(removeDuplicates).toBeDefined()
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
