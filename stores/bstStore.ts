export const bstStore = defineStore('bstStore', () => {
  const { writeContract, readContract, network, address } = $(evmWalletStore())
  const { addLoading, addSuccess, addError } = $(notificationStore())
  let paymentName = $ref('')
  const payment = $computed(() => getContractAddress(paymentName, network))
  const queryPaymentAllowanceByProtocol = async (protocolName) => {
    const appContractAddress = getContractAddress(protocolName, network)
    return readContract(paymentName, 'allowance', {}, address, appContractAddress)
  }

  const ensurePaymentBalanceAndAllowance = async (protocolName, payAmount) => {
    const balance = await readContract(paymentName, 'balanceOf', {}, address)
    if (balance < payAmount) {
      addError('Your Payment Balance is not enough to pay')
      return false
    }
    const allowance = await queryPaymentAllowanceByProtocol(protocolName)
    if(allowance >= payAmount) return true
    const appAddress = getContractAddress(protocolName, network)
    const loading = addLoading('Approving allowance')
    try {
      const rz = await writeContract(paymentName, 'approve', {eventName: 'Approval'}, appAddress, payAmount)
      console.log(`====> rz :`, rz)
    } catch (err) {
      console.error(err)
      addError(err.toString(), loading)
      return false
    }

    addSuccess('Approve allowance Succeed!', loading)
    return true
  }

  const updatePayment = payment => {
    paymentName = payment
  }

  return $$({ updatePayment, ensurePaymentBalanceAndAllowance, paymentName, payment})
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(bstStore, import.meta.hot))
