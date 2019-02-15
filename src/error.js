/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

/**
 * A custom Error class to get better stack traces.
 *
 * @author Brenton Gunning
 */
export default class ApiError extends Error {
  constructor(title, detail, ...params) {
    super(...params)
    this.name = 'Error'
    this.message = title + (detail ? `: ${detail}` : '')

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }
  }
}
