export const tokenLaunchStore = defineStore("tokenLaunchStore", () => {
  const { ensurePaymentBalanceAndAllowance, payment } = $(bstStore());
  const { writeContract, readContract } = $(evmWalletStore());
  const { alertError, alertSuccess } = $(notificationStore());

  let { paymentName } = $(bstStore());
  paymentName = "BSTEntropy";

  let item = $ref({});
  const hasTokenId = $computed(() => item?.tokenId);

  let isShow = $ref(false);
  const form = $ref({
    id: "",
    name: "",
    sbtPrice: 10,
    ftPrice: 10,
    ftSwapAmount: 1000,
    payment,
  });

  let tokenStats = $ref({
    ftSwapAmount: 0,
    ftAmount: 0,
    nftAmount: 0,
    ftHolderCount: 0,
    nftHolderCount: 0,
    sbtSold: 0,
  });

  let isLoading = $ref(false);

  const loadData = async (id) => {
    if (isLoading) return;
    isLoading = true;
    item = await doGetRequest(`/api/token/${id}`);

    if (item?.tokenId) {
      const rz = await readContract("ERC404_RWA", "tokenStat", {}, item.tokenId);
      tokenStats = {
        ftSwapAmount: rz[0],
        ftAmount: rz[1],
        nftAmount: rz[2],
        ftHolderCount: rz[3],
        nftHolderCount: rz[4],
        sbtSold: rz[5],
        ftPrice: rz[6],
        sbtPrice: rz[7],
      };
    }
    isLoading = false;
  };

  const doSubmit = async () => {
    if (isLoading) return;
    isLoading = true;

    // create token data with status 'isLaunching'
    const { data, error } = await doPost("/api/token/create", form);
    if (error) {
      alertError(error);
      isLoading = false;
      return;
    }
    if (data.status === "launched") {
      alertError("Token already launched!", () => {
        isLoading = false;
        isShow = true;
      });
      return;
    }

    const payAmount = parseEther("100");
    const paymentRz = await ensurePaymentBalanceAndAllowance("ERC404_RWA", payAmount);
    if (!paymentRz) {
      isLoading = false;
      return;
    }

    const params = [form.name, parseEther(form.sbtPrice + ""), parseEther(form.ftPrice + ""), form.ftSwapAmount, form.payment];
    const { result: tokenId } = await writeContract("ERC404_RWA", "launch", {}, ...params);
    // update token status to be 'launched'
    const rz = await doPost("/api/token/update", {
      id: form.id,
      tokenId: tokenId.toString(),
    });
    if (rz.error) {
      alertError(rz.error, () => {
        isShow = true;
      });
    }
    isShow = false;
    isLoading = false;

    alertSuccess("Token Launch successed!", () => loadData(form.id));
  };

  return $$({ isShow, tokenStats, isLoading, form, item, hasTokenId, loadData, doSubmit });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(tokenLaunchStore, import.meta.hot));
