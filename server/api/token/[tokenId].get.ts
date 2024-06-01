import { serverSupabaseServiceRole } from '#supabase/server'
import { parseUnits } from 'viem'
 
export default defineEventHandler(async (event) => {
  const defaultData = {
      name: 'Movie RWA Issue Platform',
      external_link: `https://movie.rwa-wallet.com/`,
      error: 'Current tokenId do not exist',
      image: '',
  }
  
  let tokenIdFromUser = parseUnits(getRouterParam(event, 'tokenId'), 0)
  const adminClient = serverSupabaseServiceRole(event)
  const divBy = parseUnits('1', 30)
  const isNFT = (tokenIdFromUser / divBy)
  let tokenId = tokenIdFromUser
  let subTokenId = null
  if (isNFT > 0) {
    tokenId = isNFT
    subTokenId = tokenIdFromUser % divBy
    const subTokenRz = await adminClient.from('Movie_Token').select('*').eq('tokenId', tokenId).eq('subTokenId', subTokenId).single()
    if (!subTokenRz.data) {
      return defaultData
    }
  }

  const { data } = await adminClient.from('Movie_Token').select('*').eq('tokenId', tokenId.toString()).is('subTokenId', null).single()

  if (!data) {
    // show movie platform information
    return defaultData
  }

  const {id, name, status, created_at } = data
  const { overview: description, poster_path, genres, revenue, popularity, vote_count, budget, adult, vote_average, type } = data.meta
  const attributes = [
    {
      trait_type: 'revenue',
      value: revenue,
    },
    {
      trait_type: 'popularity',
      value: popularity,
    },
    {
      trait_type: 'vote_count',
      value: vote_count,
    },
    {
      trait_type: 'budget',
      value: budget,
    },
    {
      trait_type: 'adult',
      value: adult,
    },
    {
      trait_type: 'vote_average',
      value: vote_average,
    },
  ]

  const image = `https://image.tmdb.org/t/p/original${poster_path}`
  genres.forEach(item => {
    attributes.push({
      trait_type: 'genres',
      value: item.name
    })
  })

  if (isNFT > 0) {
    attributes.push({
      trait_type: 'tokenId',
      value: tokenId,
    })
  }

  return {
    tokenId: isNFT > 0 ? tokenIdFromUser : tokenId,
    isNFT: isNFT > 0 ? true : false,
    id, name, status, created_at,
    description,
    decimals: 1,
    external_link: `https://movie.rwa-wallet.com/${type}/${data.id}`,
    image,
    attributes,
  }
})
