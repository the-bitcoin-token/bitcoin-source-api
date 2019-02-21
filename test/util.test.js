// @flow

import axios from 'axios'
import { removeDuplicates, renameProperty, unwrapAxiosResponse, axiosToApiError } from '../src/util'
import ApiError from '../src/error'

describe('axiosToApiError', () => {
  it('should format without config', async () => {
    const error = {
      response: {
        config: {},
        headers: ['someheaders'],
        status: 'errStatus',
        statusText: 'errStatusText',
        data: 'Code: this is some results data'
      }
    }
    // fool flow
    delete error.response.config
    const errFormatted = await axiosToApiError(error)
    expect(error.response.config).toBeUndefined()
    expect(errFormatted).toBeDefined()
    expect(errFormatted.name).toBe('ApiError')
    expect(errFormatted.message).toBeDefined()
  })
  it('should format with config data', async () => {
    const error = {
      response: {
        config:{
          method: 'errMethod',
          url: 'errUrl',
          data: 'here is config data'
        },
        headers: ['someheaders'],
        status: 'errStatus',
        statusText: 'errStatusText',
        data: 'this is some results data'
      }
    }
    let errFormatted = await axiosToApiError(error)
    expect(error.response.config.data).toBeDefined()
    expect(errFormatted).toBeDefined()
    expect(errFormatted.name).toBe('ApiError')
    expect(errFormatted.message).toBeDefined()
  })
})

describe('unwrapAxiosResponse', () => {
  it('should return an error if passed a null', async () => {
    const promise = unwrapAxiosResponse(Promise.resolve(null))
    await expect(promise).rejects.toThrowError(`Cannot read property 'data' of null`)
  })

  it('should return data if error has data', async () => {
    const error = {
      data: 'dat',
      message: 'mess'
    }
    const apierror = await unwrapAxiosResponse(Promise.resolve(error))
    expect(apierror).toBeDefined()
    expect(apierror).toBe('dat')
  })

  it('should return error given a bad url', async () => {
    const apiError = new ApiError('Communication error', "Service unavailable")
    await expect(unwrapAxiosResponse(axios.get(`some bad url`))).rejects.toThrowError(apiError)
  })

})

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
