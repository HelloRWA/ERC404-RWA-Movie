import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // const user = await serverSupabaseUser(event)
  const adminClient = serverSupabaseServiceRole(event)
  const bodyOrigin = await readBody(event)
  const {id, name} = _.pick(bodyOrigin, [
    'id',
    'name'
  ])

  const { data } = await adminClient.from('Movie_Token').select('*')
      .eq('id', id)
     .single()
  if (data) {
    return data
  }

  const rz = await adminClient.from('Movie_Token').insert({
    id,
    name,
    status: 'isLaunching',
  }).select().single()

  return rz.data
})
