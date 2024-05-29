export const tokenLaunchStore = defineStore("tokenLaunchStore", () => {
  const { ensurePaymentBalanceAndAllowance, payment } = $(bstStore())
  const { writeContract } = $(evmWalletStore())

  let { paymentName } = $(bstStore())
  paymentName = 'BSTEntropy'

  const isShow = $ref(true);
  const form = $ref({
    name: "Godzilla",
    sbtPrice: 10,
    ftPrice: 10,
    ftSwapAmount: 1000,
    payment,
  });

  let isLoading = $ref(false)
  const doSubmit = async () => {
    if (isLoading) return
    isLoading = true

    const payAmount = parseEther('100')
    await ensurePaymentBalanceAndAllowance('ERC404_RWA', payAmount)
    const params = [form.name, parseEther(form.sbtPrice + ''), parseEther(form.ftPrice + ''), form.ftSwapAmount, form.payment]
    await writeContract('ERC404_RWA', 'launch', {}, ...params)
    isLoading = false
  }

  return $$({ isShow, isLoading, form, doSubmit });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(tokenLaunchStore, import.meta.hot));
