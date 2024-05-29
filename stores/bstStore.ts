export const bstStore = defineStore('bstStore', () => {
  const { writeContract, readContract, network, address } = $(evmWalletStore())
  const { addLoading, addSuccess } = $(notificationStore())
  
  let paymentName = $ref('')
  const payment = $computed(() => getContractAddress(paymentName, network))
  const queryPaymentAllowanceByProtocol = async (protocolName) => {
    const appContractAddress = getContractAddress(protocolName, network)
    return readContract(paymentName, 'allowance', {}, address, appContractAddress)
  }

  const ensurePaymentBalanceAndAllowance = async (protocolName, payAmount) => {
    const balance = await readContract(paymentName, 'balanceOf', {}, address)
    if (balance < payAmount) {
      return 'Your Payment Balance is not enough to pay'
    }
    const allowance = await queryPaymentAllowanceByProtocol(protocolName)
    if(allowance >= payAmount) return true

    const appAddress = getContractAddress(protocolName, network)
    const loading = addLoading('Approving allowance')
    await writeContract(paymentName, 'approve', {}, appAddress, payAmount)
    addSuccess('Approve allowance Succeed!', loading)
    return true
  }

  return $$({ ensurePaymentBalanceAndAllowance, paymentName, payment})
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(bstStore, import.meta.hot))
