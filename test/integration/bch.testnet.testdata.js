import { runAllTests } from './util'

export default {
  name: 'BCH Testnet',
  notes: 'bitpay always returns cashaddr format. change expectedAddressFormat to match what the api expects',
  apiconfig: { coin: 'bch', network: 'testnet' },
  runWhen: runAllTests,
  mnemonic:
    'rail install size scorpion orchard kingdom vacuum collect pencil element fall enhance media island medal',
  testAddress: 'my9uLPBr38a4ayEkaZfcaiQArwTzYSho3y',
  expectedAddressFormat: 'cashaddr',
  addressCountMinimum: 900,
  txId: '82dcd699b019c90f9a77f1002a006d7fccb242fa7e85f9273b33b7e49544749f',
  coinbaseTxId:
    'f32ec7882364d1097a1d60ef2054a375a242f4285d9607fd69890cea6f726a67',
  genesisBlockHash:
    '00000000b873e79784647a6c82962c70d228557d24a747ea4d1b8bbe878e1206',
  genesisBlockContents:
    '0100000043497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000bac8b0fa927c0ac8234287e33c5f74d38d354820e24756ad709d7038fc5f31f020e7494dffff001d03e4b6720101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0e0420e7494d017f062f503253482fffffffff0100f2052a010000002321021aeaf2f8638a129a3156fbe7e5ef635226b0bafd495ff03afe2c843d7e3a4b51ac00000000',
  getBlockHash:
    '000000000000024814d19116110a8924450852316e47f3d0e668c800bcc77f0c',
  getRawBlockHash:
    '000000000000a062900920725365a21e8bff918dc3af7a4069d4903b449837fa',
  getRawBlockContents:
    '00e00020b2f45e995227d89c34d0a0e29fe54640c85d4a750d37de9868740000000000005e74e7c080c1d62fd709b7cf9fcf7fd724389d4634b7a7bfdbd74c1238ab9c8aedd7715cffff001df07d41b60201000000010000000000000000000000000000000000000000000000000000000000000000ffffffff27030ba6131a4d696e656420627920416e74506f6f6c20300001032035daa15b0000000065010000ffffffff029c21a804000000001976a914c1770ee3a5ef09094b9a84680c6d73527b21a0af88ac0000000000000000266a24aa21a9ed12c0748416202afec89282eab41d267389bc4e41f40f20462fb4a56f62a3341a000000000100000001238fc8145a3a7cc4934ed4aea080810a998e9244d645e0941accf4feeda03110010000006a47304402204264292a3db411b5819be749f2d0c5c6a87bd512df34518b0928c87a4240aec502200ac7a0d8247e9ca5a18e7e92cac404e76d45e1a01edb853a1c9431a5caad00984121024e472f546783458a4f1cffff2967102c36b730ab96036dcc789e4ec2a40a6a18feffffff0200000000000000002c6a09696e7465726c696e6b2003d2e2e066aee1877afa444bd23e61ba6b572bb8cf05868206ee27f0f9ab069886a50f00000000001976a914ec559135556a3068d121689003343f01a52f03eb88ac00000000',
  txOutput: {
    txId: '288c1488e51281a551067abece9b23e8776f2d82b6e5b43bb81fc6dcac6acfe0',
    outputIndex: 0,
    address: 'mxpsNXm5YRFzDpjjUDvbDKWZNexxRg1sWo',
    scriptPubKey: '76a914bddd842b249decd2527558a0bdd31be830830f4b88ac',
    amount: 0.001,
    satoshis: 100000,
    height: 1251081,
    confirmations: 4666
  }
}
