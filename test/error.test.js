// @flow

import ApiError from '../src/error'

describe('error', () => {
  it('error can instantiate with name', () => {
    const err = new ApiError()
    expect(err).toBeDefined()
    expect(err.name).toBe('ApiError')
  })
  it('error can instantiate with message title', () => {
    const err = new ApiError('test')
    expect(err).toBeDefined()
    expect(err.message).toBe('test')
  })
  it('error can instantiate with details', () => {
    const err = new ApiError('test', 'these are details')
    expect(err).toBeDefined()
    expect(err.message).toBe('test: these are details')
  })
})
