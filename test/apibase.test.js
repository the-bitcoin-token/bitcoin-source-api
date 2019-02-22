// @flow

import { ApiInsight } from '../src/apibase'

describe('apibase', () => {
  it('should reject getBlock parameter that is not a number or string', async () => {
    const api = new ApiInsight('dummyUrl')
    // $FlowFixMe
    await expect(api.getBlock({ iAmNotANumberOrString: 9 })).rejects.toThrow()
  })
})
