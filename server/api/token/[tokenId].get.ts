import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const tokenId = getRouterParam(event, 'tokenId')
  const adminClient = serverSupabaseServiceRole(event)

  const { data } = await adminClient.from('Movie_Token').select('*')
      .eq('tokenId', tokenId)
     .single()

  return {
    ...data,
    decimals: 1,
    external_link: `https://movie.rwa-wallet.com/${data.type}/${data.id}`,
    image: '',
    attributes: [
      {
        trait_type: '',
        value: '',
      },
    ],
  }
})
