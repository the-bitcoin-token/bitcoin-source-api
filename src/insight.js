// @flow

import { IInsightApiBasic } from './api'
import type { Coin, Network, ApiConfiguration } from './types'
import { BsvInsightApi, BSV_MAINNET_URL, BSV_TESTNET_URL } from './bsv'
import { BchInsightApi, BCH_BLOCKDOZER_MAINNET_URL, BCH_BLOCKDOZER_TESTNET_URL } from './bch'

export class Insight {

    static create(config: ApiConfiguration) {
        let net: Network = 'mainnet'
        let url = config.url || ''
        if (config.coin === 'bch') {
            if (config.url) {
                return Insight.make( new BchInsightApi(config.url), 'bch', net)
            }
            let url = BCH_BLOCKDOZER_MAINNET_URL
            if (config.network && config.network === 'testnet') {
                url = BCH_BLOCKDOZER_TESTNET_URL
                net = 'testnet'
            }
            return Insight.make( new BchInsightApi(url), 'bch', net)
        } else if (config.coin === 'bsv') {
            if (config.url) {
                return Insight.make( new BsvInsightApi(config.url), 'bsv', net)
            }
            let url = BSV_MAINNET_URL
            if (config.network && config.network === 'testnet') {
                url = BSV_TESTNET_URL
                net = 'testnet'
            }
            return Insight.make(new BsvInsightApi(url), 'bsv', net)
        }
        //return null
        //TODO: how to support null return or throw exception?
        return Insight.make( new BchInsightApi(url), 'bch', net)
    }

    static make(api: IInsightApiBasic, coin: Coin, network: Network) {
        api.coin = coin
        api.network = network
        return api
    }
}