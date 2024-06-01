import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
import { createPublicClient, http, parseUnits} from 'viem'
export default defineEventHandler(async (event) => {
  const adminClient = serverSupabaseServiceRole(event)
  const bodyOrigin = await readBody(event)
  const {tokenId, subTokenId, address: userAddress, network} = _.pick(bodyOrigin, [
    'tokenId',
    'subTokenId',
    'address',
    'network',
  ])

  console.log(`====> tokenId, subTokenId, network, address :`, tokenId, subTokenId, network, address)
  const { data } = await adminClient.from('Movie_Token').select('*')
      .eq('tokenId', tokenId)
      .eq('subTokenId', subTokenId)
     .single()
  if (data) {
    return data
  }

  const { address, abi } = getContractInfo('ERC404_RWA', network)
  const fullTokenId = parseUnits(tokenId, 30) + BigInt(subTokenId)
  const params = {
      address,
      abi,
      functionName: 'balanceOf',
      args: [userAddress, fullTokenId],
  }
  const chain = chainsMap[network]
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })
  const ownedToken = await publicClient.readContract(params)
  console.log(`====> xxxxownedToken :`, ownedToken, ownedToken === 1n)
  if (ownedToken === 1n) {
    const rz = await adminClient.from('Movie_Token').insert({
      tokenId,
      subTokenId,
      status: 'launched',
    }).select().single()
    console.log(`====> rz :`, rz)
    return rz.data
  }
  
  return {
    error: 'Your are not the NFT owner'
  }
})
