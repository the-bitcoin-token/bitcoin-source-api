/* eslint-disable no-unused-vars */
import { Address } from 'bitcoinsource'
import { Insight } from '../../src'
import ApiInsightBase from '../../src/apiinsightbase'
import ApiInsight from '../../src/apiinsight'

/**
 * converts boolean to test runner function
 * @param {boolean} runIfTrue 
 */
export const ifRunTest = runIfTrue => (runIfTrue ? describe : describe.skip)

/**
 * runs all tests
 */
export const runAllTests = () => true

/**
 * true if test is not the sendTransaction test
 * @param {ApiInsight} api 
 * @param {string} testName 
 */
export const isSendTransactionTest = (api, testName) => {
  if (testName === 'sendTransaction') return true
  return false
}

/**
 * true if big block test is being run and coin does not support it
 * @param {ApiInsight} api 
 * @param {string} testName 
 */
export const isBigBlockTest = (api, testName) => {
  if (api instanceof ApiInsight) return false
  if (
    api instanceof ApiInsightBase &&
    (testName === 'getBlock' || testName === 'getRawBlock')
  ) {
    return true
  }
  return false
}
