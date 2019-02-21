// @flow

import ApiError from './error'

export function axiosToApiError(error: Object) {
  if (error.response) {
    const { data, status, statusText, headers } = error.response
    const { method, url } = error.response.config || {
      method: 'unknown',
      url: 'unknown'
    }
    const requestData = (error.response.config || {}).data || ''
    const message =
      data.error || (data.indexOf('Code:') !== -1 ? data : statusText)

    const details = `status\t${status} ${statusText}
headers\t${JSON.stringify(headers)}
message\t${message}
request\t${method} ${url}${requestData ? `\ndata\t${requestData}` : ''}`

    return new ApiError('Server error', details)
  } else if (error.request) {
    return new ApiError('Communication error', 'Service unavailable')
  }
  return new ApiError('Request error', error.message)
}

/**
 * Executes an axios request and unwraps either the resulting response or error.
 * Throws a {@link ApiError} if communication with the server fails or if the
 * request results in an error status code.
 * @throws {ApiError}
 * @ignore
 */
export const unwrapAxiosResponse = async (
  request: Promise<any>
): Promise<any> => {
  try {
    const response = await request
    return response.data
  } catch (error) {
    throw axiosToApiError(error)
  }
}

/**
 * Immutably renames keys on a javascript object
 * @see https://medium.com/front-end-weekly/immutably-rename-object-keys-in-javascript-5f6353c7b6dd
 * @param {string} oldProp Old property name
 * @param {string} newProp New property name
 * @param {string} object Object to mutate
 * @returns {Object} The object with the renamed keys
 * @ignore
 */
export function renameProperty(
  oldProperty: string,
  newProperty: string,
  // $FlowFixMe
  { [oldProperty]: propertyValue, ...others }: Object
) {
  return { [newProperty]: propertyValue, ...others }
}

/**
 * Removes duplicates from an array of utxos
 * @ignore
 */
export const removeDuplicates = (array: Array<any>): Array<any> =>
  array.filter(
    (el, index, self) =>
      self.findIndex(t => t.txId === el.txId && t.vout === el.vout) === index
  )
