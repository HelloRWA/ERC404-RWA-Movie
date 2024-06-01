export const tokenStore = defineStore("tokenStore", () => {
  const { ensurePaymentBalanceAndAllowance, updatePayment, payment } = $(bstStore());
  updatePayment("BSTEntropy");

  const { writeContract, readContract, address, network } = $(evmWalletStore());
  const { alertError, alertSuccess } = $(notificationStore());

  let item = $ref({});
  let itemOffChainData = $ref({});
  const tokenId = $computed(() => item?.tokenId);

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
    ftSwapAmount: 0n,
    ftAmount: 0n,
    nftAmount: 0n,
    ftHolderCount: 0n,
    nftHolderCount: 0n,
    ftPrice: 0n,
    sbtSold: 0n,
  });

  let isLoading = $ref(false);

  const loadData = async (item_) => {
    if (isLoading) return;
    isLoading = true;

    itemOffChainData = item_;
    form.id = item_.id;
    form.name = item_.title || item_.name;
    item = await doGetRequest(`/api/${item_.id}`);
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
        sbtPrice: rz[7]
      };
      console.log(`====> tokenStats :`, tokenStats)
    }
    isLoading = false;
  };

  const doSubmit = async () => {
    if (isLoading) return;
    isLoading = true;

    // create token data with status 'isLaunching'
    const { data, error } = await doPost("/api/token/create", {
      ...form,
      meta: itemOffChainData,
    });
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

    const { logs } = await writeContract("ERC404_RWA", "launchToken", { eventName: ['TokenLaunched', 'SBTCreated'] }, ...params);
    const tokenId = useGet(logs, 'TokenLaunched.args.tokenId')
    // const sbtId = useGet(logs, 'SBTCreated.args.sbtId')
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

    alertSuccess("Token Launch successed!", () => loadData(itemOffChainData));
  };

  const tiers = $computed(() => {
    return [
      {
        name: "Non-Fungible Token",
        price: tokenStats.ftPrice ? tokenStats.ftPrice * tokenStats.ftSwapAmount : 0n,
        priceSuffix: "$BST / NFT",
        description: "Credentials for avid fans of this film.",
        features: [
          "Up to 10K NFT",
          "Tradable on the most marketplace",
          "Hold to get SBT sold profit share",
          "Can be used as your avatar",
          "Permission to access private Group",
        ],
        mostPopular: false,
      },
      {
        name: "Fungible Token",
        price: tokenStats.ftPrice,
        priceSuffix: "$BST / Coin",
        description: "Provide you he most liquid.",
        features: [
          `Up to 10K * ${tokenStats.ftSwapAmount} Coin`,
          "Tradable on the most marketplace",
          "Burn to create new post in the forum",
          "Burn to like other posts in the forum",
          "Permission to access private FT Group",
        ],
        mostPopular: true,
      },
      {
        name: "Soulbound Token",
        price: tokenStats.sbtPrice,
        priceSuffix: "$BST / SBT",
        description: "Stand for the movie ticket.",
        features: [
          "Can not be Transfer / Sold / Trade",
          "Only owner can use the ticket",
          "Permission to access the forum",
          "Permission to access offline event",
        ],
        mostPopular: false,
      },
    ];
  });
  const tierNameList = $computed(() => tiers.map((item) => item.name));

  let mintTier = $ref("Non-Fungible Token");
  let subTokenId = $ref(1);
  let isShowMint = $ref(false);
  const tokenPrice = $computed(() => {
    const priceMap = {
      "Non-Fungible Token": (tokenStats.ftPrice || 0n) * (tokenStats.ftSwapAmount || 0n),
      "Fungible Token": tokenStats.ftPrice,
      "Soulbound Token": tokenStats.sbtPrice,
    };
    return priceMap[mintTier] || 0n;
  });
  let mintAmount = $ref(100);
  watchEffect(() => {
    if (mintTier === "Fungible Token") return;

    mintAmount = 1;
  });
  const payAmount = $computed(() => {
    const payMap = {
      "Non-Fungible Token": tokenPrice,
      "Fungible Token": tokenPrice * BigInt(mintAmount),
      "Soulbound Token": tokenPrice,
    };
    return payMap[mintTier] || 0n;
  });

  const doShowMint = (tier) => {
    isShowMint = true;
    mintTier = tier;
  };

  let isSubmitMint = $ref(false);

  const doSubmitMint = async () => {
    if (isSubmitMint) return;
    isSubmitMint = true;

    const paymentRz = await ensurePaymentBalanceAndAllowance("ERC404_RWA", payAmount);
    if (!paymentRz) {
      isSubmitMint = false;
      return;
    }

    let rz = {};
    let error = null;
    switch (mintTier) {
      case "Soulbound Token":
        const sbtId = 0n;
        rz = await writeContract("ERC404_RWA", "buySBT", {}, tokenId, sbtId, payment);
        if (rz.error) {
          console.log(`====> rz.error :`, rz.error)
          error = 'buySBT error'
        }
        break;
      case "Non-Fungible Token":
        rz = await writeContract("ERC404_RWA", "buyNFT", {}, tokenId, subTokenId, payment);
        if (rz.error) {
          console.log(`====> rz.error :`, rz.error)
          error = 'buyNFT error'
        } else {
           const rz = await doPost("/api/token/createNFT", {
             tokenId: tokenId.toString(),
             subTokenId: subTokenId.toString(),
             address,
             network,
          });
          if (rz.error) {
            alertError(rz.error, () => {
              isShow = true;
            });
          }
        }
        break;
      case "Fungible Token":
        rz = await writeContract("ERC404_RWA", "buyFT", {}, tokenId, mintAmount, payment);
        if (rz.error) {
          console.log(`====> rz.error :`, rz.error)
          error = 'buyFT error'
        }
        break;
      default:
        isSubmitMint = false;
        return alertError("Unsupported tier");
    }

    if (error) {
      alertError(error, () => {
        isShowMint = true;
        isSubmitMint = false;
      });
      return;
    }
    isShowMint = false;
    isSubmitMint = false;

    alertSuccess("Mint token successed!", () => loadData(itemOffChainData));
  };

  return $$({
    isShow,
    isShowMint,
    isSubmitMint,
    subTokenId,
    doShowMint,
    doSubmitMint,
    tiers,
    tierNameList,
    mintTier,
    payAmount,
    mintAmount,
    tokenPrice,
    tokenStats,
    isLoading,
    form,
    item,
    itemOffChainData,
    tokenId,
    loadData,
    doSubmit,
  });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(tokenStore, import.meta.hot));
