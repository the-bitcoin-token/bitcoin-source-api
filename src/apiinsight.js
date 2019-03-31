// @flow
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */

import ApiInsightBase from './apiinsightbase'
import type { IInsightApi } from './api'

export default class ApiInsight extends ApiInsightBase implements IInsightApi {
  async getBlock(hashOrHeight: string | number): Promise<Object> {
    const hash = await this._hashOrHeightToHash(hashOrHeight)
    return this._get(`/block/${hash}`)
  }

  async getRawBlock(hashOrHeight: string | number): Promise<string> {
    const hash = await this._hashOrHeightToHash(hashOrHeight)
    const blockInfo = await this._get(`/rawblock/${hash}`)
    return blockInfo.rawblock
  }
}
