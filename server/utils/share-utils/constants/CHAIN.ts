import _ from 'lodash'
import contractAddressMap from './contractAddressMap.json'
import BSTEntropy from './abis/BSTEntropy.json'
import BSTSwap from './abis/BSTSwap.json'

const allABIJsons = {
  BSTEntropy,
  BSTSwap,
}
const allABIs = {}
_.map(allABIJsons, (val, key) => {
  key = key.replace('./abis/', '').replace('.json', '')
  allABIs[key] = val
})

export const CONTRACT_ADDRESS_MAP = contractAddressMap

export const CHAIN_CONTRACT_ABI_MAP = {
  ...allABIs,
}
