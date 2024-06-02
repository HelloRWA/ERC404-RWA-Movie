import { LitContracts } from "@lit-protocol/contracts-sdk";
import { LitAccessControlConditionResource, LitActionResource, createSiweMessageWithRecaps, generateAuthSig, LitAbility } from '@lit-protocol/auth-helpers';
import { LitNodeClient } from '@lit-protocol/lit-node-client';

let litNodeClient = null;

const litActionCode = `
const go = async () => {
  // test an access control condition
  const testResult = await Lit.Actions.checkConditions({conditions, authSig, chain})

  console.log('testResult', testResult)

  // only sign if the access condition is true
  if (!testResult){
    return;
  }

  const message = new Uint8Array(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode('Hello world'))
  );
  // this is the string "Hello World" for testing, hashed with sha-256 above.
  const toSign = message;
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey: "0x02e5896d70c1bc4b4844458748fe0f936c7919d7968341e391fb6d82c258192e64", sigName: "sig1" });
};

go();
`;

export const litStore = defineStore("litStore", () => {
  const { signer, address } = $(evmWalletStore());
  const { addLoading, alertError, alertSuccess } = $(notificationStore());
  let isLoading = $ref(false);
  let contractClient = $ref(null);
  let sessionSigs = $ref(null)

  const bootstrap = async () => {
    await connectLit()
    // await initContractClient()
    // await getSessionSigs()
  }

  const connectLit = async () => {
    litNodeClient = new LitNodeClient({
      litNetwork: 'manzano',
      debug: true,
      checkNodeAttestation: false,
    });

    console.log(`====> start connectting lit :`, litNodeClient)
    await litNodeClient?.connect();
    console.log(`====> end connectting lit :`)
  };

  const disconnectLit = async () => {
    await client.disconnect();
  }

  const initContractClient = async () => {
    contractClient = new LitContracts({
      signer,
      network: "habanero",
    });

    await contractClient.connect();
  }

  const getSessionSigs = async () => {
     sessionSigs = await litNodeClient.getSessionSigs({
      chain: "ethereum",
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.LitActionExecution,
          // ability: LitAbility.AccessControlConditionDecryption
        },
      ],
       authNeededCallback: async ({ resourceAbilityRequests, expiration, uri }) => {
        const nonce =  await litNodeClient.getLatestBlockhash()
        const toSign = await createSiweMessageWithRecaps({
          uri,
          expiration,
          resources: resourceAbilityRequests,
          walletAddress: address,
          nonce,
          litNodeClient,
        });

        return await generateAuthSig({
          signer,
          toSign,
        });
      },
    });
    console.log(`====> sessionSigs :`, sessionSigs);
  }

  const getSignatures = async () => {
    const sessionSigs = await getSessionSigs()
    // const signatures = await litNodeClient.executeJs({
    //     code: litActionCode,
    //     sessionSigs,
    //     jsParams: {
    //       conditions: [
    //         {
    //           conditionType: "evmBasic",
    //           contractAddress: "",
    //           standardContractType: "",
    //           chain: "ethereum",
    //           method: "eth_getBalance",
    //           parameters: [":userAddress", "latest"],
    //           returnValueTest: {
    //             comparator: ">=",
    //             value: "1",
    //           },
    //         },
    //       ],
    //       authSig: {
    //         sig: "0x2bdede6164f56a601fc17a8a78327d28b54e87cf3fa20373fca1d73b804566736d76efe2dd79a4627870a50e66e1a9050ca333b6f98d9415d8bca424980611ca1c",
    //         derivedVia: "web3.eth.personal.sign",
    //         signedMessage:
    //           "localhost wants you to sign in with your Ethereum account:\n0x9D1a5EC58232A894eBFcB5e466E3075b23101B89\n\nThis is a key for Partiful\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: 1LF00rraLO4f7ZSIt\nIssued At: 2022-06-03T05:59:09.959Z",
    //         address: "0x9D1a5EC58232A894eBFcB5e466E3075b23101B89",
    //       },
    //       chain: "ethereum",
    //     },
    //   });
    //   console.log("signatures: ", signatures);
    }

  // const encryptingContent = async () => {
  //     const chain = 'ethereum';
  //     const accessControlConditions = [
  //       {
  //         contractAddress: '',
  //         standardContractType: '',
  //         chain,
  //         method: 'eth_getBalance',
  //         parameters: [':userAddress', 'latest'],
  //         returnValueTest: {
  //           comparator: '>=',
  //           value: '0',
  //         },
  //       },
  //     ];
  //     const message = 'Hello world';
  //     const client = new LitNodeClient({
  //       litNetwork: 'cayenne'
  //     });
  //     await client.connect();
  //     const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
  //       {
  //         accessControlConditions,
  //         sessionSigs: {}, // your session
  //         chain,
  //         dataToEncrypt: message,
  //       },
  //       client
  //     );

  //     console.log("cipher text:", ciphertext, "hash:", dataToEncryptHash);
  // }

  return $$({ isLoading, bootstrap, connectLit, disconnectLit, getSignatures });
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(litStore, import.meta.hot));
