export function toQueryString(params: object = {}) {
    const result: Array<string> = []
  
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        result.push(`${key}=`)
      } else if (Array.isArray(value)) {
        result.push(`${key}=${value.join(',')}`)
      } else if (value !== undefined) {
        result.push(`${key}=${encodeURIComponent(value)}`)
      }
    })
  
    return result.join('&')
  }
  
  export function extractParam(name: string, url = window.location.href): string | undefined {
    const aux = name.replace(/[[]]/g, '\\$&')
    const regex = new RegExp(`[?&]${aux}(=([^&#]*)|&|#|$)`, 'i')
    const results = regex.exec(url)
  
    if (!results || results.length < 3 || !results[2]) {
      return undefined
    }
  
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }
  