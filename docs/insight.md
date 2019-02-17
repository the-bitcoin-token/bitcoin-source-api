
# Insight API
bitcoin-source-api is intended to be a thin layer on top of the [insight api](https://github.com/bitpay/insight-api/blob/45ebf7a152c1abfd179bf1b0d32734a2bd36e105/README.md).

## Insight usage
bitcoin-source-api uses the following insight methods.

|Name           | Type| Insight API call | Parameters/Example call  |
|---------------|----|----------|--------------------------|
|sendTransaction|POST|/tx/send  |{ rawtx: transactionhex } |
|getAddress     |GET |/addr/    |/addr/{address}           |
|getUtxos       |GET |/addr     | /addr/{address}/utxo |
|getBlock       |GET |/block    |/block/{hash}            |
|getBlockHash   |GET |/block-index| /block-index/{height}
|getLastBlockHash |GET |/status   |/status?q=getLastBlockHash|
|getRawBlock    |GET |/rawblock |/rawblock/{hash}         |
|getTransaction |GET |/tx       | /tx/{txId} |
|getRawTransaction |GET |/rawtx    | /rawtx/{txId}|
