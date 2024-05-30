export const usePost = async (url, body = {}) => {
  const opts = {
    headers: useRequestHeaders(['cookie']),
    method: 'POST',
    body,
  }
  return useFetch(url, opts)
}
export const doPost = async (url, body = {}) => {
  const opts = {
    headers: useRequestHeaders(['cookie']),
    method: 'POST',
    body,
  }
  let data = null
  try {
    data = await $fetch(url, opts)
  } catch (error) {
    console.error(error)
    return { error: error.message }
  }
  return { data }
}

export const useGetRequest = async (url, query = {}) => {
  const opts = {
    headers: useRequestHeaders(['cookie']),
    method: 'GET',
    query,
  }
  return useFetch(url, opts)
}

export const doGetRequest = async (url, query = {}) => {
  const opts = {
    headers: useRequestHeaders(['cookie']),
    method: 'GET',
    query,
  }
  return $fetch(url, opts)
}