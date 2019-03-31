import { crypto } from 'bitcoin-source'
import { runAllTests } from './util'

export default {
  name: 'LTC Testnet',
  apiconfig: {
    coin: 'ltc',
    network: 'testnet'
  },
  runWhen: runAllTests,
  mnemonic:
    'rail install size scorpion orchard kingdom vacuum collect pencil element fall enhance media island medal',
  sendAmount: 100000000 * 0.002,
  sendFee: 100000000 * 0.001,
  sigType: crypto.Signature.SIGHASH_ALL,
  testAddress: 'n3x7vJA1NcSV2oFJudWLp6pgB4D28wchVr',
  addressCountMinimum: 1,
  txId: '638f4c09bc3d60d050cb6a7df947c1288a55eaa9b9e2d0627d1ae87c0741ee5c',
  coinbaseTxId: '5ee5b3410cd0e037edd1ec397168b6e53d227aead163ce1bcac842afa01d862f',
  genesisBlockHash: 'dc19bf491bf601e2a05fd37372f6dc1a51feba5f0f35cf944d39334e79790f5b',
  genesisBlockContents:
    '00000020a0293e4eeb3da6e6f56f81ed595f57880d1a21569e13eefdd951284b5a6266491325f9be2e3077c65c478e7920e7f58ac5f163a5702e89519352a40ef218a7f7de3ca158ffff0f1e00038bf60101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff1101010658a13cde50020000000000000000ffffffff0100f2052a010000001976a91485c6c556d26d6e0f8c6a2be6346063a0be11322b88ac00000000',
  getBlockHash: '993075a0803425eedd7cf7fc71359534d90479d94ae4b562138cc60e023c91ba',
  getRawBlockHash: '993075a0803425eedd7cf7fc71359534d90479d94ae4b562138cc60e023c91ba',
  getRawBlockContents:
    '00000020555b9cf5ee92de7d8cd899aefcab2fa8d66e36618e0baf00ae38e135b873bb402f861da0af42c8ca1bce63d1ea7a223de5b6687139ecd1ed37e0d00c41b3e55ea023785cffff0f1e8000e3b701010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0403a52e0fffffffff0200f90295000000001976a91491b87bb0ce70a4946b508f681a6eaabe4194816088ac0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000',
  txOutput: {
    txId: '638f4c09bc3d60d050cb6a7df947c1288a55eaa9b9e2d0627d1ae87c0741ee5c',
    outputIndex: 0,
    address: 'n3x7vJA1NcSV2oFJudWLp6pgB4D28wchVr',
    scriptPubKey: '76a914f6153362cdd0b263caf5926ce57d5dc9944649b788ac',
    amount: 1,
    satoshis: 100000000,
    height: 994984,
    confirmations: 2
  }
}
