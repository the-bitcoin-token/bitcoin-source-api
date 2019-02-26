import { isBigBlockTest, isSendTransactionTest, runAllTests } from './util'

import Insight from '../../src'

describe('test isBigBlockTest', () => {
  it('should not skip full api getBlock', () => {
    expect(isBigBlockTest(Insight.create('bch'), 'getBlock')).toBeFalsy()
  })
  it('should skip big blocks', () => {
    expect(isBigBlockTest(Insight.create('bsv'), 'getBlock')).toBeTruthy()
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
