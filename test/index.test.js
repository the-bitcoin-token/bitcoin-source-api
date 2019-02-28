// @flow

import Insight from '../src'

describe('exports', () => {
  it('Tests each export is present', () => {
    expect(Insight).toBeDefined()
  })
  it('bch should create', () => {
    const api = Insight.create('bch')
    expect(api).toBeDefined()
    expect(api.coin).toBe('bch')
  })
  it('bsv should create', () => {
    const api = Insight.create('bsv')
    expect(api).toBeDefined()
    expect(api.coin).toBe('bsv')
  })
})
