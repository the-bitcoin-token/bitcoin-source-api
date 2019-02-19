// @flow

import { removeDuplicates, renameProperty } from '../src/util'

describe('renameProperty', () => {
  it('should rename object property', async () => {
    const res = renameProperty('oldProp', 'newProp', { oldProp: 'some value'})
    expect(res.newProp).toBe('some value')
  })
  it('should rename object property in a nested way', async () => {
    const res = renameProperty('newProp', 'reallyNewProp', 
      renameProperty('oldProp', 'newProp', { oldProp: 'some value'})
    )
    expect(res.reallyNewProp).toBe('some value')
  })
})

describe('removeDuplicates', () => {
  // This test started failing for mysterious reasons - to be revisited
  it('should remove duplicatesd from a list of utxos', async () => {
    const utxos = [
      {
        txId:
          'b6c2f4ee675e27c5cad31dbda936b9ed6de50d2f84a5592ffc2d2dda1b911f28',
        vout: 0,
        address: 'qzvpyvyr9j0mg5ffuzckjpj0v5k469855ygxsqu2ws',
        scriptPubKey: '76a914981230832c9fb45129e0b169064f652d5d14f4a188ac',
        satoshis: 5000
      },
      {
        txId:
          'b6c2f4ee675e27c5cad31dbda936b9ed6de50d2f84a5592ffc2d2dda1b911f28',
        vout: 1,
        address: 'qzvpyvyr9j0mg5ffuzckjpj0v5k469855ygxsqu2ws',
        scriptPubKey: '76a914981230832c9fb45129e0b169064f652d5d14f4a188ac',
        satoshis: 3573785833
      },
      {
        txId:
          'b6c2f4ee675e27c5cad31dbda936b9ed6de50d2f84a5592ffc2d2dda1b911f28',
        vout: 0,
        address: 'qzvpyvyr9j0mg5ffuzckjpj0v5k469855ygxsqu2ws',
        scriptPubKey: '76a914981230832c9fb45129e0b169064f652d5d14f4a188ac',
        satoshis: 5000
      },
      {
        txId:
          'b6c2f4ee675e27c5cad31dbda936b9ed6de50d2f84a5592ffc2d2dda1b911f28',
        vout: 1,
        address: 'qzvpyvyr9j0mg5ffuzckjpj0v5k469855ygxsqu2ws',
        scriptPubKey: '76a914981230832c9fb45129e0b169064f652d5d14f4a188ac',
        satoshis: 3573785833
      },
      {
        txId:
          'f234df1527d4dc00aba0632f834b902e75cde23d4f23749789c0bdf30bfbeafb',
        vout: 0,
        address: 'qzvpyvyr9j0mg5ffuzckjpj0v5k469855ygxsqu2ws',
        scriptPubKey: '76a914981230832c9fb45129e0b169064f652d5d14f4a188ac',
        satoshis: 1500
      }
    ]
    const res = removeDuplicates(utxos)
    expect(res.length).toBe(3)
  })
})
