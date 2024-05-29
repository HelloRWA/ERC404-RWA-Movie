export const tokenLaunchStore = defineStore("tokenLaunchStore", () => {
  const {writeContract, readContract} = $(evmWalletStore())
  const isShow = $ref(true);
  const form = $ref({
    name: "Godzilla",
    sbtPrice: 10,
    ftPrice: 10,
    ftSwapAmount: 1000,
    payment: '${BSTAddress}',
  });

  let isLoading = $ref(false)
  const doSubmit = async () => {
    if (isLoading) return
    isLoading = true
    const params = [form.name, parseEther(form.sbtPrice + ''), parseEther(form.ftPrice + ''), form.ftSwapAmount, form.payment]
    await writeContract('ERC404_RWA', 'launch', {}, ...params)
    isLoading = false
  }

  return $$({ isShow, isLoading, form, doSubmit });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(tokenLaunchStore, import.meta.hot));
