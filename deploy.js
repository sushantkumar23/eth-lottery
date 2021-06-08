const HDWallerProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const ACCOUNT_MNEMONIC = process.env.ACCOUNT_MNEMONIC
const INFURA_URL = process.env.INFURA_URL

const provider = new HDWallerProvider(ACCOUNT_MNEMONIC, INFURA_URL)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from the account ', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  console.log('Contract deploy to ', result.options.address)
}
deploy()
