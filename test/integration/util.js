/* eslint-disable no-unused-vars */
import { Address } from 'bitcoinsource'
import { Insight } from '../../src'
import ApiInsightBase from '../../src/apiinsightbase'
import ApiInsight from '../../src/apiinsight'

export const boolToDescribeFunction = skipIfTrue =>
  skipIfTrue ? describe.skip : describe

export const skipSendTransaction = (api, testName) => {
  if (testName === 'sendTransaction') return true
  return false
}

export const skipBigBlocks = (api, testName) => {
  if (api instanceof ApiInsight) return false
  if (
    api instanceof ApiInsightBase &&
    (testName === 'getBlock' || testName === 'getRawBlock')
  ) {
    return true
  }
  return false
}
