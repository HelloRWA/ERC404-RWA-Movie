import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // const user = await serverSupabaseUser(event)
  const adminClient = serverSupabaseServiceRole(event)
  const bodyOrigin = await readBody(event)
  const {id, tokenId} = _.pick(bodyOrigin, [
    'id',
    'tokenId'
  ])

  const { data } = await adminClient.from('Movie_Token').select('*')
      .eq('id', id)
    .single()
  
  if (!data) {
    return {
      error: `${id} do not exist`
    }
  }
  if (data.status === 'launched') {
    return {
      error: `Token already launched`
    }
  }

  const opts = {
    status: 'launched',
    tokenId,
  }
  const rz = await adminClient.from('Movie_Token').update(opts).eq('id', id).select()

  return rz
})
