// @flow

import { Insight, bch, bsv } from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(Insight).toBeDefined()
  })
  it('should create bch api', () => {
    expect(bch()).toBeDefined()
  })
  it('should create bsv api', () => {
    expect(bsv()).toBeDefined()
  })
})
