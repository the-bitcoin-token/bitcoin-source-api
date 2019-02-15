# Bitcoin Source API

Public rest APIs for networks supported by bitcoin-source

## Installation

-   clone repo: `git clone https://github.com/the-bitcoin-token/bitcoin-source-api.git`
-   move to folder: `cd bitcoin-source-api`
-   install: `npm install`

## Test

-   run unit tests: `npm run test`
-   run Flow: `npm run flow`
-   run Lint: `npm run lint`
-   generate docs: `npm run docs`
-   test coverage: `npm run coverage`

Integration tests are currently skipped to make the app easily portable.

## Contact

If you have any problems or questions, please email brentongunning@gmail.com

## Troubleshooting

**Missing packages or objects during lint**

If the `npm run lint` returns flow errors complaining about missing packages or objects that
should be present, flow's cache is likely out of date. Run `npx flow stop`.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Api](#api)
    -   [Properties](#properties)
    -   [getAddress](#getaddress)
    -   [getBalance](#getbalance)
    -   [sendTransaction](#sendtransaction)
    -   [getBlock](#getblock)
        -   [Parameters](#parameters)
    -   [getBlockHash](#getblockhash)
        -   [Parameters](#parameters-1)
    -   [getLastBlockHash](#getlastblockhash)
    -   [getRawBlock](#getrawblock)
        -   [Parameters](#parameters-2)
    -   [getTransaction](#gettransaction)
        -   [Parameters](#parameters-3)
    -   [getRawTransaction](#getrawtransaction)
        -   [Parameters](#parameters-4)
    -   [getUtxos](#getutxos)
        -   [Parameters](#parameters-5)
    -   [getTxo](#gettxo)
        -   [Parameters](#parameters-6)
-   [BCH_BLOCKDOZER_MAINNET_URL](#bch_blockdozer_mainnet_url)
-   [BCH_BLOCKDOZER_TESTNET_URL](#bch_blockdozer_testnet_url)
-   [BchInsightApi](#bchinsightapi)
    -   [Parameters](#parameters-7)
-   [ApiError](#apierror)
    -   [Parameters](#parameters-8)

### Api

Rest API interface that all supported chains must implement

#### Properties

-   `getAddress` **function (address: Address): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `getBalance` **function (address: Address): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** 
-   `sendTransaction` **function (transaction: Transaction): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;TransactionId>** 
-   `getBlock` **function (hashOrHeight: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `getBlockHash` **function (height: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 
-   `getLastBlockHash` **function (): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 
-   `getRawBlock` **function (hashOrHeight: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 
-   `getTransaction` **function (txId: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `getRawTransaction` **function (txId: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `getUtxos` **function (address: Address): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Txo>>** 
-   `getTxo` **function (outputId: OutputId): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Txo>** 

#### getAddress

Retrieves a given address' history.

-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getBalance

Retrieves a given address' balance in satoshis.

-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### sendTransaction

Sends a transaction for broadcasting.

-   Throws **[ApiError](#apierror)** if the request cannot be completed.

Returns **any** the resulting transaction id

#### getBlock

Retrieves a block from its hash or height.

##### Parameters

-   `hashOrHeight` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))** Hash or height of the block


-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getBlockHash

Retrieves the hash of a block from its height.

##### Parameters

-   `height` **any** Block height


-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getLastBlockHash

Retrives the hash of the latest block.

-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getRawBlock

Retrives a hex-formatted block given its hash or height.

##### Parameters

-   `hashOrHeight` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))** Hash or height of the block


-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getTransaction

Retrieves a JSON-formatted transaction from its hash

##### Parameters

-   `txId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Transaction hash


-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getRawTransaction

Retrieves a hex-formatted transaction given its hash

##### Parameters

-   `txId` **any** Transaction hash


-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getUtxos

Retrieves a given address' unspent outputs (UTXO set).

##### Parameters

-   `address` **Address** Address whose UTXOs to retrieve


-   Throws **[ApiError](#apierror)** if the request cannot be completed.

#### getTxo

Gets a transaction output given an output id.

##### Parameters

-   `outputId` **OutputId** Transaction id and output index


-   Throws **[ApiError](#apierror)** if the request cannot be completed.

### BCH_BLOCKDOZER_MAINNET_URL

Default BCH mainnet insight node url

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### BCH_BLOCKDOZER_TESTNET_URL

Default BCH testnet insight node url

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### BchInsightApi

API for BCH Insight nodes

#### Parameters

-   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Insight API URL

### ApiError

**Extends Error**

A custom Error class to get better stack traces.

#### Parameters

-   `title`  
-   `detail`  
-   `params` **...any** 
