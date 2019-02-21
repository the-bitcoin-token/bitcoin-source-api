// @flow

import axios from 'axios'
import { ApiInsightBase } from '../src/apibase'

describe('apibase', () => {
    it('should reject getBlock parameter that is not a number or string', async () => {
        const api = new ApiInsightBase('dummyUrl')
        //$FlowFixMe
        await expect(api.getBlock({ iAmNotANumberOrString: 9})).rejects.toThrow()
    })
})