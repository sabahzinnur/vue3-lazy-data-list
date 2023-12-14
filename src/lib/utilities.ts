/**
 * Checks if the given URL is an absolute URL.
 *
 * @param {string} url - The URL to check.
 * @returns {boolean} - Returns `true` if the URL is an absolute URL, otherwise `false`.
 */
export function isAbsoluteURL(url: string) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

/**
 * Combines a base URL and a relative URL to generate a complete URL.
 *
 * @param {string} baseURL - The base URL.
 * @param {string} relativeURL - The relative URL.
 * @return {string} The combined URL.
 */
export function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

/**
 * Returns the path of the specified URL.
 * If a base URL is provided and the requested URL is a relative path, the base URL is combined with the requested URL to form the complete path.
 *
 * @param {string} requestedURL - The URL for which to retrieve the path.
 * @param {string} [baseURL] - The base URL to combine with the requested URL. Optional.
 *
 * @return {string} The path of the specified URL.
 */
export function getUrlPath(requestedURL = '', baseURL?: string) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL)
  }
  return requestedURL
}
