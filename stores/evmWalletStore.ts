import { notificationStore } from "./notificationStore";
import {
  createPublicClient,
  toHex,
  createWalletClient,
  decodeAbiParameters,
  custom,
  parseAbiItem,
  formatEther,
  parseEventLogs,
  http,
  publicActions,
  keccak256,
} from "viem";
import { hardhat, filecoinCalibration } from "viem/chains";

const networkMap = {
  hardhat,
  filecoinCalibration,
};

export const evmWalletStore = defineStore("evmWalletStore", () => {
  let address = $(lsItemRef("evmAddress", ""));
  let web3Client = $ref(null);
  const network = "binanceSmartChainTestnet";
  const { addError } = $(notificationStore());

  const ensureChain = async (network) => {
    const chain = networkMap[network]

    try {
      await web3Client.switchChain({ id: chain.id });
    } catch (e) {
      if (e.code === 4902) {
        await web3Client.addChain({ chain })
        await web3Client.switchChain({ id: chain.id })
        return true
      }
      addError('Current network not correct!')
      return false
    }

    return true;
  };
  const getBrowserWalletInstance = async (network) => {
    const chain = networkMap[network]
    const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
    web3Client = createWalletClient({
      account,
      chain,
      transport: custom(window.ethereum),
    }).extend(publicActions);

    const rz = await ensureChain(network);
    if (!rz)
      return false

    address = web3Client.account.address;
  }

  const readContract = async (contractName, functionName, { walletClient = null }, ...args) => {
    if (!walletClient)
      walletClient = web3Client

    let name = contractName
    if (contractName.name)
      name = contractName.name

    let { address, abi } = getContractInfo(name, network)
    if (contractName.contractAddress)
      address = contractName.contractAddress

    if (!address || address === 'undefined')
      return

    const params = {
      address,
      abi,
      functionName,
      args,
    }

    return walletClient.readContract(params)
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
    let rz = null;
    try {
      rz = await walletClient.simulateContract(params);
    } catch (error) {
      console.error(error)
      return { error, abi };
    }
    return {
      ...rz,
      abi,
    };
  };

  const writeContract = async (contractName, functionName, { value = "", walletClient = null, eventName = [] }, ...args) => {
    if (!walletClient) {
      walletClient = web3Client;
    }

    const rz = await ensureChain(network);
    if (!rz) {
      return {
        error: 'ensureChain failed'
      }
    }

    try {
      const { request, result, abi, error } = await simulateContract({ contractName, functionName, value, walletClient }, ...args);
      if (error) {
        return {
          error
        }
      }
      const hash = await walletClient.writeContract(request);
      const tx = await walletClient.waitForTransactionReceipt({
        hash,
      });
      if (tx.status !== "success") {
        return {
          error: `Tx status is not success`,
          detail: tx
        }
      }
      let logs = {}
      if (eventName.length > 0) {
        logs = useKeyBy(parseEventLogs({ 
          abi, 
          eventName,
          logs: tx.logs,
        }), 'eventName')
      }
      return {
        tx,
        result,
        logs,
      };
    } catch (error) {
      return {
        error
      }
    }
  };

  return $$({ address, web3Client, network, readContract, writeContract, getBrowserWalletInstance });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(evmWalletStore, import.meta.hot));
