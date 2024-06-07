// TODO: Implement "constant error messages" -> https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5

/**
 * Returns an Error if the value is an Error, if is not an error,
 * it returns a new Error with the stringified value
 * @param value
 * @returns Error
 */
export function ensureError (value: unknown): Error {
  if (value instanceof Error) {
    return value
  }
  let stringified = '[Unable to stringify the thrown value]'
  try {
    stringified = JSON.stringify(value)
  } catch {}
  const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`)
  return error
}
