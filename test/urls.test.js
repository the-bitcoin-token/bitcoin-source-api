import { Urls, findUrl } from '../src/urls'

describe('test urls', () => {
  it('should initialize to empty array', () => {
    expect(Urls).toBeDefined()
    expect(Urls.length).toBe(0)
    expect(findUrl('bch', 'mainent')).toBeNull()
  })
  it('should find a url even if no default and single url', () => {
    Urls.push({
      isDefault: false,
      name: 'not a default url',
      coin: 'bch',
      network: 'mainnet',
      url: 'https://bch-insight.bitpay.com/api/'
    })
    expect(Urls).toBeDefined()
    expect(Urls.length).toBe(1)
    expect(findUrl('bch', 'mainnet').url).toBe(
      'https://bch-insight.bitpay.com/api/'
    )
  })
  it('should find a url even if no defaults and multiple urls', () => {
    Urls.push({
      isDefault: false,
      name: 'yet another not a default url',
      coin: 'bch',
      network: 'mainnet',
      url: 'https://stillnotdefault.com/api/'
    })
    expect(Urls).toBeDefined()
    expect(Urls.length).toBe(2)
    expect(findUrl('bch', 'mainnet').isDefault).toBeFalsy()
  })
  it('should find default url', () => {
    Urls.push({
      isDefault: true,
      name: 'is a default url',
      coin: 'bch',
      network: 'mainnet',
      url: 'https://default.com/api/'
    })
    const foundUrl = findUrl('bch', 'mainnet')
    expect(Urls).toBeDefined()
    expect(Urls.length).toBe(3)
    expect(foundUrl.url).toBe('https://default.com/api/')
  })
})
