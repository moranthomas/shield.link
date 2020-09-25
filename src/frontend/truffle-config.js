const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')

const MNEMONIC = 'dawn topple empty case fragile mirror enjoy cloud expect dash attitude result'

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, './src/contracts'),
  networks: {
    development: {
      // default with truffle unbox is 8545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, 'https://kovan.infura.io/v3/e4588d11d73d47749c72f5f542832808')
      },
      network_id: 42,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, 'https://rinkeby.infura.io/v3/e4588d11d73d47749c72f5f542832808')
      },
      network_id: 4,
    },
  },
}
