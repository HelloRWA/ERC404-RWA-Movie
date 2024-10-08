import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const adminClient = serverSupabaseServiceRole(event)

  const { data } = await adminClient.from('Movie_Token').select('id, name, status, tokenId')
      .eq('offchainId', id)
     .single()

  return data
})
