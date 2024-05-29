import {
  createPublicClient,
  toHex,
  createWalletClient,
  decodeAbiParameters,
  custom,
  parseAbiItem,
  formatEther,
  http,
  publicActions,
  keccak256,
} from "viem";

import { hardhat, filecoinCalibration } from 'viem/chains'


export const evmWalletStore = defineStore('evmWalletStore', () => {
  let address = $(lsItemRef('evmAddress', ''))
  let web3Client = $ref(null)

  const getBrowserWalletInstance = async (chain) => {
    const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
     web3Client = createWalletClient({
      account,
      chain,
      transport: custom(window.ethereum),
    }).extend(publicActions);

    try {
      await web3Client.switchChain({ id: chain.id });
    } catch (e) {
      if (e.code === 4902) {
        await web3Client.addChain({ chain });
        await web3Client.switchChain({ id: chain.id });
      }
    }
    
    address = web3Client.account.address
  };


   const readContract = async (contractName, functionName, { walletClient = null }, ...args) => {
    if (!walletClient) {
      walletClient = web3Client;
    }

    const network = useCamelCase(walletClient.chain.name);
    let name = contractName;
    if (contractName.name) {
      name = contractName.name;
    }
    let { address, abi } = getContractInfo(name, network);
    if (contractName.contractAddress) {
      address = contractName.contractAddress;
    }

    if (!address || address === "undefined") {
      return;
    }

    const params = {
      address,
      abi,
      functionName,
      account: unref(account),
      args,
    };

    return walletClient.readContract(params);
  };

   const simulateContract = async ({ contractName, functionName, value = "", walletClient = null }, ...args) => {
    if (!walletClient) {
      walletClient = web3Client;
    }

    const network = useCamelCase(walletClient.chain.name);

    const { address, abi } = getContractInfo(contractName, network);
    const params = {
      address,
      abi,
      functionName,
      args,
    };
    if (value) params.value = value;

    return walletClient.simulateContract(params);
   };
  
  const writeContract = async (contractName, functionName, { value = "", walletClient = null}, ...args) => {
    try {
      const { request, result } = await simulateContract({ contractName, functionName, value, walletClient }, ...args);
      const hash = await walletClient.writeContract(request);
      const tx = await walletClient.waitForTransactionReceipt({
        hash,
      });
      if (tx.status !== "success") {
        throw new Error("tx error");
      }
      return {
        tx,
        result,
      };
    } catch (err) {
      throw new Error(err);
    }
  };

  return $$({ address, readContract, writeContract, getBrowserWalletInstance })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(evmWalletStore, import.meta.hot))
