export const tokenLaunchStore = defineStore("tokenLaunchStore", () => {
  const { ensurePaymentBalanceAndAllowance, payment } = $(bstStore())
  const { writeContract } = $(evmWalletStore())
  const { alertError } = $(notificationStore())

  let { paymentName } = $(bstStore())
  paymentName = 'BSTEntropy'

  let isShow = $ref(false);
  const form = $ref({
    id: '',
    name: '',
    sbtPrice: 10,
    ftPrice: 10,
    ftSwapAmount: 1000,
    payment,
  });

  let isLoading = $ref(false)
  const doSubmit = async () => {
    if (isLoading) return
    isLoading = true

    // create token data with status 'isLaunching'
    const {data, error} = await doPost('/api/token/create', form)
    if (error) {
      alertError(error)
      isLoading = false
      return
    }
    if (data.status === 'launched') {
      alertError('Token already launched!', () => {
        isLoading = false
        isShow = true
      })
      return
    }

    const payAmount = parseEther('100')
    const paymentRz = await ensurePaymentBalanceAndAllowance('ERC404_RWA', payAmount)
    if (!paymentRz) {
      isLoading = false
      return
    }

    const params = [form.name, parseEther(form.sbtPrice + ''), parseEther(form.ftPrice + ''), form.ftSwapAmount, form.payment]
    const { result: tokenId } = await writeContract('ERC404_RWA', 'launch', {}, ...params)
    // update token status to be 'launched'
    const rz = await doPost('/api/token/update', {
      id: form.id,
      tokenId: tokenId.toString(),
    })
    if (rz.error) {
      alertError(rz.error, () => {
        isShow = true
      })
    }
    isLoading = false
  }

  return $$({ isShow, isLoading, form, doSubmit });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(tokenLaunchStore, import.meta.hot));
