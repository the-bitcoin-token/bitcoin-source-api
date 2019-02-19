// @flow
/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true, "allow": ["_get", "_post", "_unwrap"] }] */
/* eslint no-else-return: ["error", { "allowElseIf": true }] */
/* eslint no-param-reassign: "off" */
import axios from 'axios'
import { unwrapAxiosResponse } from './util'
import ApiError from './error'

/**
 * Base class for implementing Api
 */
export class ApiBase {
    _url: string
  
    /**
     * 
     * @param {string} url Insight API URL
     */
    constructor(url: string) {
      this._url = url
    }
  
    _get(route: string): Promise<any> {
      return unwrapAxiosResponse(axios.get(`${this._url}${route}`))
    }
  
    _post(route: string, data: Object): Promise<any> {
      return unwrapAxiosResponse(axios.post(`${this._url}${route}`, data))
    }
  
    async _hashOrHeightToHash(hashOrHeight: string | number): Promise<string> {
      if (typeof hashOrHeight === 'string') {
        return Promise.resolve(hashOrHeight)
      } else if (typeof hashOrHeight === 'number') {
        const hashInfo = await this._get(`/block-index/${hashOrHeight}`)
        return hashInfo.blockHash
      }
      throw new Error('input to getBlock must be a string or a number')
    }
  
  }
  