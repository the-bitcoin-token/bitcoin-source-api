// @flow

import ApiInsight from '../src/apiinsight'

describe('apibase', () => {
  it('should reject getBlock parameter that is not a number or string', async () => {
    const api = new ApiInsight('bch', 'mainnet', 'dummyUrl')
    // $FlowFixMe
    await expect(api.getBlock({ iAmNotANumberOrString: 9 })).rejects.toThrow()
  })
})
