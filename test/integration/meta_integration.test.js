import { isBigBlockTest, isSendTransactionTest, runAllTests } from './util'

import { bch, bsv } from '../../src'

describe('test isBigBlockTest', () => {
  it('should not skip full api getBlock', () => {
    expect(isBigBlockTest(bch(), 'getBlock')).toBeFalsy()
  })
  it('should skip big blocks', () => {
    expect(isBigBlockTest(bsv(), 'getBlock')).toBeTruthy()
  })
})
describe('test isSendTransactionTest', () => {
  it('should be true when sending transaction', () => {
    expect(isSendTransactionTest(null, 'sendTransaction')).toBeTruthy()
  })
  it('should be false when not sending tx', () => {
    expect(isSendTransactionTest(null, 'getBlock')).toBeFalsy()
  })
})
describe('test runAllTests', () => {
  it('should be true', () => {
    expect(runAllTests()).toBeTruthy()
  })
})
